import AdminNav from "@/components/admin/AdminNav";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="md:flex">
      <Sidebar />
      <div className="flex flex-col md:w-full">
        <AdminNav />
        <main className="w-full relative">{children}</main>
      </div>
    </div>
  )
}