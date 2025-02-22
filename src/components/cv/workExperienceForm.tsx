"use client";

import DateFormatter, { SimpleDateFormatter } from "@/helpers/dateFormatter";
import { useEffect, useState } from "react";

export default function WorkExperienceForm({
  onSave,
  initialExperience = "",
}: {
  onSave: (experience: string) => void;
  initialExperience?: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [workExperiences, setWorkExperiences] = useState<string[]>(
    initialExperience ? initialExperience.split(";") : [],
  );
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    setWorkExperiences(initialExperience ? initialExperience.split(" ; ") : []);
  }, [initialExperience]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "endDate" && currentlyWorking) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setCurrentlyWorking(!currentlyWorking);
    setFormData({ ...formData, endDate: "" });
  };

  const handleSaveExperience = () => {
    const experienceString = `${formData.companyName}, ${formData.position}, ${formData.startDate}, ${
      currentlyWorking ? "Present" : formData.endDate
    }, ${formData.description}`;

    const updatedExperiences = [...workExperiences, experienceString];

    setWorkExperiences(updatedExperiences);
    onSave(updatedExperiences.join(" ; "));

    setFormData({
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    setCurrentlyWorking(false);
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    const updatedExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updatedExperiences);
    onSave(updatedExperiences.join(" ; "));
  };

  return (
    <div>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-accent px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
        >
          Add Work Experience
        </button>
      )}

      {showForm && (
        <div className="mt-4 rounded-lg border bg-gray-100 p-4 shadow-md">
          <h3 className="text-lg font-semibold">Add Work Experience</h3>
          <p>Please add work experience in order from oldest to newest</p>

          <div className="mt-3 flex flex-col">
            <label className="font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mt-3 flex flex-col">
            <label className="font-medium">Job Position</label>
            <input
              type="text"
              name="position"
              placeholder="Job Position"
              value={formData.position}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mt-3 flex gap-5">
            <div className="flex flex-col">
              <label className="font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-fit rounded border p-2"
              />
            </div>

            {!currentlyWorking && (
              <div className="flex flex-col">
                <label className="font-medium">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-fit rounded border p-2"
                />
              </div>
            )}
            <div className="mt-6 flex items-center gap-2">
              <input
                type="checkbox"
                id="currentlyWorking"
                checked={currentlyWorking}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="currentlyWorking">Currently working here</label>
            </div>
          </div>

          <div className="mt-3 flex flex-col">
            <label className="font-medium">Job Description</label>
            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleChange}
              className="h-40 w-full rounded border p-2"
            ></textarea>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleSaveExperience}
              className="mt-2 rounded-lg border border-accent bg-accent px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
            >
              Add Work Experience
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="mt-2 rounded-lg border border-accent px-4 py-2 font-medium text-accent transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {workExperiences.length > 0 && (
        <div className="ml-4 mt-5">
          <ul className="list-disc space-y-4">
            {workExperiences.map((exp, index) => {
              const parts = exp.split(", ");
              if (parts.length < 5) return null;
              const [
                company,
                position,
                startDate,
                endDate,
                ...descriptionArray
              ] = parts;

              const description = descriptionArray.join(", ");

              return (
                <li key={index} className="border-b pb-3">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">{position}</h1>
                    <p>-</p>
                    <h2 className="text-lg font-semibold">{company}</h2>
                    <button
                      onClick={() => handleDelete(index)}
                      className="ml-3 rounded-lg border border-accent px-2 py-0.5 font-medium text-accent transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="mt-1 text-lg font-medium text-gray-600">
                    {SimpleDateFormatter(startDate)} -{" "}
                    {endDate === "Present"
                      ? "Present"
                      : SimpleDateFormatter(endDate)}
                  </p>
                  <p className="mt-1 text-gray-800">{description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
