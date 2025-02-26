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

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.put("/auth/admin/change-email", {
        newEmail: emailData.newEmail,
        password: emailData.password,
      });

      toast.success("Please check your new email for verification link");
      setEmailData({
        newEmail: "",
        password: "",
      });
      setShowEmailDialog(false);
    } catch (error) {
      toastErrAxios(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Email Address</h3>
        <button
          onClick={() => setShowEmailDialog(true)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <Mail className="h-4 w-4" />
          Change Email
        </button>
      </div>
      <p className="text-gray-600">{email}</p>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEmailChange} className="space-y-4">
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
                Confirm Password
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
                    Sending...
                  </>
                ) : (
                  "Change Email"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}