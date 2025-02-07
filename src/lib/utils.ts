import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";
import { S3Client } from "@aws-sdk/client-s3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const REGION = process.env.NEXT_PUBLIC_AWS_REGION as string;

export const sharedConfig = {
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
};

export const calculateSecretHash = (
  username: string,
  clientId: string,
  clientSecret: string
): string => {
  return crypto
    .createHmac("SHA256", clientSecret)
    .update(username + clientId)
    .digest("base64");
};

export const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});
export const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

export const insuranceList = [
  "I am not using insurance",
  "Aetna",
  "Anthem Blue Cross",
  "Blue Cross Blue Shield",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "Medicaid",
  "Medicare",
  "UnitedHealthcare",
];
