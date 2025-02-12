import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const serverResponse = await fetch(
      "https://flask-lapius-2dd87df80100.herokuapp.com/response",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await serverResponse.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
