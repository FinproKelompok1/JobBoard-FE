import DeveloperDashboardSideBar from "@/components/developer/developerSideBar";

export default function DeveloperDashboard() {
  return (
    <div className="flex">
      <div>
        <DeveloperDashboardSideBar />
      </div>
      <div className="text-primary p-10">
        <h1 className="text-3xl font-bold">
          Welcome Back, <span className="text-accent">Developer</span>.
        </h1>
        <p className="mt-2 text-xl font-medium"> Have a great day at work!</p>
      </div>
    </div>
  );
}
