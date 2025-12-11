"use client";
import BackgroundPicker from "@/common/Background/Background";
import Sticker from "@/common/Sticker/Sticker";
import TextAndDatePicker from "@/common/TextAndDate/TextAndDate";
import PhotoFrame from "@/lib/layouts/PhotoFrame"; // 👈 Use the generic frame

export default function DecoratePage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen  bg-[#F5F5DA]">
      {/* Left: The Canvas Area */}
      <div className="w-full lg:w-3/5 flex justify-center items-center p-4 overflow-auto scale-1.5">
        <PhotoFrame />
      </div>

      {/* Right: The Tools */}
      <div className="w-full lg:w-2/5 flex flex-col gap-4  p-4 overflow-y-auto">
        <Sticker />
        <BackgroundPicker />
        <TextAndDatePicker />
      </div>
    </div>
  );
}