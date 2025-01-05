import type { NextApiRequest, NextApiResponse } from "next";
import { signUpUser } from "@/utils/awsCognito";
import { WaitListData, WaitListType } from "@/types/user";
import { addWaitlist } from "@/utils/awsDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    const data: WaitListData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      message: message,
      from: WaitListType.SIGNUP,
    };
    try {
      const result = await addWaitlist(data);
      res.status(200).json({ message: "User created successfully", result });
    } catch (error) {
      res.status(500).json({ error: "Error creating user", details: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
