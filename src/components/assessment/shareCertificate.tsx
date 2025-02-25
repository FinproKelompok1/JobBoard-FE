import Link from "next/link";
import { IconType } from "react-icons";
import { BsTwitterX } from "react-icons/bs";
import {
  IoLogoWhatsapp,
  IoLogoLinkedin,
} from "react-icons/io5";
import CopyButton from "./copyButton";

interface IShareButton {
  Icon: IconType;
  link: string;
  style: string;
  size: string;
}

const shareButtons: IShareButton[] = [
  {
    Icon: IoLogoLinkedin,
    link: "https://www.linkedin.com/sharing/share-offsite/?url=",
    style: "text-blue-600",
    size: "size-7",
  },

  {
    Icon: IoLogoWhatsapp,
    link: "https://wa.me/?text=",
    style: "text-green-500",
    size: "size-7",
  },
  {
    Icon: BsTwitterX,
    link: "https://www.twitter.com/intent/tweet?url=",
    style: "text-black",
    size: "size-5",
  },
];

export default function ShareCertificate({
  certificateId,
}: {
  certificateId: string;
}) {
  const domain = `${process.env.NEXT_PUBLIC_BASE_URL_FE}/certificate-verification/`;
  return (
    <div className="flex items-end justify-center gap-3">
      <p className="text-lg font-medium">Share on</p>
      <div className="mt-2 flex items-center gap-3">
        {shareButtons.map((item, index) => {
          return (
            <Link
              key={index}
              href={`${item.link}${domain}${certificateId}`}
              target="_blank"
            >
              <item.Icon className={`${item.style} ${item.size}`} />
            </Link>
          );
        })}
        <CopyButton link={`${domain}${certificateId}`} />
      </div>
    </div>
  );
}
