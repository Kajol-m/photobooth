"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LayoutCard from "@/common/layouts/LayoutCard";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { layouts } from "@/lib/layouts/photobooth-layout";
import { useCameraStore } from "@/store/useCameraStore";

const SelectLayout = () => {
  const router = useRouter();
  const setLayout = usePhotoboothStore((state) => state.setLayout);
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null);

  const handleLayoutSelect = (layoutId: string) => {
    setSelectedLayoutId(layoutId);
    const selectedLayout = layouts.find((l) => l.id === layoutId);
    if (!selectedLayout) return;

    console.log(selectedLayout);
    setLayout(selectedLayout);
    router.push("/select-filters");
  };

  useEffect(() => {
    // Stop any active camera stream globally
    useCameraStore.getState().stopStream();
    console.log(useCameraStore);
  }, []);

  // Split layouts visually
  const row1Layouts = layouts.slice(0, 3);
  const row2Layouts = layouts.slice(3);

  return (
    <div className="relative bg-[#FFDBE9] px-8 pt-6 pb-[100px] min-h-screen">
      {/* Header */}
      <header className="flex flex-col justify-center items-center text-center h-32">
        <p className="text-3xl tracking-wide font-semibold">Choose Layout</p>
        <p className="text-sm text-gray-600">
          The layouts are visual representations and not the actual size.
        </p>
      </header>

      {/* Layout Rows */}
      {[row1Layouts, row2Layouts].map((row, idx) => (
        <div key={idx} className="flex justify-center gap-8 mb-8 flex-wrap">
          {row.map((layout) => (
            <LayoutCard
              key={layout.id}
              {...layout}
              selected={selectedLayoutId === layout.id}
              onSelect={() => handleLayoutSelect(layout.id)}
            />
          ))}
        </div>
      ))}

      {/* Footer */}
      <footer className="absolute bottom-0 right-0 p-4 text-xs text-gray-700">
        Visual representations of the layouts are designed in Canva. None of the
        images are owned by Maynora Photobooth.
      </footer>
    </div>
  );
};

export default SelectLayout;
