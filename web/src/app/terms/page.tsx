import { Container } from "@/components/layout";

export const metadata = {
  title: "Terms of Service",
  description: "PickleLlama terms of service and usage agreement.",
};

export default function TermsPage() {
  return (
    <section className="py-20">
      <Container size="small">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using our website and services, you agree to be
            bound by these Terms of Service and all applicable laws and
            regulations.
          </p>

          <h2>Use of Services</h2>
          <p>
            You may use our services only for lawful purposes and in accordance
            with these Terms. You agree not to use our services in any way that
            violates any applicable laws or regulations.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The content, features, and functionality of our website and services
            are owned by PickleLlama and are protected by intellectual property
            laws. You may not reproduce, distribute, or create derivative works
            without our express permission.
          </p>

          <h2>User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate and
            complete information. You are responsible for maintaining the
            security of your account and password.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            PickleLlama shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use
            of our services.
          </p>

          <h2>Disclaimer</h2>
          <p>
            Our services are provided &quot;as is&quot; without warranties of any kind,
            either express or implied. We do not warrant that our services will
            be uninterrupted or error-free.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of Canada, without regard to its conflict of law
            provisions.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will
            notify you of any changes by posting the new Terms on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@picklellama.studio">legal@picklellama.studio</a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
