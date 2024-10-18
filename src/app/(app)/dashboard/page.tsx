"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GitHubicon from "@/images/icon-github.svg";
import YouTubeicon from "@/images/icon-youtube.svg";
import LinkedInicon from "@/images/icon-linkedin.svg";
import FaceBookicon from "@/images/icon-facebook.svg";
import FrontEndManagericon from "@/images/icon-frontend-mentor.svg";
import FreeCodeCampicon from "@/images/icon-freecodecamp.svg";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Links{
  _id:string;
  title:string;
  url:string;
}

interface Icons{
  [key:string]:string;
}
function Page() {
  const [links, setLinks] = useState<Links[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getBgColor = (title: string) => {
    switch (title) {
      case "YouTube":
        return "bg-red-600";
      case "GitHub":
        return "bg-black";
      case "LinkedIn":
        return "bg-blue-600";
      case "Facebook":
        return "bg-purple-600";
      case "FreeCodeCamp":
        return "bg-green-600";
      default:
        return "bg-green-400";
    }
  };

  const platformIcons: Icons = {
    GitHub: GitHubicon,
    YouTube: YouTubeicon,
    LinkedIn: LinkedInicon,
    Facebook: FaceBookicon,
    "Frontend Mentor": FrontEndManagericon,
    FreeCodeCamp: FreeCodeCampicon,
  };

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/getlinks");
        setLinks(response.data.data);
        console.log("link", response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching links:", error);
        setLoading(false);
      }
    };
    fetchLinks();
  }, [links.length]);

  const handleRemove = async (linkId:string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/deleteLink/${linkId}`);
      if (response.data.success) {
        setLinks((prevLinks:Links[]) => prevLinks.filter((link:Links) => link._id !== linkId));
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
    } catch (error : unknown) {
      toast.error(`Error deleting link + ${error}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-[80%] mx-auto h-full overflow-y-auto p-4 rounded-md shadow-md">
          <div className="flex w-full justify-end items-center mb-4">
            <Link href="/">
              <div className="text-md border-2 border-solid bg-purple-600 hover:bg-purple-800 w-36 p-3 items-center justify-center flex rounded-lg font-semibold text-white h-12 ">
                Add New Link
              </div>
            </Link>
          </div>
          <div className="text-2xl font-druk font-semibold flex justify-center text-gray-600 mx-auto">
            Your Links
          </div>
          <div className="flex w-full justify-between items-center mb-4">
            {loading ? (
              <div className="w-10/12 md:min-h-[360px] md:max-h-[360px] overflow-y-auto shadow-sm items-center flex justify-center flex-col rounded-xl mx-auto">
                <Loader2 className="animate-spin h-10 w-10 text-purple-900" />
                <div className="text-lg leading-4 text-gray-500 font-druk font-semibold">
                  Loading your links...
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-8/12 mt-4 mx-auto">
                {links.map((link: Links, idx: number) => (
                  <div
                    key={idx}
                    className={`w-full flex items-center justify-between p-4 mb-4 ${getBgColor(
                      link.title
                    )} shadow-md rounded-md`}
                  >
                    <div className="flex items-center">
                      <div>
                        {platformIcons[link.title] && (
                          <Image
                            src={platformIcons[link.title]}
                            alt={`${link.title} icon`}
                            className="w-6 h-6"
                          />
                        )}
                      </div>
                      <div className="ml-4 text-md font-semibold text-white">
                        {link.title}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white underline"
                      >
                        Visit
                      </a>
                      <button onClick={() => handleRemove(link?._id)} className="ml-4 text-red-500">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>
          {
              links.length === 0 && !loading && (
                <div className="text-gray-500 font-druk leading-6 mx-auto font-semibold text-lg flex  w-8/12 items-center justify-center">
                  No links found. Add a new link to get started.
                </div>
              )
            }
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Page;
