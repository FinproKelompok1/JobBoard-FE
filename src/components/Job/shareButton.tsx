import React from "react";
import { shareToPlatform } from "../../helpers/shareHelper";
// You'll need to install react-icons: npm install react-icons
import { FaXTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

type ShareButtonProps = {
  jobTitle: string;
  jobUrl: string;
  companyName: string;
  location: string;
};

const ShareButton: React.FC<ShareButtonProps> = (props) => {
  const handleShare = (platform: string) => {
    shareToPlatform(platform, props);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="font-medium text-gray-600">Share:</span>

      {/* X (formerly Twitter) Button */}
      <button
        onClick={() => handleShare("twitter")}
        className="flex items-center justify-center rounded-lg bg-black p-2 text-white transition-colors hover:bg-gray-800"
        aria-label="Share to X"
      >
        <FaXTwitter className="h-5 w-5" />
      </button>

      {/* LinkedIn Button */}
      <button
        onClick={() => handleShare("linkedin")}
        className="flex items-center justify-center rounded-lg bg-[#0A66C2] p-2 text-white transition-colors hover:bg-[#084e96]"
        aria-label="Share to LinkedIn"
      >
        <FaLinkedin className="h-5 w-5" />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={() => handleShare("whatsapp")}
        className="flex items-center justify-center rounded-lg bg-[#25D366] p-2 text-white transition-colors hover:bg-[#1da850]"
        aria-label="Share to WhatsApp"
      >
        <FaWhatsapp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ShareButton;