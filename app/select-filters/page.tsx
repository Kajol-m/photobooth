"use client";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCameraStore } from "@/store/useCameraStore";
import { LAYOUTS } from "@/lib/layouts/layout";

import { applyWarmSunFilter } from "@/lib/Filters/WarmSun";
import { applyVintageSmoothFilter } from "@/lib/Filters/VintageSmooth";
import { applyTwilightFilter } from "@/lib/Filters/TwilightFilter";
import { applyDreamyGlowFilter } from "@/lib/Filters/DreamLike";
import { applyMystFilter } from "@/lib/Filters/MystFilter";
import { applyFujiFilmFilter } from "@/lib/Filters/FujiFilm";
import Button from "@/common/button/Button";
import { Camera } from "lucide-react";

const filters = [
  { name: "None", value: "" },
  { name: "Grayscale", value: "grayscale(100%)" },
  { name: "Sepia", value: "sepia(100%)" },
  { name: "Brightness", value: "brightness(1.5)" },
  { name: "WarmSun", value: "warmsun" },
  { name: "Vintage", value: "vintage" },
  { name: "Twilight", value: "twilight" },
  { name: "Film", value: "film" },
  { name: "Dream", value: "dream" },
  { name: "Myst", value: "myst" },
];

const CapturePhoto = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const CanvasRef = useRef<HTMLCanvasElement | null>(null);

  const { selectedLayoutId, addPhoto } = usePhotoboothStore();
  const { setStream, stopStream } = useCameraStore();

  const currentLayout =
    LAYOUTS.find((l) => l.id === selectedLayoutId) || LAYOUTS[0];
  const slots = currentLayout.photoCount;
  const aspectRatio = currentLayout.cameraRatio;

  const [currentCount, setCurrentCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showGetReady, setShowGetReady] = useState(false);
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [flash, setFlash] = useState(false);

  
  const cameraHeight = 400; 
  const cameraWidth = cameraHeight * aspectRatio; 

  const isCustomCanvasFilter = [
    "warmsun",
    "vintage",
    "twilight",
    "film",
    "dream",
    "myst",
  ].includes(selectedFilter);

  // --- START CAMERA ---
  useEffect(() => {
    let mounted = true;
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (!mounted) {
          mediaStream.getTracks().forEach((t) => t.stop());
          return;
        }
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera Error", err);
      }
    }
    startCamera();
    return () => {
      mounted = false;
      stopStream();
    };
  }, [setStream, stopStream]);

  // --- LIVE RENDER LOOP ---
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const video = videoRef.current;
      const canvas = CanvasRef.current;

      if (video && canvas && video.readyState === 4) {
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.save();
          ctx.translate(canvas.width, 0); 
          ctx.scale(-1, 1);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          if (isCustomCanvasFilter) {
            if (selectedFilter === "warmsun")
              applyWarmSunFilter(ctx, canvas, 1);
            else if (selectedFilter === "vintage")
              applyVintageSmoothFilter(ctx, canvas, 1);
            else if (selectedFilter === "twilight")
              applyTwilightFilter(ctx, canvas, 1);
            else if (selectedFilter === "film")
              applyFujiFilmFilter(ctx, canvas, 1);
            else if (selectedFilter === "dream")
              applyDreamyGlowFilter(ctx, canvas, 1);
            else if (selectedFilter === "myst") applyMystFilter(ctx, canvas, 1);
          } else if (selectedFilter) {
            ctx.save();
            ctx.filter = selectedFilter;
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedFilter, isCustomCanvasFilter]);

  // --- SEQUENCE LOGIC ---
  const startSequence = () => {
    setSequenceStarted(true);
    startPhotoCountdown(currentCount);
  };

  const startPhotoCountdown = (index: number) => {
    if (index >= slots) return;
    setShowGetReady(true);
    setCountdown(0);
    setIsCapturing(false);
    setTimeout(() => {
      setShowGetReady(false);
      setCountdown(1);
      setIsCapturing(true);
    }, 1500);
  };

  // --- COUNTDOWN EFFECT ---
  useEffect(() => {
    if (!isCapturing) return;
    if (countdown > 3) {
      handleFlashAndCapture();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c + 1), 1000);
    return () => clearTimeout(timer);
  }, [isCapturing, countdown]);

  // --- CAPTURE & FLASH ---
  const handleFlashAndCapture = () => {
    setFlash(true);
    setIsCapturing(false);

    setTimeout(() => {
      capturePhoto();
      setFlash(false);
      const next = currentCount + 1;
      setCurrentCount(next);

      if (next < slots) {
        startPhotoCountdown(next);
      } else {
        stopStream();
        router.push("/decorate-photos");
      }
    }, 200);
  };

  const capturePhoto = () => {
    const previewCanvas = CanvasRef.current;
    if (!previewCanvas) return;

    const dataUrl = previewCanvas.toDataURL("image/jpeg", 0.95);
    addPhoto({ id: uuidv4(), dataUrl });
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 min-h-screen bg-[#F5F5DA] gap-4 px-4">
      <div
        className="relative border-4 border-[#CA152A] shadow-xl overflow-hidden bg-black mb-4 w-full md:w-[var(--w)] md:h-[var(--h)]"
        style={{ 
          aspectRatio: aspectRatio,
          '--w': `${cameraWidth}px`,
          '--h': `${cameraHeight}px`
        } as CSSProperties} 
      >
        <video ref={videoRef} className="hidden" muted playsInline />
        <canvas
          ref={CanvasRef}
          className="w-full h-full object-cover"
        />
        {(showGetReady || isCapturing) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <span className="text-[#F5F5DA] text-6xl font-bold drop-shadow-md">
              {showGetReady ? `Photo ${currentCount + 1}` : countdown}
            </span>
          </div>
        )}
        {flash && (
          <div className="absolute inset-0 bg-white z-50 animate-pulse" />
        )}
      </div>

      {/* CONTROLS */}
      {!sequenceStarted ? (
        <Button variant="primary" onClick={startSequence} className="px-4">
          START{" "}
          <span className="pl-3">
            <Camera className="text-[#F5F5DA]" />
          </span>
        </Button>
      ) : (
        <button className="group relative h-9 md:h-10 overflow-hidden cursor-pointer border-2 transition-all duration-300 text-sm md:text-xl bg-[#CA152A] text-[#F5F5DA] border-[#CA152A] px-4">
          Capturing photo {currentCount + 1} of {slots}
        </button>
      )}

      {/* FILTERS */}
      <div className="flex gap-4 mt-4 flex-wrap justify-center">
        {filters.map((f) => (
          <button
            key={f.name}
            onClick={() => setSelectedFilter(f.value)}
            className="flex flex-col items-center gap-2 min-w-[80px] transition-transform active:scale-95 group"
          >
            <div
              className={`w-18 h-18 overflow-hidden flex items-center justify-center bg-white transition-all duration-200 ${
                selectedFilter === f.value
                  ? "border-3 border-[#F9CBD6] scale-102"
                  : "border-2 border-[#CA152A] group-hover:border-[#CA152A]"
              }`}
            >
              <div className="w-full h-full bg-white flex items-center justify-center text-xs text-gray-400">
                Img
              </div>
            </div>

            <span
              className={`text-xs tracking-wide ${
                selectedFilter === f.value
                  ? "font-bold text-[#CA152A]"
                  : "font-medium text-[#CA152A]"
              }`}
            >
              {f.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CapturePhoto;