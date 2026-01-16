import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Create SES client on demand to ensure env vars are available
// Uses same IAM user credentials as S3 (can't use AWS_ prefix - reserved by Amplify)
function getSESClient(): SESClient {
  if (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY) {
    return new SESClient({
      region: process.env.S3_REGION || "ca-central-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
  }
  // Fallback for local dev with AWS CLI credentials
  return new SESClient({
    region: process.env.S3_REGION || "ca-central-1",
  });
}

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "hello@picklellama.studio";
const FROM_NAME = "PickleLlama";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const command = new SendEmailCommand({
      Source: `${FROM_NAME} <${FROM_EMAIL}>`,
      Destination: {
        ToAddresses: [options.to],
      },
      Message: {
        Subject: {
          Data: options.subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: options.html,
            Charset: "UTF-8",
          },
          ...(options.text && {
            Text: {
              Data: options.text,
              Charset: "UTF-8",
            },
          }),
        },
      },
    });

    await getSESClient().send(command);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

// Email templates
export function getDownloadConfirmationEmail(
  reportTitle: string,
  downloadUrl: string
): { subject: string; html: string; text: string } {
  const subject = `Your download: ${reportTitle}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #16a34a; margin: 0;">PickleLlama</h1>
  </div>

  <h2 style="color: #111; margin-bottom: 20px;">Your Report is Ready</h2>

  <p>Thanks for your interest in our work. Here's your download link for:</p>

  <p style="font-size: 18px; font-weight: 600; color: #111;">${reportTitle}</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${downloadUrl}"
       style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
      Download PDF
    </a>
  </div>

  <p style="color: #666; font-size: 14px;">
    This link will expire in 1 hour. If you need a new link, you can download the report again from our website.
  </p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="color: #666; font-size: 14px;">
    Have questions about what you've read?
    <a href="https://picklellama.studio/talk" style="color: #16a34a;">Schedule a conversation</a>
    with our team.
  </p>

  <p style="color: #999; font-size: 12px; margin-top: 30px;">
    PickleLlama | AI & Automation Consulting<br>
    <a href="https://picklellama.studio" style="color: #999;">picklellama.studio</a>
  </p>
</body>
</html>
  `.trim();

  const text = `
Your Report is Ready

Thanks for your interest in our work. Here's your download link for:

${reportTitle}

Download: ${downloadUrl}

This link will expire in 1 hour. If you need a new link, you can download the report again from our website.

---

Have questions about what you've read? Schedule a conversation with our team:
https://picklellama.studio/talk

PickleLlama | AI & Automation Consulting
https://picklellama.studio
  `.trim();

  return { subject, html, text };
}

export function getThunkBoxConfirmationEmail(
  name: string,
  requestSummary: string
): { subject: string; html: string; text: string } {
  const subject = "We received your Thunk Box request";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #16a34a; margin: 0;">PickleLlama</h1>
  </div>

  <h2 style="color: #111; margin-bottom: 20px;">Thanks for your request${name ? `, ${name}` : ""}!</h2>

  <p>We've received your Thunk Box request and will get back to you within 2-3 business days with our analysis.</p>

  <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0; color: #666; font-size: 14px;"><strong>Your request:</strong></p>
    <p style="margin: 8px 0 0 0; color: #333;">${requestSummary}</p>
  </div>

  <p style="color: #666; font-size: 14px;">
    In the meantime, you might find our reports helpful:
  </p>

  <ul style="color: #666; font-size: 14px;">
    <li><a href="https://picklellama.studio/learn" style="color: #16a34a;">Browse all reports</a></li>
  </ul>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="color: #999; font-size: 12px; margin-top: 30px;">
    PickleLlama | AI & Automation Consulting<br>
    <a href="https://picklellama.studio" style="color: #999;">picklellama.studio</a>
  </p>
</body>
</html>
  `.trim();

  const text = `
Thanks for your request${name ? `, ${name}` : ""}!

We've received your Thunk Box request and will get back to you within 2-3 business days with our analysis.

Your request:
${requestSummary}

In the meantime, you might find our reports helpful:
https://picklellama.studio/learn

---

PickleLlama | AI & Automation Consulting
https://picklellama.studio
  `.trim();

  return { subject, html, text };
}

export { getSESClient };
