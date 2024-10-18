"use client";
import { verifySchema } from "@/Schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Page = () => {
  const router = useRouter();
  const params = useParams<{ email: string }>();
 

  const [value, setValue] = useState("");

  const onComplete = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/VerifyemailOtpresetpassword", {
        email: params.email,
        code: value,
      });
      console.log(data);
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      router.replace("/signin");
    } catch (error) {
      toast.error(`verification of otp token failed, ${error}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Reset password</h1>
          <p className="text-md text-black mt-4">
            Enter the code sent to your email
          </p>
        </div>

        <div className="ml-14 text-black font-semibold">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
            onComplete={onComplete}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
