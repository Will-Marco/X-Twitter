"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdDownload } from "react-icons/io";
import { MdEdit } from "react-icons/md";

interface PropsType {
  profileImage: string;
  onChange: (profileImage: string) => void;
}

export default function ProfileImageUpload({
  profileImage,
  onChange,
}: PropsType) {
  const [image, setImage] = useState(profileImage);

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
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className: "w-fit text-white text-center border-none rounded-md",
      })}
    >
      <input {...getInputProps()} />
      {fileRejections.length ? (
        <p className="text-red-800">File is larger than 1 MB</p>
      ) : null}
      {image ? (
        <div className="w-32 h-32 relative -top-20 left-6 border-4 border-black rounded-full transition cursor-pointer">
          <Image
            src={image}
            fill
            alt="Uploaded image"
            style={{ objectFit: "cover", borderRadius: "100%" }}
          />
          <div className="absolute inset-0 flex justify-center items-center rounded-full">
            <MdEdit size={24} className={"text-white"} />
          </div>
        </div>
      ) : (
        <div className="relative -top-20 left-6">
          <div className="w-32 h-32 relative -top-20 left-6 border-4 border-black rounded-full transition cursor-pointer">
            <Image
              fill
              style={{ objectFit: "cover", borderRadius: "100%" }}
              alt="Avatar"
              src={"/images/placeholder.png"}
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black/40 rounded-full">
              <IoMdDownload size={40} className={"text-black"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
