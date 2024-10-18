import React from "react";
import Image from "next/image";
import phoneIcon from "@/images/illustration-empty.svg";
function NoLinkView() {
  return (
    <>
      <div className="mx-auto">
        <Image alt="Logo" src={phoneIcon} />
      </div>

      <div className="w-10/12 flex flex-col gap-2 h-[150px]  mx-auto">
        <div
          className="text-2xl font-bold font-druk text-gray-800 opacity-90 text-center"
        >
          Let&apos;s get started
        </div>
        <div className="text-sm text-center font-druk text-gray-500 leading-6">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We&apos;re here to help you
          share your profiles with everyone!
        </div>
      </div>
    </>
  );
}

export default NoLinkView;
