// pages/api/signin.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { signInUser } from "@/utils/awsCognito";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const result = await signInUser(email);
      res
        .status(200)
        .json({ message: "OTP sent successfully", session: result.Session });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error initiating sign-in", details: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
