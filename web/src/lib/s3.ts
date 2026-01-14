import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Build S3 client config
// Only set explicit credentials if provided (otherwise SDK uses IAM roles in Amplify)
const s3Config: { region: string; credentials?: { accessKeyId: string; secretAccessKey: string } } = {
  region: process.env.AWS_S3_REGION || "ca-central-1",
};

// Only add credentials if both are provided (for local dev)
// In production Amplify, IAM roles provide credentials automatically
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  s3Config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

const s3Client = new S3Client(s3Config);

const BUCKET_NAME = process.env.AWS_S3_BUCKET || "picklellama-content";

export async function getPresignedUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
}

// Alias for consistency
export const getPresignedDownloadUrl = getPresignedUrl;

export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
}

export function getReportPdfKey(slug: string): string {
  return `reports/pdfs/${slug}.pdf`;
}

export function getAudioKey(slug: string): string {
  return `audio/${slug}.mp3`;
}

export function getProjectDocumentKey(projectId: string, fileName: string): string {
  const timestamp = Date.now();
  const sanitized = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `projects/${projectId}/documents/${timestamp}-${sanitized}`;
}

export async function deleteS3Object(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

export { s3Client, BUCKET_NAME };
