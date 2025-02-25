type ShareData = {
  jobTitle: string;
  jobUrl: string;
  companyName: string;
  location: string;
};

export const buildShareMessage = ({
  jobTitle,
  companyName,
  location,
}: ShareData): string => {
  return `Cek lowongan ini: ${jobTitle} di ${companyName} (${location})`;
};

export const buildShareUrl = (platform: string, data: ShareData): string => {
  const message = buildShareMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(data.jobUrl);

  switch (platform) {
    case "twitter":
      return `https://twitter.com/share?url=${encodedUrl}&text=${encodedMessage}`;

    case "linkedin":
      return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedMessage}%0A${encodedUrl}`;

    case "whatsapp":
      return `whatsapp://send?text=${encodedMessage}%0A${encodedUrl}`;

    case "email":
      return `mailto:?subject=${encodedMessage}&body=${encodedUrl}`;

    default:
      return "";
  }
};

export const shareToPlatform = (platform: string, data: ShareData): void => {
  const shareUrl = buildShareUrl(platform, data);
  if (shareUrl) {
    window.open(shareUrl, "_blank");
  }
};
