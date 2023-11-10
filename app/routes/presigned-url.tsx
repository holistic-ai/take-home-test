import { json, type ActionFunctionArgs } from "@remix-run/node";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Bucket } from "sst/node/bucket";

export interface S3SignedUrlProps {
  filename: string;
  contentType: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { filename, contentType } = await request.json();
  const client = new S3Client({});

  const signedUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Key: filename,
      Bucket: Bucket.Bucket.bucketName,
      ContentType: contentType,
    }),
    {
      expiresIn: 300,
    }
  );

  return json({ signedUrl });
}
