/**
 * Admin configuration and helpers
 */

// List of email addresses that have admin access
// Add team member emails here
const ADMIN_EMAILS = [
  "john@picklellama.studio",
  // Add more admin emails as needed
];

/**
 * Check if an email address has admin access
 */
export function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Get the list of admin emails (for debugging/display purposes)
 */
export function getAdminEmails(): string[] {
  return [...ADMIN_EMAILS];
}
