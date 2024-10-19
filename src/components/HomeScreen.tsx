"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import phone from "@/images/illustration-phone-mockup.svg";
import AddLinks from "./AddLinks";
import NoLinkView from "./NoLinkView";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayLinkCard from "./DisplayLinkCard";
import iconRight from "@/images/icon-arrow-right.svg";
import GitHubicon from "@/images/icon-githhub-white.svg";
import YouTubeicon from "@/images/icon-youtube-white.svg";
import LinkedInicon from "@/images/icon-linkedin-white.svg";
import FaceBookicon from "@/images/icon-facebook-white.svg";
import FrontEndManagericon from "@/images/icon-frontend-mentor.svg";
import FreeCodeCampicon from "@/images/icon-freecodecamp.svg";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";
import "./DragAndDrop.css";
import { gsap } from "gsap";

interface Links {
  title: string;
  url: string;
}

interface Icons {
  [key: string]: string;
}
interface Ragexmatch {
  [key: string]: RegExp;
}
interface DBLinks {
  _id: string;
  title: string;
  url: string;
}
function HomeScreen() {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [links, setLinks] = useState<DBLinks[]>([]);
  const [newLinkData, setNewLinkData] = useState<Links>({
    title: "GitHub",
    url: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [linkCount, setLinkCount] = useState<number>(0);
  const platformIcons: Icons = {
    GitHub: GitHubicon,
    YouTube: YouTubeicon,
    LinkedIn: LinkedInicon,
    Facebook: FaceBookicon,
    "Frontend Mentor": FrontEndManagericon,
    FreeCodeCamp: FreeCodeCampicon,
  };

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/getlinks");
      setLinks(response.data.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks(); 
  }, []); 

  const addNewLink = () => {
    setLinkCount((prevCount) => prevCount + 1);
    setActive(true);
  };

  const validateURL = (title: string, url: string) => {
    const platformPatterns: Ragexmatch = {
      GitHub: /^https:\/\/(www\.)?github\.com\/[A-z0-9_-]+\/?$/,
      YouTube: /^https:\/\/(www\.)?youtube\.com\/[A-z0-9_-]+\/?$/,
      LinkedIn: /^https:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/,
      Facebook: /^https:\/\/(www\.)?facebook\.com\/[A-z0-9_-]+\/?$/,
      "Frontend Mentor":
        /^https:\/\/(www\.)?frontendmentor\.io\/profile\/[A-z0-9_-]+\/?$/,
      FreeCodeCamp: /^https:\/\/(www\.)?freecodecamp\.org\/[A-z0-9_-]+\/?$/,
    };

    const pattern: RegExp = platformPatterns[title];
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
        "/api/createlink",
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
        fetchLinks();
      } else {
        toast.error(result.message, { position: "bottom-right" });
      }
    } catch (error: unknown) {
      toast.error(`${error as string}`, { position: "bottom-right" });
    }
    setSubmitLoading(false);
  };

  const getBgColor = (title: string) => {
    switch (title) {
      case "YouTube":
        return "bg-customRed";
      case "GitHub":
        return "bg-customLightBlack";
      case "LinkedIn":
        return "bg-customBlue";
      case "Facebook":
        return "bg-customBlue";
      case "FreeCodeCamp":
        return "bg-green-600";
      default:
        return "bg-green-400";
    }
  };
  const draggingItem = useRef(null);
  const dragOverItem = useRef(null);

  const onDragStart = (index:any) => {
    draggingItem.current = index;
  };

  const onDragEnter = (index:any) => {
    dragOverItem.current = index;
  };

  const onDragEnd = () => {
    const updatedLinks = [...links];
    //@ts-ignore
    const draggedItemContent = updatedLinks[draggingItem.current];

    //@ts-ignore
    updatedLinks.splice(draggingItem.current, 1);
   
    //@ts-ignore
    updatedLinks.splice(dragOverItem.current, 0, draggedItemContent);

    setLinks(updatedLinks);
    draggingItem.current = null; 
    dragOverItem.current = null; 
  };
