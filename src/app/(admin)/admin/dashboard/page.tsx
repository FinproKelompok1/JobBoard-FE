import DemographyGraphics from "@/components/demographic/demographyGraphics";
import SalaryTrendGraphics from "@/components/salaryTrend/salaryTrendGraphics";

export default function DashboardPage() {
  return (
    <main>
      <div className="max-w-[940px] mx-auto">
        <DemographyGraphics />
        <SalaryTrendGraphics />
      </div>
    </main>
  )
}