"use client";
import React from "react";
import Image from "next/image";
import logo from "@/images/logo-devlinks-small.svg";
import linkIcon from "@/images/icon-link.svg";
import profileIcon from "@/images/icon-profile-details-header.svg";
import previewIcon from "@/images/icon-preview-header.svg";
import { useSession, signOut } from "next-auth/react";
// import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
  const { data: session } = useSession();
  // const user: User = session?.user;

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md w-full">
      {/* Logo */}
      <Link href="/">
        <div className="flex">
          <Image src={logo} alt="logo" className="w-[32px] h-[32px]" />
          <div className="max-sm:hidden text-2xl font-bold leading-6 p-1 text-gray-800 text-opacity-90 font-druk">
            devlinks
          </div>
        </div>
      </Link>

      {/*  large screen */}
      <div className="hidden md:flex md:w-8/12 lg:w-6/12 justify-evenly ">
        {/* URL icon */}
        <Link href="/dashboard">
          <div className="flex justify-center items-center w-[90px] h-[36px]  rounded-xl  hover:bg-purple-100 p-1">
            <Image
              src={linkIcon}
              alt="linkIcon"
              className="w-[20px] h-[20px]"
            />
            <div className="max-sm:hidden text-md font-bold leading-6 p-1 text-customPurple text-opacity-90 font-druk">
              Links
            </div>
          </div>
        </Link>

        {/* Profile Icon */}
        <Link href="/dashboard">
          <div className="flex justify-center items-center w-[150px] h-[36px]  rounded-xl p-1 hover:bg-purple-100">
            <Image
              src={profileIcon}
              alt="profileIcon"
              className="w-[20px] h-[20px] md:w-[20px] md:h-[20px]"
            />
            <div className="max-sm:hidden text-md font-bold leading-6 p-1 text-customPurple text-opacity-90 font-druk">
              Profile Details
            </div>
          </div>
        </Link>

        {/* Preview Icon */}
        <Link href="/dashboard">
          <div className="flex justify-center items-center w-[90px] h-[36px] rounded-xl border-2 border-solid p-1   hover:bg-purple-100">
            <div className="max-sm:hidden text-md font-bold leading-6 text-customPurple text-opacity-90 font-druk ">
              Preview
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile Menu (Icon only) */}
      <div className="md:hidden flex w-8/12 justify-evenly space-x-2">
        {/* URL icon */}
        <Link href="/dashboard">
          <div className="flex justify-center items-center w-[42px] h-[42px] border border-purple-100 rounded-xl hover:bg-purple-100">
            <Image
              src={linkIcon}
              alt="linkIcon"
              className="w-[20px] h-[20px]"
            />
          </div>
        </Link>

        {/* Profile Icon */}
        <Link href="/dashboard">
          <div className="flex justify-center items-center w-[42px] h-[42px] hover:bg-blue-100 rounded-xl">
            <Image
              src={profileIcon}
              alt="profileIcon"
              className="w-[20px] h-[20px]"
            />
          </div>
        </Link>
        {/* Preview Icon */}
        <Link href="/dashboard">
          <div className="flex justify-center items-center w-[42px] h-[42px] border border-purple-100 rounded-xl bg-purple-100">
            <Image
              src={previewIcon}
              alt="previewIcon"
              className="w-[20px] h-[20px]"
            />
          </div>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="flex justify-end">
        {session ? (
          <Button
            onClick={() => signOut()}
            className="bg-customPurple hover:bg-blue-600 text-white px-4 py-2"
          >
            LogOut
          </Button>
        ) : (
          <Link href="/signin">
            <Button className="bg-customPurple hover:bg-opacity-90 text-white px-4 py-2">
              LogIn
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
