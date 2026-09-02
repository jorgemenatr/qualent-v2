/**
 * Proposal pages run without the site chrome.
 *
 * These are single-purpose pages addressed to one company: the Qualent product
 * bar has to be the first thing read, and the trust block at the foot does the
 * job the site footer would. The global nav also re-asserts PickleLlama at full
 * size, which is exactly the balance these pages are meant to avoid.
 *
 * The style below only renders while a /qualent route is mounted, and the page
 * itself uses no <header> or <footer> elements, so it hits the site chrome and
 * nothing else.
 */
export default function QualentProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`body header, body footer { display: none !important; }`}</style>
      {children}
    </>
  );
}
