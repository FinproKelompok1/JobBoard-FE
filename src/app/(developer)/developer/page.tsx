import DeveloperSideBar from "@/components/developer/developerSideBar";
import DeveloperDashboardSideBar from "@/components/developer/developerSideBar";
import { IoClose, IoMenu } from "react-icons/io5";

export default function DeveloperDashboard() {
  return (
    <div className="flex">
      <DeveloperSideBar />

      <div className="p-10 text-primary">
        <h1 className="text-3xl font-bold">
          Welcome Back, <span className="text-accent">Developer</span>.
        </h1>
        <p className="mt-2 text-xl font-medium"> Have a great day at work!</p>
      </div>
    </div>
  );
}
