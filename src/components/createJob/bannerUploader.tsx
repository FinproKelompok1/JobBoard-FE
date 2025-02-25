"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { FormikProps } from "formik";
import { FormValueJob } from "@/types/form";

interface BannerUploader {
  name: string;
  formik: FormikProps<FormValueJob>;
  value: string | null
}

export const BannerUploader: React.FC<BannerUploader> = ({
  name,
  formik,
  value
}) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue(name, file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <div className={`flex w-full h-full flex-col gap-2`}>
      <input
        type="file"
        id={name}
        name={name}
        className="hidden"
        ref={imgRef}
        onChange={handleChange}
        onSubmit={() => setPreviewUrl(null)}
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />
      {!previewUrl ? (
        <div
          onClick={() => imgRef.current?.click()}
          className="relative w-full h-full cursor-pointer bg-center bg-cover rounded-lg overflow-hidden"
        >
          <Image src={'https://assets.loket.com/images/banner-event.jpg'} alt="Banner Job" fill />
          <div className="absolute gap-2 flex flex-col items-center top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%]">
            <span className="text-normal sm:text-4xl md:text-6xl text-white">
              +
            </span>
            <p className="font-semibold sm:text-2xl md:text-4xl text-white"> image/poster/banner</p>
            <p className="font-semibold text-xs sm:text-sm md:text-normal text-white text-center">724 x 340px size recommended without over than 2mb</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => imgRef.current?.click()}
          className="overflow-hidden w-full h-full relative cursor-pointer"
        >
          <Image
            src={previewUrl}
            alt="Preview"
            width={200}
            height={200}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      )}
    </div>
  );
};