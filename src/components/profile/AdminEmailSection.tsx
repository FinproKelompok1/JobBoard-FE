import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import axios from "@/helpers/axios";
import { toast } from "react-toastify";
import { toastErrAxios } from "@/helpers/toast";

interface AdminEmailSectionProps {
  email: string;
}

export default function AdminEmailSection({ email }: AdminEmailSectionProps) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState({
    newEmail: "",
    password: "",
  });

  const handleDirectEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.put("/auth/admin/update-email", {
        newEmail: emailData.newEmail,
        password: emailData.password,
      });

      if (response.data.token) {
        const cookieStr = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user="))
          ?.split("=")[1];

        if (cookieStr) {
          try {
            const userData = JSON.parse(decodeURIComponent(cookieStr));

            userData.email = emailData.newEmail;
            userData.token = response.data.token;

            document.cookie = `user=${JSON.stringify(userData)}; path=/`;
          } catch (cookieError) {
            toastErrAxios(cookieError);
          }
        }
      }

      toast.success("Email updated successfully");

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toastErrAxios(error);
    } finally {
      setLoading(false);
      setShowEmailDialog(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#0D3880]">Email Address</h3>
        <button
          onClick={() => setShowEmailDialog(true)}
          className="hover:text-pink-700 flex items-center gap-1 font-medium text-[#E60278]"
        >
          <Mail className="h-4 w-4" />
          Change Email
        </button>
      </div>
      <p className="mt-2 text-gray-600">{email}</p>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDirectEmailChange} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                New Email Address
              </label>
              <input
                type="email"
                value={emailData.newEmail}
                onChange={(e) =>
                  setEmailData((prev) => ({
                    ...prev,
                    newEmail: e.target.value,
                  }))
                }
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                value={emailData.password}
                onChange={(e) =>
                  setEmailData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#E60278]"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEmailDialog(false)}
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="hover:bg-pink-700 flex items-center gap-2 rounded-lg bg-[#E60278] px-4 py-2 text-white disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating...
                  </>
                ) : (
                  "Update Email"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}