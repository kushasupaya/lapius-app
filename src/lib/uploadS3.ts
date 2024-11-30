import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string;

export const uploadFileToS3 = async (file: File, key: string) => {
  try {
    console.log("Uploading file to S3:", file, file.type);
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);
    console.log("File uploaded to S3:", response);

    return response;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export const generatePresignedUrl = async (key: string) => {
  const command = new PutObjectCommand({
    Bucket: bucketName, // Bucket name is specified here
    Key: key,
    ContentType: "image/png",
  });
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
};

export const uploadWithPresignedUrl = async (
  file: File,
  presignedUrl: string
) => {
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type, // Ensures the correct Content-Type is sent
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    console.log("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file with pre-signed URL :", error);
    throw error;
  }
};