//@ts-ignore
  const handleDrag = (event) => {
    const target = event.target;

    if (target) {
      gsap.to(target, {
        scale: 1.05,
        duration: 0.1,
        onComplete: () => {
          gsap.to(target, { scale: 1, duration: 0.1 });
        },
      });
    }
  };
  return (
    <div className="flex w-full mx-auto h-full justify-evenly">
      <div className="max-lg:hidden lg:mt-16 w-5/12 h-[550px] items-center flex justify-center relative">
        {/* Phone Image as the container */}
        <Image alt="phone" src={phone} className="absolute h-full" />

        {/* Links Container */}
        <div className="relative flex flex-col overflow-y-auto min-h-[280px] max-h-[280px] items-center gap-4 mt-[200px] bg-red-00">
          {links.map((link: Links, index: number) => (
            <div
              key={index}
              className={`w-[210px] ${getBgColor(
                link?.title
              )} h-11 flex items-center justify-between rounded-lg p-2 cursor-pointer`}
            >
              <div className="w-5/12 flex items-center justify-between">
                <div>
                  {platformIcons[link?.title] && (
                    <Image
                      src={platformIcons[link?.title]}
                      alt={`${link?.title} icon `}
                      className="w-6 h-6 text-white"
                    />
                  )}
                </div>
                <a
                  href={link?.url}
                  className="text-sm font-druk font-semibold text-black-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-sm ml-2 font-druk text-white">
                    {link?.title}
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
          <div className="text-2xl font-bold font-druk text-customBlack ">
            Customize your links
          </div>
          <div className="text-md text-customGray font-druk">
            Add/edit/remove links below and then share all your profiles!
          </div>
        </div>

        <div className="w-10/12 mx-auto">
          <Button
            onClick={addNewLink}
            className="text-customPurple  hover:shadow-xl md:hover:shadow-[0_30px_30px_-1px_rgb(0,0,0,0.1),8px_12px_10px_-2px_rgb(0,0,0,0.1)] w-full bg-white font-bold border-2 border-customPurple rounded-lg hover:bg-purple-100"
          >
            + Add new link
          </Button>
        </div>

        {loading ? (
          <div className="w-10/12 min-h-[360px] max-h-[360px] overflow-x-hidden overflow-y-auto shadow-sm items-center flex justify-center flex-col rounded-xl mx-auto">
            <Loader2 className="animate-spin h-10 w-10 text-customPurple" />
            <div className="text-lg leading-4 text-customGray font-druk font-semibold">
              Loading your links...
            </div>
          </div>
        ) : (
          <div className="w-10/12 min-h-[360px] max-h-[360px] overflow-x-hidden overflow-y-auto  items-center flex justify-center flex-col rounded-xl mx-auto">
            {active === false && links.length === 0 ? (
              <div className="flex flex-col gap-4">
                <NoLinkView />
              </div>
            ) : (
              ""
            )}

            <div className="relative flex flex-col justify-evenly h-full max-sm:h-[370px] overflow-y-auto w-full ">
              {active === true && (
                <div className="mt-4 ">
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
              
              
              { links.length > 0 && <div className="w-full overflow-x-hidden border-2 rounded-xl  mx-auto link-list">
                { 
                links.map((link, index) => (
                  <div
                    key={link?._id}
                    draggable
                    onDragStart={() => onDragStart(index)}
                    onDragEnter={() => onDragEnter(index)}
                    onDragEnd={onDragEnd}
                    onDragOver={(event) => event.preventDefault()} 
                    onMouseEnter={handleDrag} 
                    className="draggable-item "
                  >
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
}
            </div>
          </div>
        )}

        <div className="w-11/12 mx-auto h-[2px] bg-gray-200"></div>

        <div className="w-11/12 flex justify-center items-center max-md:mx-auto md:justify-end">
          <Button
            onClick={handleSave}
            className={`bg-customPurple hover:bg-blue-600 w-full md:w-32 text-white font-semibold border-2 border-customPurple rounded-lg mb-4 ${
              links.length > 0 ? "" : "opacity-70"
            }`}
          >
            {submitLoading ? (
              <div className="flex gap-2">
                <Loader2 className="animate-spin h-5 w-5 text-customPurple opacity-90" />
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
