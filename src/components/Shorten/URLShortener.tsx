import React from "react";
import Toast from "@/components/UI/Toast";
import ShortenedLink from "./ShortenedLink";
import Image from "next/image";
import helpIcon from "@public/icons/help.svg";
import { urlInputSchema } from "@/schema/url-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const shortenUrlFn = async (input: { url: string; customUrl?: string }) => {
  const res = await fetch("/api/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  //data can be either the shortened url or an error message
  const data = await res.json();

  if (!res.ok) {
    //throw the error message to be handled by the useMutation hook
    throw data.error;
  }
  return data;
};

const URLShortener = () => {
  const [inputUrl, setInputUrl] = React.useState("");
  const [customUrl, setCustomUrl] = React.useState("");
  const [shortenedUrl, setShortenedUrl] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = React.useState("");

  const queryClient = useQueryClient();

  const {
    mutate: shortenUrl,
    isLoading: isShorting,
    error: shortenError,
  } = useMutation({
    mutationFn: shortenUrlFn,
  });

  const handleSuccess = (data: unknown) => {
    setShortenedUrl(data as string);
    setInputUrl("");
    setCustomUrl("");
    setToastMessage("URL successfully shortened!");
    queryClient.invalidateQueries({ queryKey: ["shorten_count"] });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = {
      url: inputUrl.trim(),
      customUrl: customUrl.length > 0 ? customUrl : undefined,
    };

    const result = urlInputSchema.safeParse(input);
    setErrors({});
    const errors: Record<string, string> = {};

    if (!result.success) {
      //set the errors
      result.error.errors.forEach((error) => {
        errors[String(error.path[0])] = error.message;
      });

      //set the errors
      setErrors(errors);
      return;
    }

    //no validation errors, so we can submit the form
    shortenUrl(input, {
      onSuccess: handleSuccess,
    });
  };

  const showError = Boolean(shortenError && !isShorting);

  const showShort = !showError && shortenedUrl && !isShorting;

  return (
    <div className="mx-auto my-6 w-11/12 max-w-7xl md:my-12">
      {toastMessage && (
        <Toast message={toastMessage} setToastMessage={setToastMessage} />
      )}

      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-10"
      >
        <div className="flex w-full max-w-md flex-col justify-center gap-2 ">
          <label htmlFor="url" className="mb-1 font-bold text-slate-300 ">
            URL
          </label>
          <input
            type="text"
            placeholder="Enter URL"
            value={inputUrl}
            id="url"
            className="w-full rounded-md border border-slate-800 bg-inherit px-4 py-2 placeholder:opacity-50 focus:border-sky-300 focus:outline-none"
            onChange={(e) => setInputUrl(e.target.value)}
          />
          {errors.url && (
            <p className="w-full text-center font-semibold text-rose-400">
              {errors.url}
            </p>
          )}

          <div className="relative mb-1 mt-4">
            <label htmlFor="customUrl" className="font-bold text-slate-300">
              Custom ending (optional)
            </label>

            <Image
              src={helpIcon as string}
              width={16}
              height={16}
              alt="help icon"
              className="ml-1 mb-[2px] hidden xs:inline"
            />
            <div
              id="tooltip"
              className="hidden absolute rounded-lg bg-sky-200 p-3 sm:p-4 text-slate-950 -top-24 left-[7.5%] right-[7.5%] sm:left-[15%] sm:right-[15%] text-xs xs:text-sm"
            >
              Add a custom ending (e.g. sha.bremm.dev/go/custom_tag instead of
              sha.bremm.dev/go/l6HYuH)
            </div>
          </div>

          <input
            type="text"
            placeholder="Enter custom ending"
            value={customUrl}
            id="customUrl"
            className="w-full max-w-md rounded-md border border-slate-800 bg-inherit px-4 py-2 placeholder:opacity-50 focus:border-sky-300 focus:outline-none"
            onChange={(e) => setCustomUrl(e.target.value)}
          />

          {errors.customUrl && (
            <p className="w-full text-center font-semibold text-rose-400">
              {errors.customUrl}
            </p>
          )}

          <button
            className="focus-visible:ring-ring ring-offset-background my-4 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            type="submit"
            disabled={isShorting || inputUrl.length === 0}
          >
            {isShorting ? "Shortening..." : "Shorten"}
          </button>
        </div>

        {showError && <p className="text-rose-400">{shortenError as string}</p>}
      </form>

      {showShort && !showError && (
        <ShortenedLink
          shortenedUrl={shortenedUrl}
          setToastMessage={setToastMessage}
        />
      )}
    </div>
  );
};

export default URLShortener;
