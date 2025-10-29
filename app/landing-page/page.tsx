"use client";
import Button from "@/common/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Landing = () => {
    const router = useRouter();

  const handleEnter = () => {
    router.push("/select-layout"); // Navigate to SelectLayout page
  };
  return (
    <div className="bg-[#f5aebb] h-screen grid grid-rows-[auto_1fr] pt-8 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between text-[50px] font-extrabold px-8 mx-8 pb-4">
        <h2>FOTOMATÓN</h2>
        <h2>PHOTOBOOTH</h2>
        <h2>フォトブース</h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 h-full">
        {/* === Left Column === */}
        <div className="col-span-3 grid grid-rows-3">
          <div className="row-span-2 flex justify-center items-center">
            <Image
              src="/assets/photobooth-poster.png"
              alt="Photobooth poster"
              width={300}
              height={400}
              className="object-contain max-h-[70vh]"
            />
          </div>
          <div className="row-span-1 flex justify-center items-center">
            <Image
              src="/assets/photobooth-photo-example.png"
              alt="Photobooth photo examples"
              width={300}
              height={200}
              className="object-contain max-h-[20vh]"
            />
          </div>
        </div>

        {/* === Center Column === */}
        
        <div className="col-span-7 relative">
          <Image
            src="/assets/photobooth-background.png"
            alt="Photobooth background"
            fill
            priority
            className="object-conver"
          />
        
        <div className="absolute  inset-0 flex items-center justify-center pb-[100px]">
        <Button variant="enter" onClick={handleEnter} className="z-50 transition delay-150 duration-300 ease-in-out">ENTER</Button>
        </div>
        </div>
        {/* <div className="col-span-7 relative">
          
          <Image
            src="/assets/photobooth-background.png"
            alt="Photobooth background"
            fill
            priority
            className="object-cover"
          />

         
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="enter"
              onClick={() => console.log("Entering Photobooth...")}
              className="z-50"
            >
              ENTER
            </Button>
          </div>
        </div> */}


        {/* === Right Column === */}
        <div className="col-span-2 grid grid-rows-4 gap-4 items-center justify-center pl-4">
          <div className="row-span-3 flex justify-center items-center">
            <Image
              src="/assets/photobooth-rules.png"
              alt="Photobooth rules"
              width={200}
              height={400}
              className="object-contain max-h-[60vh]"
            />
          </div>
          <button className="row-span-1 flex justify-center items-center ">
            <Image
              src="/assets/photobooth-share.png"
              alt="Photobooth Share"
              width={180}
              height={100}
              className="object-contain max-h-[15vh] transition delay-150 duration-300 ease-in-out hover:scale-115 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
