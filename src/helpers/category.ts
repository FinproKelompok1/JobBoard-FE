import { JobCategory } from "@/types/jobdis";

export const getCategoryIcon = (category: JobCategory): string => {
  const icons: Record<JobCategory, string> = {
    accountancy: "💼",
    sales: "🤝",
    marketing: "📢",
    engineering: "⚙️",
    construction: "🏗️",
    tourism: "✈️",
    administration: "📋",
    manufacture: "🏭",
    informatics: "💻",
  };
  return icons[category];
};
