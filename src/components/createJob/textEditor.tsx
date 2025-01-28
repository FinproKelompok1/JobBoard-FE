"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { FormValueJob } from "@/types/form";
import { ErrorMessage } from "formik";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

interface FieldRichTextProps {
  setFieldValue: (a: string, b: string) => void
  values: FormValueJob
  name: keyof FormValueJob
}

const RichTextEditor: React.FC<FieldRichTextProps> = ({ setFieldValue, name, values }) => {

  const handleChange = (e: string) => {
    setFieldValue(name, e);
  };

  return (
    <>
      <label htmlFor="description" className='text-normal sm:text-xl font-medium mb-2 w-fit'>Description</label>
      <ReactQuill
        id="description"
        value={values[name] as string}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className="rounded-md"
      />
      <ErrorMessage name="description" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
    </>
  );
};

export default RichTextEditor;