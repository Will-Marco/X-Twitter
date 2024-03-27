"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { IoIosCloudDownload } from "react-icons/io";
import { toast } from "../ui/use-toast";

interface PropsType {
  coverImage: string;
  onChange: (coverImage: string) => void;
}

export default function CoverImageUpload({ coverImage, onChange }: PropsType) {
  const [image, setImage] = useState(coverImage);

  const handleChange = useCallback(
    (coverImage: string) => {
      onChange(coverImage);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        setImage(evt.target.result);
        handleChange(evt.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getInputProps, getRootProps, fileRejections } = useDropzone({
    maxFiles: 1,
    maxSize: 1000000,
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
  });

  return (
    <>
      {fileRejections.length ? (
        <p className="text-red-800">File is larger than 1 MB</p>
      ) : null}
      <div
        {...getRootProps({
          className:
            "w-full h-[200px] bg-neutral-700 text-white text-center border-none rounded-md cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        {image ? (
          <div className="w-full h-[200px] relative left-0 right-0">
            <Image
              src={image}
              fill
              alt="Uploaded image"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <MdEdit size={24} className={"text-white"} />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center gap-2 cursor-pointer">
            <IoIosCloudDownload size={50} />
            <p>Upload cover image</p>
          </div>
        )}
      </div>
    </>
  );
}
