"use client";

import useEditModal from "@/hooks/useEditModal";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Loader2 } from "lucide-react";
import axios from "axios";
import CoverImageUpload from "../shared/Cover-image-upload";
import ProfileImageUpload from "../shared/Profile-image-upload";
import EditForm from "../shared/Edit-form";

interface PropsType {
  user: IUser;
}

export default function EditModal({ user }: PropsType) {
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const editModal = useEditModal();

  const handleImageUpload = async (image: string, isProfileImage: boolean) => {
    try {
      setIsLoading(true);
      await axios.put(`/api/users/${user._id}`, {
        [isProfileImage ? "profileImage" : "coverImage"]: image,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCoverImage(user.coverImage);
    setProfileImage(user.profileImage);
  }, [user]);

  const bodyContent = (
    <>
      {isLoading && (
        <div className="h-[300px] absolute left-0 top-12 right-0 flex justify-center items-center bg-black opacity-50 z-10">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      )}
      <CoverImageUpload
        coverImage={coverImage}
        onChange={(image) => handleImageUpload(image, false)}
      />
      <ProfileImageUpload
        profileImage={profileImage}
        onChange={(image) => handleImageUpload(image, true)}
      />

      <EditForm user={user} />
    </>
  );

  return (
    <Modal
      body={bodyContent}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      isEditing
    />
  );
}
