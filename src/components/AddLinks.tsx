"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import GitHubicon from "@/images/icon-github.svg";
import YouTubeicon from "@/images/icon-youtube.svg";
import LinkedInicon from "@/images/icon-linkedin.svg";
import FaceBookicon from "@/images/icon-facebook.svg";
import FrontEndManagericon from "@/images/icon-frontend-mentor.svg";
import FreeCodeCampicon from "@/images/icon-freecodecamp.svg";
import IconDown from "@/images/icon-chevron-down.svg";

const platformIcons:any = {
  GitHub: GitHubicon,
  YouTube: YouTubeicon,
  LinkedIn: LinkedInicon,
  Facebook: FaceBookicon,
  "Frontend Mentor": FrontEndManagericon,
  FreeCodeCamp: FreeCodeCampicon,
};

function AddLinks({ setLinkCount, setNewLinkData }:any) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(""); // Track selected platform
  const [url, setUrl] = useState(""); // Track URL input
  const platforms = [
    "GitHub",
    "YouTube",
    "LinkedIn",
    "Facebook",
    "FreeCodeCamp",
    "Frontend Mentor",
  ];

  // Function to handle platform selection
  const handlePlatformSelect = (selectedPlatform:any) => {
    setTitle(selectedPlatform);
    setNewLinkData({ title: selectedPlatform, url });
    setActive(false);
  };

  const handleUrlChange = (e:any) => {
    setUrl(e.target.value);
    setNewLinkData({ title, url: e.target.value });
  };

  const handleRemove = () => {
    setLinkCount((prevCount:number) => prevCount - 1);
  };

  return (
    <div className=" w-[80%] mx-auto h-full overflow-y-auto p-4 rounded-md shadow-md">
      <div className="flex w-full justify-between items-center mb-4">
        <div className="text-md font-semibold text-gray-600">
          Add a New Link
        </div>
        <button
          disabled={loading}
          onClick={handleRemove}
          className="text-md font-semibold text-red-600"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Remove"}
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
