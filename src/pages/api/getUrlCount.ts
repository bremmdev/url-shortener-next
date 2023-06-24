// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { odata } from "@azure/data-tables";
import client from "../../lib/azure/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const entities = client.listEntities({
      queryOptions: { filter: odata`PartitionKey eq 'short_url'` },
    });

    //count the number of short urls
    let count = 0;
    for await (const _ of entities) {
      count++;
    }
    res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
