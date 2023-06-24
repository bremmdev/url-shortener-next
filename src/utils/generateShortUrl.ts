import { getExistingEntity } from "@/utils/getExistingEntity";

export const generateShortUrl = async () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortUrl = "";

  while (true) {
    shortUrl = "";
    for (let i = 0; i < 6; i++) {
      shortUrl += characters[Math.floor(Math.random() * characters.length)];
    }

    const entity = await getExistingEntity(shortUrl, true);

    //if the entity does not exist, we can use this short url
    if (!entity) {
      break;
    }
  }

  return shortUrl;
};
