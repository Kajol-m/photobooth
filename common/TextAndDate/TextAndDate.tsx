"use client";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";

const TextAndDatePicker = () => {
  const { photoTraits, setPhotoTraits } = usePhotoboothStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoTraits({ textOption: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoTraits({ dateOption: e.target.checked });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoTraits({ timeOption: e.target.checked });
  };

  const handleColorSelect = (color: "white" | "black" |"#F5F5DA") => {
    setPhotoTraits({ textColor: color });
  };

  return (
    <div className="p-4 flex flex-col gap-3 items-start bg-[#F5F5DA] w-full border-3 border-[#CA152A]">
      <h2 className="text-xl font-semibold text-[#CA152A]">TEXT & DATE OPTIONS</h2>

      {/* Text Input with Color Picker */}
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#CA152A] mb-1">
            Enter Custom Text:
          </label>
          <input
            type="text"
            placeholder="Type your text here..."
            value={photoTraits.textOption}
            onChange={handleTextChange}
            className="w-full px-3 py-1 border border-[#CA152A] focus:outline-none text-[#CA152A] focus:ring-2 focus:ring-[#CA152A] transition-all duration-150"
          />
        </div>

        {/* Text Color Options */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-[#CA152A] mb-1">Text Color</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleColorSelect("black")}
              className={`w-6 h-6 rounded-full border ${
                photoTraits.textColor === "black"
                  ? "ring-2 ring-[#CA152A] scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: "black" }}
            />
            <button
              onClick={() => handleColorSelect("white")}
              className={`w-6 h-6 rounded-full border ${
                photoTraits.textColor === "white"
                  ? "ring-2 ring-[#CA152A] scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: "white" }}
            />
             <button
              onClick={() => handleColorSelect("#F5F5DA")}
              className={`w-6 h-6 rounded-full border${
                photoTraits.textColor === "#F5F5DA"
                  ? "ring-2 ring-[#CA152A] scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: "#F5F5DA" }}
            />
          </div>
        </div>
      </div>

      {/* Checkbox Options */}
      <div className="flex flex-row gap-8 w-full">
        <label className="flex items-center justify-between cursor-pointer gap-4">
          <span className="text-[#CA152A] text-sm font-medium">Add Date</span>
          <input
            type="checkbox"
            checked={photoTraits.dateOption}
            onChange={handleDateChange}
            className="w-5 h-5 accent-[#CA152A] cursor-pointer transition-all duration-150"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer gap-4">
          <span className="text-[#CA152A] text-sm font-medium">Add Time</span>
          <input
            type="checkbox"
            checked={photoTraits.timeOption}
            onChange={handleTimeChange}
            className="w-5 h-5 accent-[#CA152A] cursor-pointer transition-all duration-150"
          />
        </label>
      </div>
    </div>
  );
};

export default TextAndDatePicker;
