"use client";
import React, { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { InteractableSticker } from "@/common/Sticker/InteractableSticker";
import { LAYOUTS } from "@/lib/layouts/layout";
import Button from "@/common/button/Button";
import { Download, Share2 } from "lucide-react";
import { toBlob } from "html-to-image";

const PhotoFrame = () => {
  const frameRef = useRef<HTMLDivElement>(null);

  // 1. Get State from Store
  const {
    photos,
    decorations,
    photoTraits,
    selectedLayoutId,
    updateDecoration,
    removeDecoration
  } = usePhotoboothStore();

  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(
    null
  );
  const [isSharing, setIsSharing] = useState(false);

  // 2. View Zoom State (Start at 100% or whatever fits)
  const [scale] = useState(1);

  // 3. Find the Active Layout Config
  const currentLayout =
    LAYOUTS.find((l) => l.id === selectedLayoutId) || LAYOUTS[0];

  // 4. Background Logic
  const getBackgroundStyle = () => {
    const bgValue = photoTraits.backgroundColor;
    const isImage = bgValue?.startsWith("/") || bgValue?.startsWith("http");

    if (isImage) {
      return {
        backgroundImage: `url(${bgValue})`,
        backgroundColor: "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    } else {
      return {
        backgroundImage: "none",
        backgroundColor: bgValue || "#CA152A",
      };
    }
  };

  const generateImageBlob = async () => {
    if (!frameRef.current) return null;
    setSelectedStickerId(null); // Deselect stickers before capture

    // Small delay to ensure UI updates (hiding selection handles)
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const blob = await toBlob(frameRef.current, {
        cacheBust: true,
        pixelRatio: 3, // High quality
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
        width: currentLayout.width,
      });
      return blob;
    } catch (err) {
      console.error("Failed to generate image", err);
      return null;
    }
  };

  // 5. Download Logic
  const handleDownload = async () => {
    if (!frameRef.current) return;
    setSelectedStickerId(null);

    setTimeout(async () => {
      try {
        if (!frameRef.current) return;
        const dataUrl = await toPng(frameRef.current, {
          cacheBust: true,
          pixelRatio: 3,
          style: {
            transform: "scale(1)", // Force download at 100% scale
            transformOrigin: "top left",
          },
          width: currentLayout.width,
        });

        const link = document.createElement("a");
        link.download = `photobooth-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Download failed", err);
      }
    }, 100);
  };

  const handleShare = async () => {
    if (!navigator.share) {
      alert("Sharing is not supported on this browser/device.");
      return;
    }

    setIsSharing(true);
    const blob = await generateImageBlob();

    if (blob) {
      const file = new File([blob], "photobooth-pic.png", {
        type: "image/png",
      });

      try {
        await navigator.share({
          title: "My Photobooth Pic",
          text: "Check out this photo I made!",
          files: [file],
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
    setIsSharing(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full flex justify-center overflow-hidden py-8">
        {/* --- THE FRAME --- */}
        <div
          ref={frameRef}
          className="relative overflow-hidden flex flex-col origin-top transition-transform duration-200 ease-out p-1.5"
          // Deselect on background click
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedStickerId(null);
            }
          }}
          style={{
            width: `${currentLayout.width}px`,
            // height: `${currentLayout.height}px`,
            transform: `scale(${scale})`,
            // transformOrigin: "top center",
            ...getBackgroundStyle(),
          }}
        >
          {/* Photos Grid */}
          <div className={`grid w-full shrink-0 ${currentLayout.gridClass}`}>
            {Array.from({ length: currentLayout.photoCount }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden ${
                    currentLayout.slotClass || ""
                  }`}
                >
                  {photos[index] ? (
                    <img
                      src={photos[index].dataUrl}
                      className="w-full h-full object-cover"
                      alt={`captured-${index}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs font-medium uppercase tracking-wider">
                      Empty Slot
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div className="z-10 w-full text-center px-4 flex-grow flex flex-col justify-end">
            {photoTraits.textOption && (
              <h2
                className="text-sm"
                style={{ color: photoTraits.textColor || "#F5F5DA" }}
              >
                {photoTraits.textOption}
              </h2>
            )}
            <div
              className="flex justify-center gap-2 text-[10px] font-mono uppercase tracking-widest"
              style={{ color: photoTraits.textColor || "#F5F5DA" }}
            >
              {photoTraits.dateOption && (
                <span>{new Date().toLocaleDateString()}</span>
              )}
              {photoTraits.timeOption && (
                <span>
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>

          {/* Stickers Layer */}
          {decorations.map((decoration) =>
            decoration.type === "sticker" ? (
              <InteractableSticker
                key={decoration.id}
                id={decoration.id}
                src={decoration.props.src}
                transform={decoration.transform}
                isSelected={selectedStickerId === decoration.id}
                onSelect={() => setSelectedStickerId(decoration.id)}
                onUpdate={updateDecoration}
                containerWidth={currentLayout.width || 350}
                containerHeight={currentLayout.height || 450}
                scale={scale}
                onDelete={() => removeDecoration(decoration.id)}
              />
            ) : null
          )}
        </div>
      </div>
{/* --- ACTION BUTTONS --- */}
      <div className="flex gap-4 items-center">
        
        {/* DOWNLOAD BUTTON */}
        <Button
          variant="primary"
          onClick={handleDownload}
          className="px-4 hidden md:flex"
        >
          DOWNLOAD{" "}
          <span className="pl-3">
            <Download className="text-[#F5F5DA]" />
          </span>
        </Button>

        {/* SHARE BUTTON (Desktop/Mobile) */}
        <Button
          variant="secondary" // Assuming you have a secondary or similar variant
          onClick={handleShare}
          className="px-4 bg-[#F5F5DA] text-[#CA152A] border border-[#CA152A]"
          disabled={isSharing}
        >
          {isSharing ? "SHARING..." : "SHARE"}
          <span className="pl-3">
            <Share2 className="text-[#CA152A]" />
          </span>
        </Button>
      </div>

      {/* <Button
        variant="primary"
        onClick={handleDownload}
        className="px-4 hidden md:flex"
      >
        DOWNLOAD{" "}
        <span className="pl-3">
          <Download className="text-[#F5F5DA]" />
        </span>
      </Button>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-[#CA152A] text-[#F5F5DA] md:hidden flex items-center justify-center"
      >
        DOWNLOAD{" "}
        <span className="pl-3">
          <Download className="text-[#F5F5DA]" />
        </span>
      </button> */}
    </div>
  );
};

export default PhotoFrame;
