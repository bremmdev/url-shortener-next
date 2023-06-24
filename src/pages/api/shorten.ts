// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { generateShortUrl } from "@/utils/generateShortUrl";
import { storeUrl } from "@/utils/storeUrl";
import { getExistingEntity } from "@/utils/getExistingEntity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //encode url because Azure Table Storage does not allow certain characters
  const url = encodeURIComponent(req.body.url as string);
  const customUrl = req.body.customUrl as string;

  /* CUSTOM URL FLOW */
  if (customUrl) {
    //check if custom url already exists
    const entity = await getExistingEntity(customUrl, true);

    if (entity) {
      return res.status(400).json({ error: "Custom URL already exists" });
    }

    //url does not exist, so we can safely create a new short url
    await storeUrl(url, customUrl, true);
    return res.status(200).json(customUrl);
  }

  /* NON-CUSTOM URL FLOW */
  // if url already exists, return existing short url from db
  const entity = await getExistingEntity(url, false);
  if (entity && typeof entity.short_url === "string") {
    return res.status(200).json(entity.short_url);
  }

  //url does not exist, so we can safely create a new short url
  const short = await generateShortUrl();
  await storeUrl(url, short, false);
  return res.status(200).json(short);
}
