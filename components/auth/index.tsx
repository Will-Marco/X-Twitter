"use client";

import Image from "next/image";
import { useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Button from "../ui/Button";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import RegisterModal from "../modals/register-modal";
import LoginModal from "../modals/login-modal";

export default function Auth() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <Image
          src={"./images/x.svg"}
          alt="X"
          height={450}
          width={450}
          className="justify-self-center hidden md:block"
        />
        <div className="h-full md:h-[70vh] flex flex-col justify-center md:justify-between gap-10">
          <div className="block md:hidden">
            <Image src={"./images/x.svg"} alt="X" height={70} width={70} />
          </div>
          <h1 className="text-6xl font-bold">Happening now</h1>
          <div className="w-full md:w-[70%]">
            <h2 className="mb-4 text-3xl font-bold">Join today.</h2>
            <div className="flex flex-col space-y-2 items-center">
              <Button
                label={
                  <div className="flex justify-center items-center gap-2">
                    <FcGoogle />
                    Sign up with Google
                  </div>
                }
                fullWidth
                secondary
              />
              <Button
                label={
                  <div className="flex justify-center items-center gap-2">
                    <AiFillGithub />
                    Sign up with Github
                  </div>
                }
                fullWidth
                secondary
              />
              <div className="w-full flex justify-center items-center">
                <hr className="h-[2px] w-full bg-gray-500" />
                <p className="mx-4">or</p>
                <hr className="h-[2px] w-full bg-gray-500" />
              </div>
              <Button
                label="Create account"
                fullWidth
                onClick={onOpenRegisterModal}
              />
              <div className="text-[10px] text-gray-400">
                By signing up, you agree to the{" "}
                <span className="text-sky-500">Terms of Service</span> and
                <span className="text-sky-500"> Privacy Policy</span>, including
                <span className="text-sky-500"> Cookie Use</span>.
              </div>
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <h3 className="mb-4 text-xl font-medium">
              Already have an account
            </h3>
            <Button
              label="Sign in"
              fullWidth
              outline
              onClick={onOpenLoginModal}
            />
          </div>
        </div>
      </div>
    </>
  );
}
