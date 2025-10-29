"use client";
import BackgroundPicker from "@/common/Background/Background";
import Sticker from "@/common/Sticker/Sticker";
import TextAndDatePicker from "@/common/TextAndDate/TextAndDate";
import Layout11 from "@/lib/layouts/Layout11";

const timeOption = () => {};
export default function DecoratePage() {
  return (
    <div className="flex flex-row bg-[#ede3ec]">
      <div className="w-3/5 flex justify-center items-center">
        <Layout11 />
      </div>
      <div className="w-2/5 flex flex-col gap-2">
        <Sticker />
        <BackgroundPicker />
        <TextAndDatePicker/>
      </div>
    </div>
  );
}
