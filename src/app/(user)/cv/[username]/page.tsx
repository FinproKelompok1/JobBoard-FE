"use client";

import { handleDownloadCv } from "@/components/cv/downloadCV";
import { getUserCv } from "@/libs/cv";
import { IUserCv } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CurriculumVitae({
  params,
}: {
  params: { username: string };
}) {
  const [userCv, setUserCv] = useState<IUserCv | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserCv = async () => {
      try {
        const userCv = await getUserCv(params.username);
        setUserCv(userCv);
      } catch (error) {
        console.error("Error fetching user CV:", error);
      }
    };
    fetchUserCv();
  }, []);

  function toTitleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const skills = userCv?.CurriculumVitae[0]?.skill || "";
  const skillList = skills
    ? skills.split(",").map((skill) => skill.trim())
    : [];

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-5 md:p-10">
      <section className="flex w-full flex-col">
        <div className="flex flex-col items-center justify-center">
          <h1 className="w-full text-center text-3xl font-bold text-primary">
            My Curriculum Vitae
          </h1>
        </div>
        <div className="mt-5 flex items-center justify-center gap-5">
          {!userCv ? (
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">
                You haven't created a CV yet. Please create one to get started.
              </p>
              <Link
                href={`/${params.username}/cv/create`}
                className="w-fit rounded-lg bg-accent px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
              >
                Create CV
              </Link>
            </div>
          ) : (
            <>
              <Link
                href={`/${params.username}/cv/${userCv?.CurriculumVitae[0]?.id}/update`}
                className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-primary/80"
              >
                Update CV
              </Link>
              <button
                onClick={() =>
                  handleDownloadCv(params.username, setIsDownloading)
                }
                disabled={isDownloading}
                className="rounded-lg bg-accent px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-accent/80 disabled:cursor-not-allowed disabled:bg-accent/80"
              >
                {isDownloading ? "Downloading..." : "Download"}
              </button>
            </>
          )}
        </div>
      </section>

      {userCv && (
        <section className="mt-5 w-full border bg-white p-5 md:w-[1000px] md:px-20 md:py-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{userCv.fullname}</h1>
            <div className="flex gap-2">
              <p>
                {toTitleCase(userCv.location.city)},{" "}
                {toTitleCase(userCv.location.province)}
              </p>
              <p>|</p>
              <p>{userCv.email}</p>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="border-b border-gray-500 pb-1 text-2xl font-bold">
              Summary
            </h1>
            <p className="mt-3">{userCv.CurriculumVitae[0]?.summary}</p>
          </div>

          <div className="mt-5">
            <h1 className="border-b border-gray-500 pb-1 text-2xl font-bold">
              Experiences
            </h1>
            {userCv.CurriculumVitae[0]?.experience
              .split(";")
              .map((experience, index) => {
                const details = experience.split(",");
                if (details.length < 5) return null;

                const [
                  company,
                  position,
                  startDate,
                  endDate,
                  ...descriptionParts
                ] = details;
                const description = descriptionParts.join(",").trim();

                return (
                  <div key={index} className="mt-3">
                    <h2 className="text-xl font-semibold">{position.trim()}</h2>
                    <p className="font-medium">
                      {company.trim()} | {startDate.trim()} - {endDate.trim()}
                    </p>
                    <p className="mt-2">{description}</p>
                  </div>
                );
              })}
          </div>

          <div className="mt-5">
            <h1 className="border-b border-gray-500 pb-1 text-2xl font-bold">
              Education
            </h1>
            {userCv.CurriculumVitae[0]?.education
              .split(";")
              .map((education, index) => {
                const details = education.split(",");
                if (details.length < 5) return null;

                const [school, degree, field, startDate, endDate] = details;

                return (
                  <div key={index} className="mt-3">
                    <h2 className="text-xl font-semibold">{school.trim()}</h2>
                    <p className="font-medium">
                      {degree.trim()}, {field.trim()} | {startDate.trim()} -{" "}
                      {endDate.trim()}
                    </p>
                  </div>
                );
              })}
          </div>

          <div className="mt-5">
            <h1 className="border-b border-gray-500 pb-1 text-2xl font-bold">
              Skills
            </h1>
            <ul className="mt-3 list-disc pl-4">
              {skillList &&
                skillList.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
