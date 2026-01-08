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
        <p className="mt-4 text-muted-foreground">Last updated: January 8, 2025</p>

        <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
          <p>
            PickleLlama Studio (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website and use our services.
          </p>

          <h2>Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> When you create an account
              using Google Sign-In, we receive your name, email address, and
              profile picture from Google.
            </li>
            <li>
              <strong>Contact Information:</strong> When you request a
              consultation or contact us, we collect your name, email address,
              company name, and any message content you provide.
            </li>
            <li>
              <strong>User Content:</strong> Information you save or create while
              using our services, such as saved tools and preferences.
            </li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <p>
            When you access our website, we may automatically collect certain
            information, including:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>IP address (anonymized where possible)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Create and manage your account</li>
            <li>Process your requests and respond to inquiries</li>
            <li>Send you service-related communications</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Protect against unauthorized access and abuse</li>
          </ul>

          <h2>Google OAuth and Third-Party Authentication</h2>
          <p>
            We use Google Sign-In to provide a convenient and secure way to
            create an account and access our services. When you sign in with
            Google:
          </p>
          <ul>
            <li>
              We receive basic profile information (name, email, profile picture)
              that you have made available in your Google account
            </li>
            <li>
              We do not receive or store your Google password
            </li>
            <li>
              We do not access your Google Drive, Gmail, Calendar, or other
              Google services
            </li>
            <li>
              You can revoke our access at any time through your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Account settings
              </a>
            </li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information in the following
            circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party vendors who assist us in operating our website and
              providing our services (e.g., cloud hosting, email delivery).
              These providers are bound by confidentiality obligations.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information
              if required by law, regulation, legal process, or governmental
              request.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your information may be
              transferred as part of that transaction.
            </li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is
            active or as needed to provide you services. You may request
            deletion of your account and associated data at any time by
            contacting us. We will retain and use your information as necessary
            to comply with legal obligations, resolve disputes, and enforce our
            agreements.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security
            measures to protect your personal information, including:
          </p>
          <ul>
            <li>Encryption of data in transit using TLS/SSL</li>
            <li>Encryption of data at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication requirements</li>
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic
            storage is 100% secure. While we strive to protect your information,
            we cannot guarantee absolute security.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and personal data</li>
            <li>Opt out of marketing communications</li>
            <li>Revoke third-party authentication access</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            below.
          </p>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience,
            analyze usage, and remember your preferences. You can control
            cookies through your browser settings. Note that disabling cookies
            may affect the functionality of our services.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 16. We
            do not knowingly collect personal information from children. If we
            become aware that we have collected personal information from a
            child, we will take steps to delete that information.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries
            other than your country of residence, including Canada and the
            United States. These countries may have data protection laws that
            differ from your jurisdiction. By using our services, you consent to
            such transfers.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new Privacy Policy on
            this page and updating the &quot;Last updated&quot; date. Your continued use
            of our services after any changes constitutes acceptance of the
            updated policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:privacy@picklellama.studio">
              privacy@picklellama.studio
            </a>
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href="https://picklellama.studio">picklellama.studio</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
