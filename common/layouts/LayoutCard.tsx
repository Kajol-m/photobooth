"use client";

import { cn } from "@/lib/utils";

type LayoutCardProps = {
  id: string;
  imgSrc: string;
  sizeLabel: string;
  posesLabel: string;
  selected: boolean;
  onSelect: (id: string) => void;
  height?: string; // optional, like "200px"
};

const LayoutCard = ({
  id,
  imgSrc,
  sizeLabel,
  posesLabel,
  selected,
  onSelect,
  height = "205px",
}: LayoutCardProps) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className={cn(
        "relative inline-block group overflow-hidden cursor-pointer transition-all duration-300 hover:scale-102 border-4 rounded-md",
        selected ? "border-pink-500" : "border-transparent"
      )}
      style={{ height }} // ✅ apply height inline (NOT in Tailwind class)
    >
      <img
        src={imgSrc}
        alt={id}
        className={cn(
          "transition-transform duration-300 w-auto h-full object-contain"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}
      >
        <p className="text-sm">{sizeLabel}</p>
        <p className="text-xs">{posesLabel}</p>
      </div>
    </div>
  );
};

export default LayoutCard;
