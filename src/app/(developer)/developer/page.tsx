import DeveloperSideBar from "@/components/developer/developerSideBar";

export default function DeveloperDashboard() {
  return (
    <div className="flex">
      <DeveloperSideBar />

      <div className="p-20 text-primary">
        <h1 className="text-3xl font-bold">
          Welcome Back, <span className="text-accent">Developer.</span>
        </h1>
        <p className="mt-2 text-xl font-medium"> Have a great day at work!</p>
      </div>
    </div>
  );
}
