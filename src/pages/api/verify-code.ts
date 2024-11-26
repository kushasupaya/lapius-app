import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignInOtp } from "@/utils/awsCognito";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, otp, session } = req.body;

    try {
      const result = await verifySignInOtp(email, otp, session);
      res.status(200).json({
        message: "Sign-in successful",
        tokens: result.AuthenticationResult,
      });
    } catch (error) {
      res.status(500).json({ error: "Error verifying OTP", details: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
