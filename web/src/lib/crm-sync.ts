/**
 * Micro-CRM Client Sync
 *
 * Syncs new contacts from the website to Micro-CRM for lead management.
 */

const MICRO_CRM_API_URL =
  process.env.MICRO_CRM_API_URL || "https://microcrm.picklellama.studio";
const MICRO_CRM_API_KEY = process.env.MICRO_CRM_API_KEY;

interface CRMClientData {
  name: string;
  email?: string;
  company?: string;
  notes?: string;
}

interface CRMSyncResult {
  success: boolean;
  clientId?: string;
  alreadyExists?: boolean;
  error?: string;
}

/**
 * Sync a client to Micro-CRM
 *
 * This is designed to be fire-and-forget - it won't throw errors
 * and won't block the calling code.
 */
export async function syncClientToCRM(
  data: CRMClientData
): Promise<CRMSyncResult> {
  if (!MICRO_CRM_API_KEY) {
    console.warn("MICRO_CRM_API_KEY not configured, skipping CRM sync");
    return { success: false, error: "API key not configured" };
  }

  try {
    const response = await fetch(`${MICRO_CRM_API_URL}/api/v1/clients`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MICRO_CRM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 409) {
      // Client already exists (duplicate email)
      const result = await response.json();
      console.log("Client already exists in CRM:", data.email);
      return {
        success: true,
        alreadyExists: true,
        clientId: result.existingId,
      };
    }

    if (!response.ok) {
      const error = await response.json();
      console.error("CRM sync failed:", error);
      return { success: false, error: error.error || "Unknown error" };
    }

    const result = await response.json();
    console.log("Client synced to CRM:", data.email, "->", result.data?.id);
    return { success: true, clientId: result.data?.id };
  } catch (error) {
    console.error("CRM sync error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
