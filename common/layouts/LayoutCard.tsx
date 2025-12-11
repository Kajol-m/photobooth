// "use client";

// import { cn } from "@/lib/utils";

// type LayoutCardProps = {
//   id: string;
//   imgSrc: string;
//   sizeLabel: string;
//   posesLabel: string;
//   selected: boolean;
//   onSelect: (id: string) => void;
//   height?: string; // optional, like "200px"
// };

// const LayoutCard = ({
//   id,
//   imgSrc,
//   sizeLabel,
//   posesLabel,
//   selected,
//   onSelect,
//   height = "205px",
// }: LayoutCardProps) => {
//   return (
//     <div
//       onClick={() => onSelect(id)}
//       className={cn(
//         "relative inline-block group overflow-hidden cursor-pointer transition-all duration-300 hover:scale-102 border-4 rounded-md",
//         selected ? "border-pink-500" : "border-transparent"
//       )}
//       style={{ height }} // ✅ apply height inline (NOT in Tailwind class)
//     >
//       <img
//         src={imgSrc}
//         alt={id}
//         className={cn(
//           "transition-transform duration-300 w-auto h-full object-contain"
//         )}
//       />

//       <div
//         className={cn(
//           "absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         )}
//       >
//         <p className="text-sm">{sizeLabel}</p>
//         <p className="text-xs">{posesLabel}</p>
//       </div>
//     </div>
//   );
// };

// export default LayoutCard;
"use client";
import React from "react";
import { LayoutConfig } from "@/lib/layouts/layout";

interface LayoutCardProps {
  layout: LayoutConfig;
  isSelected: boolean;
  onSelect: () => void;
}

const LayoutCard = ({ layout, isSelected, onSelect }: LayoutCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`
        group relative flex flex-col items-center gap-3 cursor-pointer transition-all duration-300
        ${isSelected ? "scale-105" : "hover:scale-105"}
      `}
    >
      {/* --- MINI PREVIEW FRAME --- */}
      <div
        className={`
           relative w-[140px] h-[190px] bg-white shadow-lg p-3 flex flex-col gap-2
           border-4 rounded-xl transition-colors
           ${isSelected ? "border-blue-500 ring-4 ring-blue-500/20" : "border-white hover:border-gray-200"}
        `}
      >
        
        {/* The Grid: We use the exact same gridClass from the config! */}
        <div className={`grid w-full flex-grow gap-1 ${layout.gridClass}`}>
          {Array.from({ length: layout.photoCount }).map((_, i) => (
            <div
              key={i}
              className={`
                bg-gray-200 border border-gray-300 rounded-sm
                ${layout.slotClass || ''} 
              `}
            >
              {/* Optional: Add a tiny icon or number inside to look cute */}
              <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-400">
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Mini Footer Simulation */}
        <div className="flex flex-col items-center gap-1 opacity-50">
           <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
           <div className="w-8 h-0.5 bg-gray-200 rounded-full"></div>
        </div>

        {/* Selected Checkmark Overlay */}
        {isSelected && (
          <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full p-1 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* --- LABEL --- */}
      <div className="text-center">
        <p className={`text-sm font-bold ${isSelected ? "text-blue-600" : "text-gray-700"}`}>
          {layout.label}
        </p>
        <p className="text-xs text-gray-500">
          {layout.photoCount} {layout.photoCount === 1 ? 'Photo' : 'Photos'}
        </p>
      </div>
    </div>
  );
};

export default LayoutCard;