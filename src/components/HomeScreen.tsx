"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import phone from "@/images/illustration-phone-mockup.svg";
import AddLinks from "./AddLinks";
import NoLinkView from "./NoLinkView";
import axios from "axios";
import { Link, Loader2 } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayLinkCard from "./DisplayLinkCard";
import iconRight from "@/images/icon-arrow-right.svg";
import GitHubicon from "@/images/icon-github.svg";
import YouTubeicon from "@/images/icon-youtube.svg";
import LinkedInicon from "@/images/icon-linkedin.svg";
import FaceBookicon from "@/images/icon-facebook.svg";
import FrontEndManagericon from "@/images/icon-frontend-mentor.svg";
import FreeCodeCampicon from "@/images/icon-freecodecamp.svg";
function HomeScreen() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [links, setLinks] = useState<any>([]);
  const [newLinkData, setNewLinkData] = useState({
    title: "GitHub",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [linkCount, setLinkCount] = useState(0);
  const platformIcons:any = {
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

  const addNewLink = () => {
    setLinkCount((prevCount) => prevCount + 1);
    setActive(true);
  };

 
  const validateURL = (title:any, url:any) => {
    const platformPatterns:any = {
      GitHub: /^https:\/\/(www\.)?github\.com\/[A-z0-9_-]+\/?$/,
      YouTube: /^https:\/\/(www\.)?youtube\.com\/[A-z0-9_-]+\/?$/,
      LinkedIn: /^https:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/,
      Facebook: /^https:\/\/(www\.)?facebook\.com\/[A-z0-9_-]+\/?$/,
      "Frontend Mentor":
        /^https:\/\/(www\.)?frontendmentor\.io\/profile\/[A-z0-9_-]+\/?$/,
      FreeCodeCamp: /^https:\/\/(www\.)?freecodecamp\.org\/[A-z0-9_-]+\/?$/,
    };

    const pattern:any = platformPatterns[title];
    return pattern ? pattern.test(url) : false;
  };

  const handleSave = async () => {
    setSubmitLoading(true);

    // Validate the URL before proceeding
    if (!validateURL(newLinkData.title, newLinkData.url)) {
      toast.error(`Invalid URL for ${newLinkData.title}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        transition: Bounce,
      });
      setSubmitLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/createlink",
        newLinkData
      );
      const result = response.data;
      if (result.success) {
        setLinks([...links, result.data.data]);
        toast.success("Link saved successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          transition: Bounce,
        });
        setNewLinkData({ title: "GitHub", url: "" });
        setLinkCount((prev) => prev - 1);
      } else {
        toast.error(result.message, { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Error saving link", { position: "bottom-right" });
    }
    setSubmitLoading(false);
  };

  const getBgColor = (title:string) => {
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

  return (
    <div className="flex w-full mx-auto h-full justify-evenly">
      <div className="max-lg:hidden lg:mt-16 w-5/12 h-[550px] items-center flex justify-center relative">
        {/* Phone Image as the container */}
        <Image alt="phone" src={phone} className="absolute h-full" />

        {/* Links Container */}
        <div className="relative flex flex-col overflow-y-auto min-h-[280px] max-h-[280px] items-center gap-4 mt-[200px] bg-red-00">
          {links.map((link:any, index:number) => (
            <div
              key={index}
             
              className={`w-[210px] ${getBgColor(
                link.title
              )} h-11 flex items-center justify-between rounded-lg p-2`}
            >
              <div className="w-5/12 flex items-center justify-between">
                <div>
                  {platformIcons[link.title] && (
                    <Image
                      src={platformIcons[link.title]}
                      alt={`${link.title} icon`}
                      className="w-6 h-6"
                    />
                  )}
                </div>
                <a
                  href={link.url}
                  className="text-sm font-druk font-semibold text-black-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-sm font-druk text-white">
                    {link.title}
                  </div>
                </a>
              </div>
              <div className="w-4">
                <Image alt="rightIcon" src={iconRight} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:mt-4 w-7/12 max-lg:w-11/12 h-full justify-evenly gap-6">
        <div className="w-10/12 flex flex-col gap-2 h-full mx-auto mt-4">
          <div className="text-2xl font-bold font-druk text-gray-800 opacity-90">
            Customize your links
          </div>
          <div className="text-md text-gray-500 font-druk">
            Add/edit/remove links below and then share all your profiles!
          </div>
        </div>

        <div className="w-10/12 mx-auto">
          <Button
            onClick={addNewLink}
            className="text-purple-800 hover:shadow-[0_30px_30px_-1px_rgb(0,0,0,0.1),8px_12px_10px_-2px_rgb(0,0,0,0.1)] w-full bg-white font-bold border-2 border-purple-600 rounded-lg hover:bg-purple-100"
          >
            + Add new link
          </Button>
        </div>

        {loading ? (
          <div className="w-10/12 md:min-h-[360px] md:max-h-[360px] overflow-y-auto shadow-sm items-center flex justify-center flex-col rounded-xl mx-auto">
            <Loader2 className="animate-spin h-10 w-10 text-purple-900" />
          </div>
        ) : (
          <div className="w-10/12 md:min-h-[360px] md:max-h-[360px] overflow-y-auto  items-center flex justify-center flex-col rounded-xl mx-auto">
            {active === false && links.length === 0 ? (
              <div className="flex flex-col gap-4">
                <NoLinkView />
              </div>
            ) : (
              ""
            )}

            <div className="relative flex flex-col justify-evenly h-full overflow-y-auto w-full ">
              {active === true && (
                <div className="mt-4">
                  {[...Array(linkCount)].map((_, index) => (
                    <div key={index} className="mb-4">
                      <AddLinks
                        setLinkCount={setLinkCount}
                        setNewLinkData={setNewLinkData}
                      />
                    </div>
                  ))}
                </div>
              )}
              {links.length > 0 && (
                <div className="">
                  {links.map((link:any, index:number) => (
                    <div key={link?._id} className="h-full w-full  p-2">
                      <DisplayLinkCard
                        linkId={link?._id}
                        idx={index + 1}
                        title={link?.title}
                        url={link?.url}
                        setLinks={setLinks}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="w-11/12 mx-auto h-[2px] bg-gray-400"></div>

        <div className="w-11/12 flex justify-center items-center max-md:mx-auto md:justify-end">
          <Button
            onClick={handleSave}
            className={`bg-purple-600 hover:bg-purple-800 w-full md:w-32 text-white font-semibold border-2 border-purple-600 rounded-lg mb-4 ${
              links.length > 0 ? "" : "opacity-70"
            }`}
          >
            {submitLoading ? (
              <div className="flex gap-2">
                <Loader2 className="animate-spin h-5 w-5 text-purple-400" />
                <div>Saving...</div>
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HomeScreen;
