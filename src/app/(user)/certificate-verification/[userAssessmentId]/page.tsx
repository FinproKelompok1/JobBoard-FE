import { getUserAssessmentById } from "@/libs/assessment";
import { IUserAssessment } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

export default async function CertificateVerification({
  params,
}: {
  params: { userAssessmentId: string };
}) {
  const splitinput = params.userAssessmentId.split("-");
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
    <div className="flex min-h-screen w-full flex-col p-5 md:items-center md:justify-center md:bg-gray-100">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold text-green-600">
            This certificate is verified
          </h1>
          <MdVerified className="size-8 text-green-600" />
        </div>
      </div>

      <div className="mt-5 h-[797px] w-[1123px] border-l-[20px] border-r-[20px] border-accent bg-white p-10 px-5 shadow-lg">
        <div className="flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/difaukz1b/image/upload/v1739765828/logo/smysmsf93hhdfdc2guw9.png"
            alt="logo"
            width={1000}
            height={1000}
            className="w-80"
          ></Image>
        </div>
        <h1 className="mt-10 text-center text-7xl font-semibold text-primary">
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
          <div className="mt-5 flex flex-col items-center justify-center gap-2">
            <p className="text-3xl font-medium">
              {userAssessment.assessment.title}
            </p>
            <div className="flex flex-col items-center justify-center rounded-xl border bg-primary p-1">
              <Image
                src={`${userAssessment.certificate.badgeIcon}`}
                alt="badge image"
                width={100}
                height={100}
                className="w-14"
              />
              <span className="text-lg font-bold tracking-widest text-white">
                {userAssessment.assessment.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <div className="flex flex-col justify-end">
            <p>
              Completed on{" "}
              <span className="font-semibold">{formattedDate}</span>
            </p>
            <p>
              Certificate ID:{" "}
              <span className="font-semibold">{certificateId}</span>
            </p>
            <p>
              This certificate can be verified at{" "}
              <span className="text-accent">
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL_FE}/certificate-verification/${certificateId}`}
                >
                  {`${process.env.NEXT_PUBLIC_BASE_URL_FE}/certificate-verification/${certificateId}`}
                </Link>
              </span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm">Scan to verify</p>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={{${process.env.NEXT_PUBLIC_BASE_URL_FE}/certificate-verification/${certificateId}}}`}
              alt="Certificate QR Code"
              width={100}
              height={100}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
