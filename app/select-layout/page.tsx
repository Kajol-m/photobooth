"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { useCameraStore } from "@/store/useCameraStore";
import { LAYOUTS } from "@/lib/layouts/layout";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Flickity from "flickity";
import Footer from "@/common/Footer/Footer";
import Button from "@/common/button/Button";

const SelectLayout = () => {
  const router = useRouter();

  const setSelectedLayoutId = usePhotoboothStore(
    (state) => state.setSelectedLayoutId
  );
  const currentLayoutId = usePhotoboothStore((state) => state.selectedLayoutId);
  const { stopStream } = useCameraStore();

  const flickityRef = useRef<Flickity | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialIndex = Math.max(
    0,
    LAYOUTS.findIndex((l) => l.id === currentLayoutId)
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const initFlickity = async () => {
      const Flickity = (await import("flickity")).default;

      flickityRef.current = new Flickity(container, {
        initialIndex: initialIndex,
        accessibility: true,
        pageDots: false,
        prevNextButtons: false,
        draggable: true,
        wrapAround: true,
        cellAlign: "center",
        contain: true,
        friction: 0.28,
        selectedAttraction: 0.025,
      });

      flickityRef.current.on("change", (index: number) => {
        setActiveIndex(index);
        const layout = LAYOUTS[index];
        if (layout) {
          setSelectedLayoutId(layout.id);
        }
      });
    };

    initFlickity();

    return () => {
      flickityRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    stopStream();
  }, [stopStream]);

  const handlePrev = () => flickityRef.current?.previous();
  const handleNext = () => flickityRef.current?.next();

  const handleTakePhotos = () => {
    if (!currentLayoutId) {
      toast.error("Please select a layout first.");
    } else {
      router.push("/capture-photos");
    }
  };

  const handleUploadPhotos = () => {
    if (!currentLayoutId) {
      toast.error("Please select a layout first.");
    } else {
      router.push("/upload-photos");
    }
  };

  return (
    <div className="relative bg-[#F5F5DA] min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="mb-6 mt-auto w-full flex justify-center">
        <div className="bg-[#C9212D] text-[#F5F5DA] px-8 py-3 md:px-12 md:py-4 text-base md:text-xl tracking-[0.2em] font-medium uppercase border border-[#C9212D] text-center w-full md:w-auto">
          SELECT LAYOUT
        </div>
      </div>

      {/* --- CAROUSEL WRAPPER --- */}
      <div className="relative w-full max-w-5xl border-2 border-[#C9212D] bg-[#F5F5DA] p-2 md:p-12">
        <div className="flex items-center gap-2 md:gap-8 h-full relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="shrink-0 text-[#C9212D] hover:bg-[#C9212D] hover:text-white transition-colors p-1 md:p-2 border border-transparent hover:border-[#C9212D] z-20"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={2} />
          </button>
          <div className="flex-1 min-w-0 overflow-hidden" ref={containerRef}>
            {LAYOUTS.map((layout, index) => (
              <div
                key={layout.id}
                className="w-full flex flex-col items-center gap-4 md:gap-6 opacity-40 transition-opacity duration-300 is-selected:opacity-100"
                style={{ opacity: index === activeIndex ? 1 : 0.4 }}
              >
                {/* Image Container */}
                <div className="p-2  w-full flex justify-center items-center h-[300px] md:h-[450px]">
                  <div className="relative w-full h-full max-w-[280px] md:max-w-none">
                    <Image
                      src={layout.previewImage}
                      alt={layout.label}
                      fill
                      className="object-contain pointer-events-none"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="text-center space-y-1 md:space-y-2">
                  <h2 className="text-[#C9212D] text-lg md:text-2xl font-bold tracking-[0.1em] uppercase">
                    {layout.label}
                  </h2>
                  <p className="text-[#C9212D]/70 text-xs md:text-sm tracking-widest font-medium uppercase">
                    {layout.photoCount} PHOTO{layout.photoCount > 1 ? "S" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="shrink-0 text-[#C9212D] hover:bg-[#C9212D] hover:text-white transition-colors p-1 md:p-2 border border-transparent hover:border-[#C9212D] z-20"
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* --- FOOTER ACTIONS --- */}
      <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-12 w-full max-w-4xl justify-center px-4 md:px-0">
        <Button variant="primary" onClick={handleTakePhotos} className="py-3">
          TAKE PHOTOS
        </Button>

        <Button
          variant="secondary" // Assuming you have a secondary or similar variant
          onClick={handleUploadPhotos}
          className="py-3"
        >
          UPLOAD PHOTOS
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default SelectLayout;
