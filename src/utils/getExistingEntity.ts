import client from "@/lib/azure/client";
import { EntityResp } from "@/types/types";
import { RestError } from "@azure/data-tables";

export const getExistingEntity = async (url: string, isShort: boolean) => {
  const partitionKey = isShort ? "short_url" : "url";

  try {
    const entity = await client.getEntity(partitionKey, url);
    return entity as EntityResp;
  } catch (error) {
    //entity does not exist, we denote this with a null value
    if (error instanceof RestError && error.statusCode === 404) {
      return null;
    }
    //TODO handle other errors
    return null
  }
};
