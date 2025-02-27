import React, { useState, useEffect } from "react";
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
import { checkIfOauthUser } from "@/libs/auth"; 

interface AdminEmailSectionProps {
  email: string;
}

export default function AdminEmailSection({ email }: AdminEmailSectionProps) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOauth, setIsOauth] = useState(false);
  const [isOauthDialogOpen, setIsOauthDialogOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    newEmail: "",
    password: "",
  });

  useEffect(() => {
    const checkOauth = async () => {
      try {
        const isOauthUser = await checkIfOauthUser(email, true); 
        setIsOauth(isOauthUser);
      } catch (error) {
        console.error("Error checking OAuth status:", error);
      }
    };

    checkOauth();
  }, [email]);

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

  const handleEmailButtonClick = () => {
    if (isOauth) {
      setIsOauthDialogOpen(true);
    } else {
      setShowEmailDialog(true);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#0D3880]">Email Address</h3>
        <button
          onClick={handleEmailButtonClick}
          className={`flex items-center gap-1 font-medium ${
            isOauth
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#E60278] hover:text-pink-700"
          }`}
          disabled={isOauth}
        >
          <Mail className="h-4 w-4" />
          Change Email
        </button>
      </div>
      <p className="mt-2 text-gray-600">{email}</p>
      {isOauth && (
        <p className="mt-1 text-xs text-amber-600">
          Email change is not available for social login accounts.
        </p>
      )}

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

      <Dialog open={isOauthDialogOpen} onOpenChange={setIsOauthDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[#0D3880]">Social Login Account</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 mb-2">We&apos;ve detected that you signed up using a social login provider (Google).</p>
            <p className="text-gray-700 mb-2">Email change is not available for social login accounts.</p>
            <p className="text-gray-700">To change your email, please update it in your Google or Facebook account settings, then use the updated email to log in.</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOauthDialogOpen(false)}
              className="bg-[#E60278] text-white py-2 px-4 rounded-lg hover:bg-[#E60278]/90 transition-colors"
            >
              I Understand
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}