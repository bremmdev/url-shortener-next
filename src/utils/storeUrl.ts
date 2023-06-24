import client from "@/lib/azure/client";

export const storeUrl = async (
  url: string,
  shortUrl: string,
  isCustom = false
) => {
  await client.createEntity({partitionKey: "short_url", rowKey: shortUrl, url: url});
  //we only want to store urls bidirectionally if they are not custom
  if (!isCustom) {
    await client.createEntity({partitionKey: "url", rowKey: url, short_url: shortUrl});
  }
};
