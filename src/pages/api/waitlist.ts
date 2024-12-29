import type { NextApiRequest, NextApiResponse } from "next";
import { waitlistUser } from "@/utils/awsCognito";
import { addWaitlist } from "@/utils/awsDb";
import { WaitListData, WaitListType } from "@/types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username } = req.body;
    const data: WaitListData = {
      email: username,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      message: "",
      from: WaitListType.WAITLIST,
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
