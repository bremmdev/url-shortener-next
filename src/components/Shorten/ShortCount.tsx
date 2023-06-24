import React from "react";
import { useQuery } from "@tanstack/react-query";
import arrowIcon from "@public/icons/arrow.svg";
import Image from "next/image";

const fetchUrlCount = async () => {
  const res = await fetch("/api/getUrlCount");

  //data can be either the shortened url or an error message
  const data = await res.json();

  if (!res.ok) {
    //throw the error message to be handled by the useMutation hook
    throw data.error;
  }
  return data;
};

const ShortCount = () => {
  const {
    data: count,
    isLoading: countLoading,
    error,
  } = useQuery({
    queryKey: ["shorten_count"],
    queryFn: fetchUrlCount,
  });

  return !countLoading && !error ? (
    <div className="animate-fadeIn text-center text-slate-400 md:ml-2">
      <Image
        src={arrowIcon as string}
        width={32}
        height={32}
        alt="arrow"
        className="hidden md:-mt-3 md:inline"
      />
      Already shortened{" "}
      <span className="font extra-bold text-xl text-amber-100">{count}</span>{" "}
      urls<span className="text-amber-100">.</span>
    </div>
  ) : (
    <div className="h-7">&nbsp;</div>
  );
};

export default ShortCount;
