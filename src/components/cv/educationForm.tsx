"use client";

import { SimpleDateFormatter } from "@/helpers/dateFormatter";
import { useEffect, useState } from "react";

export default function EducationForm({
  onSave,
  initialEducation = "",
}: {
  onSave: (education: string) => void;
  initialEducation?: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [currentlyStudying, setCurrentlyStudying] = useState(false);
  const [educations, setEducations] = useState<string[]>(
    initialEducation ? initialEducation.split(";") : [],
  );
  const [formData, setFormData] = useState({
    schoolName: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    setEducations(initialEducation ? initialEducation.split(" ; ") : []);
  }, [initialEducation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "endDate" && currentlyStudying) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setCurrentlyStudying(!currentlyStudying);
    setFormData({ ...formData, endDate: "" });
    2;
  };

  const handleSaveEducation = () => {
    const educationString = `${formData.schoolName}, ${formData.degree}, ${formData.field}, ${formData.startDate}, ${
      currentlyStudying ? "Present" : formData.endDate
    }, ${formData.description}`;

    const updatedEducations = [...educations, educationString];

    setEducations(updatedEducations);
    onSave(updatedEducations.join(" ; "));

    setFormData({
      schoolName: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    setCurrentlyStudying(false);
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    const updatedExperiences = educations.filter((_, i) => i !== index);
    setEducations(updatedExperiences);
    onSave(updatedExperiences.join(" ; "));
  };

  console.log("Current educations state:", educations);

  return (
    <div>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-accent px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
        >
          Add Education
        </button>
      )}

      {showForm && (
        <div className="mt-4 rounded-lg border bg-gray-100 p-4 shadow-md">
          <h3 className="text-lg font-semibold">Add Education</h3>
          <p>Please add education in order from oldest to newest</p>

          <div className="mt-3 flex flex-col">
            <label className="font-medium">School or University Name</label>
            <input
              type="text"
              name="schoolName"
              placeholder="School Name"
              value={formData.schoolName}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mt-3 flex flex-col">
            <label className="font-medium">Degree</label>
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mt-3 flex flex-col">
            <label className="font-medium">Field of Study</label>
            <input
              type="text"
              name="field"
              placeholder="Field of Study"
              value={formData.field}
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

            {!currentlyStudying && (
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
                checked={currentlyStudying}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="currentlyWorking">Currently studying here</label>
            </div>
          </div>

          <div className="mt-3 flex flex-col">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="h-40 w-full rounded border p-2"
            ></textarea>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleSaveEducation}
              className="mt-2 rounded-lg border border-accent bg-accent px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-accent/80"
            >
              Add Education
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

      {educations.length > 0 && (
        <div className="ml-4 mt-5">
          <ul className="list-disc space-y-4">
            {educations.map((edu, index) => {
              const parts = edu.split(", ");
              if (parts.length < 6) return null;

              const [
                schoolName,
                degree,
                field,
                startDate,
                endDate,
                ...descriptionArray
              ] = parts;

              const description = descriptionArray.join(", ");

              return (
                <li key={index} className="border-b pb-3">
                  <h1 className="text-lg font-bold">{schoolName}</h1>
                  <div className="flex gap-2">
                    <h2 className="text-lg font-semibold">{degree}</h2>
                    <p>-</p>
                    <h2 className="text-lg font-semibold">{field}</h2>
                    <button
                      onClick={() => handleDelete(index)}
                      className="ml-3 rounded-lg border border-accent px-2 py-0.5 font-medium text-accent transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-700">
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
