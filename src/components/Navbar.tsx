import React from "react";
import Image from "next/image";
import logo from "@/images/logo-devlinks-small.svg";
import linkIcon from "@/images/icon-link.svg";
import profileIcon from "@/images/icon-profile-details-header.svg";
import previewIcon from "@/images/icon-preview-header.svg";
function Navbar() {
  return (
    <div className="flex w-full justify-between">
      {/* Logo */}
      <div className="w-[52px] h-[32x] flex items-center justify-center">
        <Image src={logo} alt="logo" className="w-[32px] h-[32px]" />
      </div>

      <div className="flex w-[148px] h-[42px] justify-evenly">
        {/* URL icon */}
        <div className="flex justify-center items-center w-[74px] h-[42px] border border-purple-100 rounded-xl bg-purple-100">
          <Image src={linkIcon} alt="linkIcon" className="w-[20px] h-[20px]" />
        </div>

        {/* Profile Icon */}
        <div className=" flex justify-center items-center w-[74px] h-[42px]">
          <Image src={profileIcon} alt="logo" className="w-[20px] h-[20px]" />
        </div>
      </div>

      {/* Eye Icon */}

      <div className="flex justify-center items-center w-[52px] h-[42px] border border-purple-100 rounded-xl bg-purple-100">
        <Image src={previewIcon} alt="logo" className="w-[20px] h-[20px]" />
      </div>
    </div>
  );
}

export default Navbar;
