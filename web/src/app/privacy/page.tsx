import { Container } from "@/components/layout";

export const metadata = {
  title: "Privacy Policy",
  description: "PickleLlama privacy policy and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <Container size="small">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, request a consultation, download resources, or
            communicate with us.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Communicate with you about our services</li>
            <li>Send you resources you&apos;ve requested</li>
            <li>Respond to your inquiries and requests</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties. We may share information with service
            providers who assist us in operating our website and conducting our
            business.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the Internet is
            100% secure.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies to enhance your experience on our website. You can
            choose to disable cookies through your browser settings.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at{" "}
            <a href="mailto:privacy@picklellama.studio">
              privacy@picklellama.studio
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
