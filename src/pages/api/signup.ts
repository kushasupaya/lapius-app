import type { NextApiRequest, NextApiResponse } from "next";
import { signUpUser } from "@/utils/awsCognito";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    try {
      const result = await signUpUser(
        firstName,
        lastName,
        email,
        phoneNumber,
        message
      );
      res.status(200).json({ message: "User created successfully", result });
    } catch (error) {
      res.status(500).json({ error: "Error creating user", details: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
