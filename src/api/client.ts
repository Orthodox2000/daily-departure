// Unified lead capture API layer.
// Submits to POST /api/leads (Vercel serverless in production, dev-server.js
// locally via the Vite proxy). The server sends two emails per submission:
// an owner notification and a branded auto-reply to the customer.

export interface LeadPayload {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  /** Identifies which button / form / activity triggered this request */
  source: string;
  message?: string;
}

export interface LeadResponse {
  success: boolean;
  ownerEmailId?: string | null;
  clientEmailId?: string | null;
  remaining?: number | null;
  message?: string;
}

export const LEADS_ENDPOINT = '/api/leads';

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  let response: Response;
  try {
    response = await fetch(LEADS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }

  let data: (LeadResponse & { error?: string }) | null = null;
  try {
    data = await response.json();
  } catch {
    // Non-JSON response - handled below.
  }

  if (!response.ok) {
    throw new Error(data?.error || 'Failed to submit your request. Please try again.');
  }

  return {
    success: true,
    ownerEmailId: data?.ownerEmailId ?? null,
    clientEmailId: data?.clientEmailId ?? null,
    remaining: data?.remaining ?? null,
    message: data?.message,
  };
}
