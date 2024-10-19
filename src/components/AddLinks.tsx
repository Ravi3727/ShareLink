"use client";
import React, { useState } from "react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import GitHubicon from "@/images/icon-github.svg";
import YouTubeicon from "@/images/icon-youtube.svg";
import LinkedInicon from "@/images/icon-linkedin.svg";
import FaceBookicon from "@/images/icon-facebook.svg";
import FrontEndManagericon from "@/images/icon-frontend-mentor.svg";
import FreeCodeCampicon from "@/images/icon-freecodecamp.svg";
import IconDown from "@/images/icon-chevron-down.svg";
interface Icons{
    [key:string]:string;
  }
const platformIcons:Icons = {
  GitHub: GitHubicon,
  YouTube: YouTubeicon,
  LinkedIn: LinkedInicon,
  Facebook: FaceBookicon,
  "Frontend Mentor": FrontEndManagericon,
  FreeCodeCamp: FreeCodeCampicon,
};

interface Links {
  title: string;
  url: string;
}
interface LinkCountProps {
  setLinkCount: React.Dispatch<React.SetStateAction<number>>;
  setNewLinkData: React.Dispatch<React.SetStateAction<Links>>; 
}

interface newLinks{
  target:{
    value:string;
  }
}
function AddLinks({ setLinkCount, setNewLinkData }:LinkCountProps) {
  const [active, setActive] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(""); 
  const [url, setUrl] = useState<string>(""); 
  const platforms = [
    "GitHub",
    "YouTube",
    "LinkedIn",
    "Facebook",
    "FreeCodeCamp",
    "Frontend Mentor",
  ];

  // Function to handle platform selection
  const handlePlatformSelect = (selectedPlatform:string) => {
    setTitle(selectedPlatform);
    setNewLinkData({ title: selectedPlatform, url });
    setActive(false);
  };

  const handleUrlChange = (e:newLinks) => {
    setUrl(e.target.value);
    setNewLinkData({ title, url: e.target.value });
  };

  const handleRemove = () => {
    setLinkCount((prevCount:number) => prevCount - 1);
  };

  return (
    <div className="w-full md:w-[80%] mx-auto h-full overflow-y-auto p-4 rounded-md shadow-md">
      <div className="flex w-full justify-between items-center mb-4">
        <div className="text-md font-semibold text-gray-600">
          Add a New Link
        </div>
        <button
          onClick={handleRemove}
          className="text-md font-semibold text-customRed
          "
        >
          {"Remove"}
        </button>
      </div>

      {/* Platform Selector */}
      <div className="text-sm font-semibold text-gray-600 mb-1">Platform</div>
      <div
        onClick={() => setActive(!active)}
        className="cursor-pointer hover:shadow-[10px_30px_30px_-1px_rgb(0,0,0,0.1),8px_12px_10px_-2px_rgb(0,0,0,0.1)]flex justify-between items-center mb-2 border-2 p-1 rounded-lg"
      >
        <div className="flex items-center">
          {title && (
            <Image
              src={platformIcons[title]}
              alt={`${title} icon`}
              className="w-6 h-6 mr-2"
            />
          )}
          <div className="w-full flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-600">
              {title || "Select a Platform"}
            </span>
            <div>
              <Image src={IconDown} alt="dropdown icon" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Dropdown */}
      {active && (
        <div className="border-2 rounded-lg p-2 mb-4">
          {platforms.map((title) => (
            <div
              key={title}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => handlePlatformSelect(title)}
            >
              <div className="flex items-center">
                <Image
                  src={platformIcons[title]}
                  alt={`${title} icon`}
                  className="w-6 h-6 mr-2"
                />
                <span>{title}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* URL Input */}
      <div className="text-sm font-semibold text-gray-600 mb-1">URL</div>
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        className="w-full border-2 rounded-lg p-2 mb-4 text-sm"
        placeholder="Enter your URL here"
      />
    </div>
  );
}

export default AddLinks;
