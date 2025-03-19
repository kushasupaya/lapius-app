import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { hospital_name, image_url } = req.body;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 100000); // 100 seconds timeout

    // console.log(hospital_name, image_url);
    // Call external API
    const response = await fetch("http://3.92.50.134:8000/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hospital_name,
        image_url,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
