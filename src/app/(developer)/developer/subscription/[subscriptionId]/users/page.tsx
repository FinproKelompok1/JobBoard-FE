import DeveloperSideBar from "@/components/developer/developerSideBar";
import DateFormatter from "@/helpers/dateFormatter";
import { getSubscriptionById, getSubscriptionUsers } from "@/libs/subscription";
import { ISubscription, ISubscriptionUsers } from "@/types/types";

export default async function SubscriptionUsers({
  params,
}: {
  params: { subscriptionId: number };
}) {
  const subscriptionUsers: ISubscriptionUsers[] = await getSubscriptionUsers(
    params.subscriptionId,
  );
  const subscription: ISubscription = await getSubscriptionById(
    params.subscriptionId,
  );

  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-full overflow-x-auto p-5 md:p-10">
        <h1 className="w-full text-3xl font-bold text-primary">
          Subscription Users
        </h1>
        <h2 className="mt-3 text-xl font-semibold text-accent">
          {subscription.category === "professional"
            ? "Professional"
            : "Standard"}{" "}
          Category
        </h2>

        <div className="mt-5 max-w-full overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary/10">
              <tr>
                <th className="table-head border-b border-r border-gray-300">
                  Full Name
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  User Email
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  Start Date
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  End Date
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  Assessment
                </th>
                <th className="table-head border-b border-r border-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {subscriptionUsers.map((item, index) => (
                <tr key={index}>
                  <td className="table-data border-b border-r border-gray-300">
                    {item.user.fullname}
                  </td>
                  <td className="table-data border-b border-r border-gray-300">
                    {item.user.email}
                  </td>
                  <td className="table-data border-b border-r border-gray-300">
                    {DateFormatter(item.startDate)}
                  </td>
                  <td className="table-data border-b border-r border-gray-300">
                    {DateFormatter(item.endDate)}
                  </td>
                  <td className="table-data border-b border-r border-gray-300">
                    {item.assessmentCount}
                  </td>
                  <td className="table-data border-b border-r border-gray-300">
                    {item.isActive ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
