import axios from "@/helpers/axios";

export const handleDownloadCV = async (
  username: string,
  setIsDownloading: (downloading: boolean) => void,
) => {
  try {
    setIsDownloading(true);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const response = await axios.get(`/cv/download/${username}`, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${token}` },
    });

    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CV_${username}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading CV:", error);
  } finally {
    setIsDownloading(false);
  }
};
