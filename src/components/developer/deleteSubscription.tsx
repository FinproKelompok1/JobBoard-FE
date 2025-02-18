"use client";

import { deleteSubscription, getSubscriptionUsers } from "@/libs/subscription";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

export default function DeleteSubscription({
  subscriptionId,
}: {
  subscriptionId: number;
}) {
  const [isSubscriptionUser, setIsSubscriptionUser] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteSubsId, setDeleteSubsId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubsUser = async () => {
      try {
        const subscriptionUsers = await getSubscriptionUsers(subscriptionId);
        setIsSubscriptionUser(subscriptionUsers.length > 0);
      } catch (error) {
        console.error("Error fetching subscription users:", error);
      }
    };
    fetchSubsUser();
  }, []);

  const handleDeleteSubscription = async () => {
    if (!deleteSubsId) return;

    if (isSubscriptionUser) {
      toast.error("Cannot delete because subscription has users");
      setDeleteSubsId(null);
      return;
    }

    try {
      setIsDeleting(true);
      await deleteSubscription(deleteSubsId);
      toast.success(`Subscription ID ${deleteSubsId} deleted successfully`);
    } catch (error) {
      console.log("Error deleting subscription:", error);
      toast.error("Error deleting subscription");
    } finally {
      setIsDeleting(false);
      setDeleteSubsId(null);
    }
  };

  return (
    <>
      <button
        onClick={() => setDeleteSubsId(subscriptionId)}
        className="flex items-center justify-center gap-2 rounded-md border-2 border-accent py-2 text-center font-semibold tracking-wide text-accent transition-all duration-300 ease-in-out hover:bg-accent hover:text-white"
      >
        <MdDeleteForever size={22} />
        Delete
      </button>

      {deleteSubsId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[500px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-lg font-bold">
              Are you sure you want to delete subscription ID {deleteSubsId}?
            </h2>
            <div className="mt-4 flex flex-col justify-center gap-3">
              <button
                onClick={() => setDeleteSubsId(null)}
                className="rounded-md border-2 border-primary bg-primary py-2 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-primary/80"
              >
                No, Cancel
              </button>
              <button
                onClick={handleDeleteSubscription}
                className="rounded-md border-2 border-accent py-2 font-semibold tracking-wide text-accent transition-all duration-300 ease-in-out hover:bg-accent hover:text-white"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
