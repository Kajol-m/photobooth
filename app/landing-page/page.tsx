"use client";
import Button from "@/common/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import photoboothlg from "@/public/assets/photobooth-lg.json";
import photoboothmd from "@/public/assets/photobooth-md.json";
import photoboothsm from "@/public/assets/photobooth-sm.json";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/select-layout"); // Navigate to SelectLayout page
  };
  return (
    <>
      <div className="hidden lg:flex lg:flex-row items-center justify-center h-screen w-screen bg-[#F5F5DA]">
        <div className="  relative flex justify-center items-center">
          <Lottie
            animationData={photoboothlg}
            loop={true}
            className="h-screen w-auto"
          />
          <div className="absolute bottom-[40%] right-[5%]">
            <Button
              variant="secondary"
              onClick={handleEnter}
              className="mx-8 border-3"
            >
              ENTER{" "}
              <span className="pl-3">
                <ArrowRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center lg:hidden h-screen w-screen bg-[#F5F5DA]">
        <div className="  relative flex justify-center items-center">
          <Lottie
            animationData={photoboothmd}
            loop={true}
            className="h-screen w-auto"
          />
          <div className="absolute bottom-[40%] right-[8%]">
            <Button
              variant="secondary"
              onClick={handleEnter}
              className="border-3"
            >
              ENTER{" "}
              <span className="pl-3">
                <ArrowRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden items-center justify-center h-screen w-screen bg-[#F5F5DA]">
        <div className="relative flex justify-center items-center">
          <Lottie
            animationData={photoboothsm}
            loop={true}
            className="h-screen w-auto"
          />
          <div className="absolute bottom-[40%] right-[10%]">
            <Button
              variant="secondary"
              onClick={handleEnter}
              className="text-sm"
            >
              ENTER{" "}
              <span className="pl-3">
                <ArrowRight className="text-sm" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
