import type { NextApiRequest, NextApiResponse } from "next";
import { generatePresignedUrl } from "@/lib/uploadS3"; // Adjust the import path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { key } = req.query;
      if (!key || typeof key !== "string") {
        return res
          .status(400)
          .json({ error: "Missing or invalid key parameter" });
      }
      console.log("here");
      const presignedUrl = await generatePresignedUrl(key);
      res.status(200).send(presignedUrl);
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
