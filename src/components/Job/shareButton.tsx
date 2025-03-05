import React, { useState } from "react";
import { shareToPlatform } from "../../helpers/shareHelper";
import { FaXTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

type ShareButtonProps = {
  jobTitle: string;
  jobUrl: string;
  companyName: string;
  location: string;
};

const ShareButton: React.FC<ShareButtonProps> = (props) => {
  const [showCustomMessage, setShowCustomMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const handleShare = (platform: string) => {
    shareToPlatform(platform, {
      ...props,
      customMessage: customMessage.trim() || undefined
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-4">
        <span className="font-medium text-gray-600">Share:</span>

        <button
          onClick={() => handleShare("twitter")}
          className="flex items-center justify-center rounded-lg bg-black p-2 text-white transition-colors hover:bg-gray-800"
          aria-label="Share to X"
        >
          <FaXTwitter className="h-5 w-5" />
        </button>

        <button
          onClick={() => handleShare("linkedin")}
          className="flex items-center justify-center rounded-lg bg-[#0A66C2] p-2 text-white transition-colors hover:bg-[#084e96]"
          aria-label="Share to LinkedIn"
        >
          <FaLinkedin className="h-5 w-5" />
        </button>

        <button
          onClick={() => handleShare("whatsapp")}
          className="flex items-center justify-center rounded-lg bg-[#25D366] p-2 text-white transition-colors hover:bg-[#1da850]"
          aria-label="Share to WhatsApp"
        >
          <FaWhatsapp className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => setShowCustomMessage(!showCustomMessage)}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          {showCustomMessage ? "Hide custom message" : "Add custom message"}
        </button>
      </div>
      
      {showCustomMessage && (
        <div className="mt-2 w-full">
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Add your personal message here..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
        </div>
      )}
    </div>
  );
};

export default ShareButton;