import DownloadCertificate from "@/components/developer/downloadCertificate";
import { getUserAssessmentById } from "@/libs/assessment";
import { IUserAssessment } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default async function CertificateVerification({
  params,
}: {
  params: { certificateId: string };
}) {
  const splitinput = params.certificateId.split("-");
  const userAssessmentId = Number(splitinput.pop());

  const userAssessment: IUserAssessment =
    await getUserAssessmentById(userAssessmentId);

  const date = new Date(userAssessment.endTime);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const certificateId = `TB-${userAssessment.assessment.title
    .split(" ")
    .map((word) => word[0])
    .join(
      "",
    )}-${userAssessment.endTime.slice(0, 10).replace(/-/g, "")}-${userAssessment.id}`;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <div className="h-[797px] w-[1123px] border-l-[20px] border-r-[20px] border-accent bg-white p-10 px-5 shadow-lg">
        <div className="flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/difaukz1b/image/upload/v1739765828/logo/smysmsf93hhdfdc2guw9.png"
            alt="logo"
            width={1000}
            height={1000}
            className="w-80"
          ></Image>
        </div>
        <h1 className="mt-10 text-center text-7xl font-medium text-primary">
          Certificate of Completion
        </h1>
        <div className="mt-10 flex flex-col items-center">
          <p className="text-lg">This certificate is proudly presented to:</p>
          <h2 className="mt-10 w-fit border-b border-accent pb-2 text-center text-5xl font-semibold text-accent">
            {userAssessment.User.fullname}{" "}
          </h2>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg">
            For completing Talent Bridge's Skill Assessment:
          </p>
          <p className="mt-5 text-3xl font-medium">
            {userAssessment.assessment.title}
          </p>
          <p className="mt-5 text-lg">Date: {formattedDate}</p>
        </div>
        <div className="mt-10 flex flex-col items-center">
          <p>
            Certificate ID:{" "}
            <span className="font-semibold">{certificateId}</span>
          </p>
          <p>
            This certificate can be verified at:{" "}
            <span className="text-accent">
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL_FE}/verify-certificate/${certificateId}`}
              >
                {`${process.env.NEXT_PUBLIC_BASE_URL_FE}/verify-certificate/${certificateId}`}
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
