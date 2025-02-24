"use client";
import { useState } from "react";
import { FaLink, FaCheckCircle } from "react-icons/fa";
import { useCopyToClipboard } from "usehooks-ts";

export default function CopyButton({ link }: { link: string }) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <div
      className="cursor-pointer text-gray-500"
      onClick={() => {
        copy(link);
        setCopied(true);
      }}
      onMouseLeave={() => setCopied(false)}
      data-cy="copy-button"
    >
      {copied ? (
        <FaCheckCircle data-cy="check-icon" className="size-6" />
      ) : (
        <FaLink data-cy="link-icon" className="size-5" />
      )}
    </div>
  );
}
