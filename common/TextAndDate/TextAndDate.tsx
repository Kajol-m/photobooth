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

  const handleColorSelect = (color: "white" | "black") => {
    setPhotoTraits({ textColor: color });
  };

  return (
    <div className="p-6 flex flex-col gap-6 items-start bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Text & Date Options</h2>

      {/* Text Input with Color Picker */}
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Custom Text:
          </label>
          <input
            type="text"
            placeholder="Type your text here..."
            value={photoTraits.textOption}
            onChange={handleTextChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
          />
        </div>

        {/* Text Color Options */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 mb-1">Text Color</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleColorSelect("black")}
              className={`w-6 h-6 rounded-full border ${
                photoTraits.textColor === "black"
                  ? "ring-2 ring-blue-500 scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: "black" }}
            />
            <button
              onClick={() => handleColorSelect("white")}
              className={`w-6 h-6 rounded-full border ${
                photoTraits.textColor === "white"
                  ? "ring-2 ring-blue-500 scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: "white" }}
            />
          </div>
        </div>
      </div>

      {/* Checkbox Options */}
      <div className="flex flex-row gap-8 w-full">
        <label className="flex items-center justify-between cursor-pointer gap-4">
          <span className="text-gray-700 font-medium">Add Date</span>
          <input
            type="checkbox"
            checked={photoTraits.dateOption}
            onChange={handleDateChange}
            className="w-5 h-5 accent-blue-500 cursor-pointer transition-all duration-150"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer gap-4">
          <span className="text-gray-700 font-medium">Add Time</span>
          <input
            type="checkbox"
            checked={photoTraits.timeOption}
            onChange={handleTimeChange}
            className="w-5 h-5 accent-blue-500 cursor-pointer transition-all duration-150"
          />
        </label>
      </div>
    </div>
  );
};

export default TextAndDatePicker;
