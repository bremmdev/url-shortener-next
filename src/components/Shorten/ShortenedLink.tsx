import React from "react";
import copyIcon from "@public/icons/copy.svg";
import Image from "next/image";

type Props = {
  shortenedUrl: string;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ShortenedLink = (props: Props) => {
  const { shortenedUrl, setToastMessage } = props;

  const shortenedLink = `https://sha.bremm.dev/go/${shortenedUrl}`;

  const handleCopyUrl = () => {
    void navigator.clipboard.writeText(shortenedLink);
    setToastMessage("Copied to clipboard!");
  };

  return (
    <div className="mx-auto my-12 w-fit text-center">
      Your short url:
      <div className="flex gap-3">
        <a
          href={shortenedLink}
          className="my-1 block border-b border-b-sky-300 font-bold selection:bg-sky-300 hover:text-sky-300"
          target="_blank"
        >
          {shortenedLink}
        </a>
        <button type="button" onClick={handleCopyUrl}>
          <Image
            src={copyIcon as string}
            width={16}
            height={16}
            className="transition-transform hover:scale-110"
            alt="copy icon"
          />
        </button>
      </div>
    </div>
  );
};

export default ShortenedLink;
