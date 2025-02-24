import DateFormatter from "@/helpers/dateFormatter";
import { getUserAssessments } from "@/libs/assessment";
import { IUserAssessment } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default async function UserAssessmentResultList({
  params,
}: {
  params: { username: string };
}) {
  const userAssessments: IUserAssessment[] = await getUserAssessments(
    params.username,
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mt-5 w-screen md:mt-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-primary md:text-3xl">
            My Assessment Result
          </h1>
        </div>

        <div className="flex items-center justify-center p-5">
          <div className="max-w-full overflow-x-auto rounded-xl border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary/10">
                <tr>
                  <th className="table-head border-b border-r border-gray-300">
                    Badge
                  </th>
                  <th className="table-head border-b border-r border-gray-300">
                    Assessment
                  </th>
                  <th className="table-head border-b border-r border-gray-300">
                    Score
                  </th>
                  <th className="table-head border-b border-r border-gray-300">
                    Status
                  </th>
                  <th className="table-head border-b border-r border-gray-300">
                    Date
                  </th>
                  <th className="table-head border-b border-gray-300">
                    Certificate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {userAssessments.map((data, index) => (
                  <tr key={index}>
                    <td className="table-data">
                      {data.status === "failed" ? (
                        <p className="text-center text-xl font-bold">-</p>
                      ) : (
                        <div className="flex flex-col items-center justify-center rounded-xl border bg-primary p-1">
                          <Image
                            src={`${data.certificate.badgeIcon}`}
                            alt="badge image"
                            width={100}
                            height={100}
                            className="w-10"
                          />
                          <span className="font-bold tracking-widest text-white">
                            {data.assessment.title
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="table-data">{data.assessment.title}</td>
                    <td className="table-data text-center">{data.score}</td>
                    <td className="table-data">
                      <span
                        className={`${data.status === "failed" ? "bg-red-500" : "bg-green-500"} rounded-md px-2 py-1 font-semibold text-white`}
                      >
                        {data.status === "failed" ? "Failed" : "Passed"}
                      </span>
                    </td>
                    <td className="table-data">
                      {DateFormatter(data.endTime)}
                    </td>
                    <td className="table-data">
                      {data.status === "failed" ? (
                        <p className="text-center text-xl font-bold">-</p>
                      ) : (
                        <Link
                          href={`/assessment/${data.User.username}/${data.id}/certificate`}
                          className="text-accent hover:underline hover:underline-offset-2"
                        >
                          {`TB-${data.assessment.title
                            .split(" ")
                            .map((word) => word[0])
                            .join(
                              "",
                            )}-${data.endTime.slice(0, 10).replace(/-/g, "")}-${data.id}`}
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
