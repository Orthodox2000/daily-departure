// Visitor counter client. Registers this browser once per day (IST) and
// returns today's unique-visitor count; otherwise just reads the count.

const ID_KEY = 'dd_visitor_id';
const DAY_KEY = 'dd_visitor_counted_day';

function todayIST(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(ID_KEY);
    if (!id || !/^[A-Za-z0-9_-]{8,64}$/.test(id)) {
      id = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, '');
      localStorage.setItem(ID_KEY, id);
    }
    return id;
  } catch {
    return `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
}

export async function trackVisit(): Promise<number | null> {
  try {
    const day = todayIST();
    let alreadyCounted = false;
    try { alreadyCounted = localStorage.getItem(DAY_KEY) === day; } catch { /* ignore */ }

    const res = alreadyCounted
      ? await fetch('/api/visitors')
      : await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId: getVisitorId() }),
        });
    if (!res.ok) return null;
    const data = await res.json();
    if (!alreadyCounted) {
      try { localStorage.setItem(DAY_KEY, day); } catch { /* ignore */ }
    }
    return typeof data.today === 'number' ? data.today : null;
  } catch {
    return null;
  }
}
