"use client";
import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { forgotpasswordSchema } from "@/Schemas/forgotpassword";
import { ApiResponse } from "@/Types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const session = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log("resetPassword se", session?.user.username);
  // console.log(session);
  const form = useForm<z.infer<typeof forgotpasswordSchema>>({
    resolver: zodResolver(forgotpasswordSchema),
    defaultValues: {
      identifier: "",
      newpassword: "",
      confirmPassword: "",
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotpasswordSchema>) => {
    // Check if all required fields are present
    if (!data.identifier || !data.newpassword || !data.confirmPassword) {
      toast.error("Please enter all data", {
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
      return; // Stop further execution if validation fails
    }
  
    setIsSubmitting(true);
    data.username = await session?.data?.user.username;
  
    try {
      const result = await axios.post<ApiResponse>("/api/resetPassword", data);
      if (result.data.success) {
        toast.success("Please enter OTP to reset password", {
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
        const email = data.identifier;
        router.replace(`/verifyResetPassword/${email}`);
      } else {
        console.log("result", result);
        // console.log(result.data.message);
        toast.error(result.data.message, {
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
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("An error occurred while resetting the password", {
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
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
        <div className="flex flex-col items-center justify-center w-8/12 max-w-md bg-white  rounded-lg mt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5 text-black opacity-90 mt-4">
              Reset Password
            </h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        className="bg-gray-200 border-black "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="bg-purple-800 text-white hover:bg-purple-600"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                    Loading
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Page;
