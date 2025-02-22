import { SimpleDateFormatter } from "@/helpers/dateFormatter";
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
  const skillList = skills?.split(",").map((skill) => skill.trim());

  return (
    <main className="flex flex-col items-center">
      {userCv && (
        <section>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{userCv.fullname}</h1>
            <div className="flex gap-2">
              <p>
                {toTitleCase(userCv.location?.city || "City")},{" "}
                {toTitleCase(userCv.location?.province || "Province")}
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
              Work Experiences
            </h1>
            <ul className="list-disc">
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
                    <li key={index} className="mt-5">
                      <h2 className="text-xl font-bold">{position.trim()}</h2>
                      <h2 className="text-lg font-medium">{company.trim()}</h2>
                      <p className="mt-1 text-lg font-medium text-gray-600">
                        {SimpleDateFormatter(startDate.trim())} -{" "}
                        {endDate.trim() === "Present"
                          ? "Present"
                          : SimpleDateFormatter(endDate.trim())}
                      </p>
                      <p className="mt-2">{description.trim()}</p>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="mt-5">
            <h1 className="border-b border-gray-500 pb-1 text-2xl font-bold">
              Education
            </h1>
            {userCv.CurriculumVitae[0].education
              .split(";")
              .map((education, index) => {
                const details = education.split(",");
                if (details.length < 6) return null;

                const [
                  school,
                  degree,
                  field,
                  startDate,
                  endDate,
                  ...descriptionParts
                ] = details;

                const description = descriptionParts.join(",").trim();

                return (
                  <div key={index} className="mt-5">
                    <h2 className="text-xl font-bold">{school.trim()}</h2>

                    <div className="flex items-center gap-1">
                      <h2 className="text-lg font-medium">{degree.trim()}</h2>
                      <p>-</p>
                      <h2 className="text-lg font-medium">{field.trim()}</h2>
                    </div>
                    <p className="mt-1 text-lg font-medium text-gray-600">
                      {SimpleDateFormatter(startDate.trim())} -{" "}
                      {endDate.trim() === "Present"
                        ? "Present"
                        : SimpleDateFormatter(endDate.trim())}
                    </p>
                    <p className="mt-2">{description}</p>
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
