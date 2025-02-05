import axios from "@/helpers/axios";
import { getUserCv } from "@/libs/cv";
import { IUserCv } from "@/types/types";

export default async function DownloadCv({
  params,
}: {
  params: { username: string };
}) {
  const userCv: IUserCv = await getUserCv(params.username);

  function toTitleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const skills = userCv?.CurriculumVitae[0].skill;
  const skillList = skills?.split(";").map((skill) => skill.trim());

  return (
    <main className="flex flex-col items-center">
      {userCv && (
        <section>
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
            <p className="mt-3">{userCv.CurriculumVitae[0].summary}</p>
          </div>

          <div className="mt-5">
            <h1 className="border-b border-gray-500 pb-1 text-2xl font-bold">
              Experiences
            </h1>
            {userCv.CurriculumVitae[0].experience
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
            {userCv.CurriculumVitae[0].education
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
