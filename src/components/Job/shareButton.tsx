// ShareButton.tsx
import React from "react";
import { shareToPlatform } from "../../helpers/shareHelper";

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

      <button
        onClick={() => handleShare("facebook")}
        className="flex items-center justify-center rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
        aria-label="Share to Facebook"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </button>

      <button
        onClick={() => handleShare("twitter")}
        className="flex items-center justify-center rounded-lg bg-blue-400 p-2 text-white transition-colors hover:bg-blue-500"
        aria-label="Share to Twitter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </button>

      <button
        onClick={() => handleShare("linkedin")}
        className="flex items-center justify-center rounded-lg bg-blue-800 p-2 text-white transition-colors hover:bg-blue-900"
        aria-label="Share to LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      </button>

      <button
        onClick={() => handleShare("whatsapp")}
        className="flex items-center justify-center rounded-lg bg-green-500 p-2 text-white transition-colors hover:bg-green-600"
        aria-label="Share to WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 4.904 1.592 4.547 0 8.245-3.7 8.245-8.246 0-4.547-3.698-8.246-8.245-8.246-4.547 0-8.246 3.699-8.246 8.246 0 1.719.53 3.366 1.533 4.786l.835-3.045 7.574 7.574z" />
        </svg>
      </button>
    </div>
  );
};

export default ShareButton;