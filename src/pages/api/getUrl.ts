// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getExistingEntity } from "@/utils/getExistingEntity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shortUrl = req.query.short as string;
  let destinationUrl: string | null = null;

  try {
    //check if the short url exists
    const entity = await getExistingEntity(shortUrl, true);

    if (entity && entity.url) {
      destinationUrl = decodeURIComponent(entity.url) as string;
    }

    return res.status(200).json(destinationUrl);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
