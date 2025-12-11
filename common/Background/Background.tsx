// "use client";
// import { useState } from "react";

// const presetColors = ["#FFFFFF", "#F8D7DA", "#D1E7DD", "#CCE5FF", "#FFF3CD"];

// const backgroundImages = [
//   "/assets/backgrounds/shells.jpg",
//   "/assets/backgrounds/shells.jpg",
//   "/assets/backgrounds/shells.jpg",
//   "/assets/backgrounds/shells.jpg",
// ];

// const BackgroundPicker = () => {
//   const [selectedBackground, setSelectedBackground] = useState("#FFFFFF"); // default white
//   const [customColor, setCustomColor] = useState("#FFFFFF");

//   const handleColorChange = (e) => {
//     const color = e.target.value;
//     setCustomColor(color);
//     setSelectedBackground(color);
//   };

//   return (
//     <div className="p-6 flex flex-col gap-6 items-start bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
//       {/* Title */}
//       <h2 className="text-2xl font-semibold text-gray-800">
//         Background Picker
//       </h2>

//       {/* Preset Colors */}
//       <div className="flex flex-wrap gap-3">
//         {presetColors.map((color) => (
//           <button
//             key={color}
//             onClick={() => setSelectedBackground(color)}
//             className={`w-10 h-10 rounded-lg border transition-all duration-150 ${
//               selectedBackground === color
//                 ? "ring-2 ring-blue-500 scale-105"
//                 : "hover:scale-105"
//             }`}
//             style={{ backgroundColor: color }}
//           />
//         ))}
//       </div>

//       {/* Custom Color Picker */}
//       <div className="flex items-center gap-3">
//         <input
//           type="color"
//           value={customColor}
//           onChange={handleColorChange}
//           className="w-10 h-10 p-0 border rounded cursor-pointer"
//         />
//       </div>

//       {/* Background Images */}
//       <div>
//         <p className="text-sm text-gray-600 mb-2">Background Images:</p>
//         <div className="flex flex-wrap gap-3">
//           {backgroundImages.map((img) => (
//             <div
//               key={img}
//               onClick={() => setSelectedBackground(img)}
//               className={`w-16 h-16 rounded-lg border overflow-hidden cursor-pointer ${
//                 selectedBackground === img
//                   ? "ring-2 ring-blue-500 scale-105"
//                   : "hover:scale-105"
//               }`}
//             >
//               <img
//                 src={img}
//                 alt="background"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Preview Box */}
//       <div
//         className="w-full h-40 mt-4 rounded-xl border"
//         style={{
//           background:
//             selectedBackground.startsWith("/")
//               ? `url(${selectedBackground}) center/cover no-repeat`
//               : selectedBackground,
//         }}
//       ></div>
//     </div>
//   );
// };

// export default BackgroundPicker;
"use client";
import { useState } from "react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";

const presetColors = ["#CA152A","#F8D7DA", "#D1E7DD", "#CCE5FF", "#FFF3CD"];

const backgroundImages = [
  "/assets/backgrounds/shells.jpg",
  "/assets/backgrounds/babyheart.jpg",
  "/assets/backgrounds/halloween.jpg",
  "/assets/backgrounds/valentine.jpg",
];

const BackgroundPicker = () => {
  const { photoTraits, setPhotoTraits } = usePhotoboothStore();
  const [customColor, setCustomColor] = useState(photoTraits.backgroundColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    setPhotoTraits({ backgroundColor: color }); // ✅ color
  };

  const handlePresetSelect = (color: string) => {
    setPhotoTraits({ backgroundColor: color }); // ✅ color
  };

  const handleImageSelect = (img: string) => {
    setPhotoTraits({ backgroundColor: img }); // ✅ image URL
  };

  return (
    <div className="p-4 flex flex-col gap-3 items-start bg-[#F5F5DA] w-full border-3 border-[#CA152A]">
      <h2 className="text-xl font-semibold text-[#CA152A]">
        BACKGROUND
      </h2>

      {/* Preset Colors */}
      <div className="flex flex-wrap gap-3">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => handlePresetSelect(color)}
            className={`w-10 h-10 border transition-all duration-150 ${
              photoTraits.backgroundColor === color
                ? "ring-2 ring-[#CA152A] scale-105"
                : "hover:scale-105"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        <div
          className="relative w-10 h-10 border overflow-hidden cursor-pointer hover:scale-105"
          style={{
            backgroundImage: "url('/assets/colorpicker.png')",
            backgroundPosition: "center",
          }}
        >
          <input
            type="color"
            value={customColor}
            onChange={handleColorChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Background Images */}
      <div>
        <p className="text-sm text-[#CA152A] mb-2">Background Images:</p>
        <div className="flex flex-wrap gap-3">
          {backgroundImages.map((img) => (
            <div
              key={img}
              onClick={() => handleImageSelect(img)}
              className={`w-10 h-10 border overflow-hidden cursor-pointer transition-all duration-150 ${
                photoTraits.backgroundColor === img
                  ? "ring-2 ring-[#CA152A] scale-105"
                  : "hover:scale-105"
              }`}
            >
              <img
                src={img}
                alt="background"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundPicker;
