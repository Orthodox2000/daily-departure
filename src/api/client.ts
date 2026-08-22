// Unified lead capture API layer.
// NOTE: The frontend intentionally does NOT hit any endpoint yet.
// submitLead() is a local stub so the full UX works while the real backend
// is implemented later in /api/leads (Vercel serverless route scaffold).

export interface LeadPayload {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  /** Identifies which button / form / activity triggered this request */
  source: string;
}

export const LEADS_ENDPOINT = '/api/leads';

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  // TODO(backend): enable the real call once api/leads.js is implemented.
  //
  // const response = await fetch(LEADS_ENDPOINT, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // if (!response.ok) {
  //   throw new Error('Failed to submit your request. Please try again.');
  // }
  // return response.json();

  await new Promise((resolve) => setTimeout(resolve, 700));
  return { ok: true };
}
