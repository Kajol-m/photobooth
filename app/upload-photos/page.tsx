"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cropper, { Area } from "react-easy-crop";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { LAYOUTS } from "@/lib/layouts/layout";
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  RotateCcw,
} from "lucide-react";
import { getCroppedImg } from "@/lib/layouts/cropImage";
import Footer from "@/common/Footer/Footer";
import Button from "@/common/button/Button";

// Helper for unique IDs
const generateId = () =>
  `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const UploadPhotos = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STORE ---
  const { photos, addPhoto, clearPhotos, selectedLayoutId } =
    usePhotoboothStore();

  // --- LOCAL STATE ---
  const [isDragging, setIsDragging] = useState(false);

  // Crop State
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // --- LAYOUT LOGIC ---
  const currentLayout =
    LAYOUTS.find((l) => l.id === selectedLayoutId) || LAYOUTS[0];
  const requiredCount = currentLayout.photoCount;
  // Use the cameraRatio from config to force correct crop shape
  const requiredAspect = currentLayout.cameraRatio;

  const currentCount = photos.length;
  const isComplete = currentCount >= requiredCount;

  // --- HANDLERS ---

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement> | FileList) => {
    let files: FileList | null = null;

    // Type Guard to distinguish between ChangeEvent and FileList
    if (e instanceof FileList) {
      files = e;
    } else if (e.target) {
      files = e.target.files;
    }

    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setCropImageSrc(reader.result); // Open Cropper
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveCroppedImage = async () => {
    if (!cropImageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(cropImageSrc, croppedAreaPixels);

      if (croppedImage) {
        addPhoto({
          id: generateId(),
          dataUrl: croppedImage,
        });
      }

      // Cleanup
      setCropImageSrc(null);
      setZoom(1);
      // Reset file input value so same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      console.error(e);
      alert("Failed to crop image");
    }
  };

  // Drag & Drop
  const handleDrag = (e: React.DragEvent<HTMLDivElement>, state: boolean) => {
    e.preventDefault();
    setIsDragging(state);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F5DA] flex flex-col items-center p-4 md:p-8 relative">
      {/* =======================
          CROPPER MODAL
      ======================== */}
      {cropImageSrc && (
        <div className="fixed inset-0 z-50 bg-[#F5F5DA] flex flex-col items-center justify-center p-4">
          <div className="text-black mb-4 text-center">
            <h3 className="text-xl font-bold tracking-widest text-[#C9212D]">
              CROP PHOTO
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Adjust your photo to fit the {currentLayout.label} frame
            </p>
          </div>

          <div className="relative w-full max-w-xl h-[50vh] bg-black border-2 border-[#C9212D] mb-6">
            <Cropper
              image={cropImageSrc}
              crop={crop}
              zoom={zoom}
              aspect={requiredAspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

          {/* Controls */}
          <div className="w-full max-w-xl flex flex-col gap-6">
            <div className="flex gap-4">
              <Button
              variant="secondary"
                onClick={() => {
                  setCropImageSrc(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="flex-1 bg-transparent text-[#C9212D] py-3 tracking-widest text-sm hover:bg-[#C9212D] hover:text-[#F5F5DA] transition border-2 border-[#C9212D]"
              >
                CANCEL
              </Button>
              <Button
              variant="primary"
                onClick={saveCroppedImage}
                className="flex-1 bg-[#C9212D] text-[#F5F5DA] py-3 tracking-widest text-sm hover:bg-[#A0121C] transition border-2 border-[#C9212D]"
              >
                CONFIRM CROP
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* =======================
          MAIN UI
      ======================== */}

      {/* Header */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="bg-[#C9212D] text-[#F5F5DA] px-8 py-4 text-lg md:text-xl tracking-[0.2em] font-medium w-full md:w-auto text-center">
          UPLOAD PHOTOS
        </div>

        <div className="border-2 border-[#C9212D] text-[#C9212D] px-6 py-4 text-xs md:text-sm tracking-[0.2em] font-bold bg-[#F5F5DA] w-full md:w-auto text-center ">
          {currentCount} / {requiredCount} PHOTOS READY
        </div>
      </div>

      {/* Upload Container */}
      <div
        className={`
          relative w-full max-w-6xl flex-grow min-h-[400px] border-2 border-[#C9212D]
          flex flex-col transition-colors duration-200 p-2 md:p-6
          ${isDragging ? "bg-[#C9212D]/10" : "bg-[#F5F5DA]"}
          ${
            photos.length === 0
              ? "items-center justify-center"
              : "items-start justify-start"
          }
        `}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onFileSelect}
        />

        {/* --- EMPTY STATE --- */}
        {photos.length === 0 && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="flex justify-center">
              {/* Device Upload Only */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="group flex flex-col items-center gap-3 p-8 bg-white/50 hover:bg-white border-2 border-transparent hover:border-[#C9212D]/20 transition-all duration-300"
              >
                <div className="bg-[#C9212D] text-white p-5 rounded-full group-hover:scale-110 transition-transform shadow-lg">
                  <Smartphone size={32} />
                </div>
                <span className="text-[#C9212D] font-bold tracking-widest text-sm">
                  UPLOAD FROM DEVICE
                </span>
              </button>
            </div>
            <p className="text-[#C9212D]/60 text-xs tracking-[0.2em] font-medium">
              OR DRAG & DROP IMAGES HERE
            </p>
          </div>
        )}

        {/* --- GRID VIEW --- */}
        {photos.length > 0 && (
          <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto">
            {/* 1. Render Uploaded Photos */}
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                className="relative aspect-square bg-white border border-[#C9212D]/20 shadow-sm group"
              >
                <img
                  src={photo.dataUrl}
                  alt={`uploaded-${idx}`}
                  className="w-full h-full object-contain bg-neutral-100"
                />
                {/* Badge */}
                <div className="absolute top-0 left-0 bg-[#C9212D] text-white text-[10px] font-bold px-2 py-1">
                  #{idx + 1}
                </div>
              </div>
            ))}

            {/* 2. Render Empty Slots (Clickable) */}
            {Array.from({
              length: Math.max(0, requiredCount - currentCount),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-[#C9212D]/30 flex flex-col items-center justify-center hover:bg-[#C9212D]/5 transition-colors group"
              >
                <Upload className="text-[#C9212D]/40 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[#C9212D]/60 text-[10px] font-bold tracking-widest">
                  ADD PHOTO
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Reset Button */}
        {photos.length > 0 && (
          <button
            onClick={clearPhotos}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-[#C9212D] hover:bg-[#C9212D] hover:text-white p-2 rounded-full transition-all"
            title="Reset All"
          >
            <RotateCcw size={20} />
          </button>
        )}
      </div>

      {/* =======================
          FOOTER NAV
      ======================== */}
      <div className="w-full max-w-6xl flex justify-between items-center mt-8 pb-4">
        {/* BACK BUTTON */}
        <Button
        variant="secondary"
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} /> BACK
        </Button>

        {/* NEXT BUTTON */}
        <Button
        variant="primary"
          onClick={() => isComplete && router.push("/decorate-photos")}
          disabled={!isComplete}
          className={`text-[F5F5DA] font-bold tracking-[0.2em] transition-all
            ${
              isComplete
                ? "bg-[#C9212D] hover:bg-[#A0121C] hover:translate-y-[-2px] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed opacity-50"
            }
          `}
        >
          DECORATE <ArrowRight size={20} />
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default UploadPhotos;
