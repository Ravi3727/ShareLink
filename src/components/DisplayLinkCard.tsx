"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GitHubicon from "@/images/icon-github.svg";
import YouTubeicon from "@/images/icon-youtube.svg";
import LinkedInicon from "@/images/icon-linkedin.svg";
import FaceBookicon from "@/images/icon-facebook.svg";
import FrontEndManagericon from "@/images/icon-frontend-mentor.svg";
import FreeCodeCampicon from "@/images/icon-freecodecamp.svg";
import IconDown from "@/images/icon-chevron-down.svg";
interface Icons {
  [key: string]: string;
}
const platformIcons: Icons = {
  GitHub: GitHubicon,
  YouTube: YouTubeicon,
  LinkedIn: LinkedInicon,
  Facebook: FaceBookicon,
  "Frontend Mentor": FrontEndManagericon,
  FreeCodeCamp: FreeCodeCampicon,
};

interface Ragexmatch {
  [key: string]: RegExp;
}
interface DBLinks {
  _id: string;
  title: string;
  url: string;
}
interface complex {
  setLinks: React.Dispatch<React.SetStateAction<DBLinks[]>>;
  title: string;
  linkId: string;
  url: string;
  idx: number;
}
interface Links {
  _id: string;
  title: string;
  url: string;
}
// URL patterns based on platform
const urlPatterns: Ragexmatch = {
  GitHub: /^https?:\/\/(www\.)?github\.com\/.+$/,
  YouTube: /^https?:\/\/(www\.)?youtube\.com\/.+$/,
  LinkedIn: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
  Facebook: /^https?:\/\/(www\.)?facebook\.com\/.+$/,
  "Frontend Mentor": /^https?:\/\/(www\.)?frontendmentor\.io\/.+$/,
  FreeCodeCamp: /^https?:\/\/(www\.)?freecodecamp\.org\/.+$/,
};

function DisplayLinkCard({
  setLinks,
  title: initialPlatform,
  linkId,
  url: initialUrl,
  idx,
}: complex) {
  const [active, setActive] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setPlatform] = useState(initialPlatform);
  const [url, setUrl] = useState(initialUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(initialPlatform);
  const [editUrl, setEditUrl] = useState(initialUrl);
  const [urlError, setUrlError] = useState("");

  const platforms = [
    "GitHub",
    "YouTube",
    "LinkedIn",
    "Facebook",
    "FreeCodeCamp",
    "Frontend Mentor",
  ];

  // Function to validate the URL based on the platform
  const validateUrl = (platform: string, url: string) => {
    const pattern = urlPatterns[platform];
    return pattern ? pattern.test(url) : false;
  };

  const handleUpdate = async () => {
    setUpdateLoading(true);

    if (!validateUrl(editTitle, editUrl)) {
      setUrlError(`Invalid URL for ${editTitle}. Please provide a valid URL.`);
      setUpdateLoading(false);
      return;
    }

    setUrlError("");

    try {
      const response = await axios.put(`/api/editLink/${linkId}`, {
        title: editTitle,
        url: editUrl,
      });
      if (response.data.success) {
        setLinks((prevLinks: Links[]) =>
          prevLinks.map((link: Links) =>
            link._id === linkId
              ? { ...link, title: editTitle, url: editUrl }
              : link
          )
        );
        setPlatform(editTitle);
        setUrl(editUrl);
        toast.success("Link updated successfully", {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
        setIsEditing(false); // Exit editing mode after successful update
      } else {
        toast.error("Failed to update link", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    } catch (error: unknown) {
      toast.error(`Error updating link , ${error as string}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }

    setUpdateLoading(false);
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/deleteLink/${linkId}`);
      if (response.data.success) {
        setLinks((prevLinks: Links[]) =>
          prevLinks.filter((link: Links) => link._id !== linkId)
        );
        toast.success("Link removed successfully", {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } else {
        toast.error("Failed to remove link", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    } catch (error: unknown) {
      toast.error(`Error updating link , ${error as string}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white w-[80%] mx-auto h-full overflow-y-auto p-2 rounded-md">
      <div className="flex w-full justify-between items-center mb-4">
        <div className="text-md font-semibold text-gray-600">Link #{idx}</div>
        <div className="flex w-32 justify-between">
          <button
            disabled={loading}
            onClick={handleRemove}
            className="text-md font-semibold text-red-600"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Delete"}
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-md font-semibold text-gray-600"
          >
            {isEditing ? "Cancel" : "Update"}
          </button>
        </div>
      </div>

      <div className="text-sm font-semibold text-gray-600 mb-1">Platform</div>
      <div
        onClick={() => setActive(!active)}
        className={`cursor-pointer hover:shadow-[10px_30px_30px_-1px_rgb(0,0,0,0.1),8px_12px_10px_-2px_rgb(0,0,0,0.1)] flex justify-between items-center mb-2 border-2 p-1 rounded-lg ${
          isEditing ? "" : "pointer-events-none"
        }`}
      >
        <div className="flex items-center">
          <Image
            src={platformIcons[isEditing ? editTitle : title]}
            alt={`${isEditing ? editTitle : title} icon`}
            className="w-6 h-6 mr-2"
          />
          <span className="text-sm font-semibold text-gray-600">
            {isEditing ? editTitle : title}
          </span>
        </div>
        <Image src={IconDown} alt="dropdown icon" className="w-4 h-4" />
      </div>

      {isEditing && active && (
        <div className="mb-2">
          {platforms.map((platform) => (
            <div
              key={platform}
              onClick={() => {
                setEditTitle(platform);
                setActive(false);
              }}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {platform}
            </div>
          ))}
        </div>
      )}

      <div className="text-sm font-semibold text-gray-600 mb-1">URL</div>
      <input
        type="text"
        value={isEditing ? editUrl : url}
        onChange={(e) => setEditUrl(e.target.value)}
        className={`w-full cursor-pointer border-2 rounded-lg p-2 mb-4 text-sm hover:shadow-[0_20px_20px_-1px_rgb(0,0,0,0.1),8px_12px_10px_-2px_rgb(0,0,0,0.1)] ${
          isEditing ? "" : "pointer-events-none bg-gray-100"
        }`}
        placeholder="Enter your URL here"
      />

      {urlError && <p className="text-red-500 text-sm">{urlError}</p>}

      {isEditing && (
        <div className="flex space-x-2">
          <button
            disabled={updateloading}
            onClick={handleUpdate}
            className="w-24 flex items-center justify-center hover:bg-purple-800 bg-purple-600 text-white font-semibold p-2 rounded-lg mt-2"
          >
            {updateloading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default DisplayLinkCard;
