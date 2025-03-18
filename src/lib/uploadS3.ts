import { PutObjectAclCommand, PutObjectCommand } from "@aws-sdk/client-s3";
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
    // console.log("File uploaded to S3:", response);

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
    ACL: "public-read",
  });
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
};

export const getPublicUrl = (key: string) => {
  return `https://${bucketName}.s3.us-east-1.amazonaws.com/${key}`;
};

export const uploadWithPresignedUrl = async (
  file: File,
  presignedUrl: string
) => {
  try {
    console.log("Uploading file  pre-signed URL:", presignedUrl);
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
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

export const uploadImageToS3Acl = async (file: File, key: string) => {
  try {
    // const key = `uploads/${Date.now()}-${file.name}`;

    // Upload file to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Set ACL to make the object public
    await s3Client.send(
      new PutObjectAclCommand({
        Bucket: bucketName,
        Key: key,
        ACL: "public-read",
      })
    );

    // Construct the public URL
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};
