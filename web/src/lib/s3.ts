import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Create S3 client on demand to ensure env vars are available
// Note: Env vars use S3_ prefix (not AWS_) because Amplify reserves AWS_* prefix
function getS3Client(): S3Client {
  const region = process.env.S3_REGION || "ca-central-1";

  // Use explicit IAM user credentials (required for Amplify SSR)
  if (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY) {
    return new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  // Fallback - let SDK auto-detect (works for local AWS CLI credentials)
  return new S3Client({ region });
}

function getBucketName(): string {
  return process.env.S3_BUCKET_NAME || "picklellama-content";
}

export async function getPresignedUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: key,
  });

  const url = await getSignedUrl(getS3Client(), command, { expiresIn });
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
    Bucket: getBucketName(),
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(getS3Client(), command, { expiresIn });
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
    Bucket: getBucketName(),
    Key: key,
  });

  await getS3Client().send(command);
}

// Export getters for cases that need direct access
export { getS3Client, getBucketName };
