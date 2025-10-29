"use client";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { applyWarmSunFilter } from "@/lib/Filters/WarmSun";
import { applyVintageSmoothFilter } from "@/lib/Filters/VintageSmooth";
import { applyTwilightFilter } from "@/lib/Filters/TwilightFilter";
import { applyDreamyGlowFilter } from "@/lib/Filters/DreamLike";
import { applyMystFilter } from "@/lib/Filters/MystFilter";
import { useCameraStore } from "@/store/useCameraStore";

const filters = [
  { name: "None", value: "" },
  { name: "Grayscale", value: "grayscale(100%)" },
  { name: "Sepia", value: "sepia(100%)" },
  { name: "Brightness", value: "brightness(1.5)" },
  { name: "WarmSun", value: "warmsun" },
  { name: "Vintage", value: "vintage" },
  { name: "Twilight", value: "twilight" },
  { name: "Dream", value: "dream" },
  { name: "Myst", value: "myst" },
];

const CapturePhoto = () => {
  const router = useRouter();
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const liveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const filterPreviewCanvasRefs = useRef<
    Record<string, HTMLCanvasElement | null>
  >({});

  const { layout, addPhoto } = usePhotoboothStore();
  const slots = layout?.slots ?? 1;
  const aspectRatio = layout?.aspectRatio ?? 4 / 3;

  const { setStream } = useCameraStore();

  const [currentCount, setCurrentCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showGetReady, setShowGetReady] = useState(false);
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [flash, setFlash] = useState(false);

  const photoCountdownMax = 3;

  const cameraHeight = 400;
  const cameraWidth = cameraHeight * aspectRatio;
  const isCustomCanvasFilter = [
    "warmsun",
    "vintage",
    "twilight",
    "dream",
    "myst",
  ].includes(selectedFilter);

  /** Start camera and save stream to ref */
  useEffect(() => {
    let mounted = true;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        setStream(stream);

        if (!mounted) return;
        streamRef.current = stream;
        console.log("After turning ON", stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch((err) => {
            if (err.name !== "AbortError") console.error(err);
          });
        }
        console.log("After turning ON2", stream);
      } catch (err) {
        setPermissionError(err instanceof Error ? err.message : String(err));
      }
    }

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [pathname]);

  /** Stop camera on route changes */
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      useCameraStore.getState().stopStream();
    };
  }, []);
  

  /** Live canvas rendering for custom filters */
  useEffect(() => {
    const video = videoRef.current;
    const canvas = liveCanvasRef.current;
    if (!video || !canvas) return;

    const renderFrame = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (
        canvas.width !== video.videoWidth ||
        canvas.height !== video.videoHeight
      ) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (selectedFilter === "warmsun") applyWarmSunFilter(ctx, canvas, 1);
      else if (selectedFilter === "vintage")
        applyVintageSmoothFilter(ctx, canvas, 1);
      else if (selectedFilter === "twilight")
        applyTwilightFilter(ctx, canvas, 1);
      else if (selectedFilter === "dream")
        applyDreamyGlowFilter(ctx, canvas, 1);
      else if (selectedFilter === "myst") applyMystFilter(ctx, canvas, 1);

      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [selectedFilter]);

  /** Countdown logic */
  useEffect(() => {
    if (!isCapturing) return;
    if (countdown > photoCountdownMax) {
      handleFlashAndCapture();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((c) => c + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isCapturing, countdown]);

  /** Start photo sequence */
  const startSequence = () => {
    setSequenceStarted(true);
    startPhotoCountdown(currentCount);
  };

  const startPhotoCountdown = (photoIndex: number) => {
    if (photoIndex >= slots) return;
    setShowGetReady(true);
    setCountdown(0);
    setIsCapturing(false);

    setTimeout(() => {
      setShowGetReady(false);
      setCountdown(1);
      setIsCapturing(true);
    }, 1000);
  };

  /** Capture photo with filters applied */
  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = canvasRef.current ?? document.createElement("canvas");
    canvasRef.current = canvas;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    switch (selectedFilter) {
      case "warmsun":
        applyWarmSunFilter(ctx, canvas, 1);
        break;
      case "vintage":
        applyVintageSmoothFilter(ctx, canvas, 1);
        break;
      case "twilight":
        applyTwilightFilter(ctx, canvas, 1);
        break;
      case "dream":
        applyDreamyGlowFilter(ctx, canvas, 1);
        break;
      case "myst":
        applyMystFilter(ctx, canvas, 1);
        break;
      default:
        if (selectedFilter) {
          ctx.filter = selectedFilter;
          ctx.drawImage(canvas, 0, 0);
          ctx.filter = "none";
        }
    }

    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    addPhoto({
      id: uuidv4(),
      dataUrl,
      width: canvas.width,
      height: canvas.height,
    });
  };

  /** Flash and next photo sequence */
  const handleFlashAndCapture = () => {
    setFlash(true);
    setIsCapturing(false);

    setTimeout(() => {
      capturePhoto();
      setFlash(false);
      const nextPhoto = currentCount + 1;
      setCurrentCount(nextPhoto);

      if (nextPhoto < slots) {
        startPhotoCountdown(nextPhoto);
      } else {
        // Stop camera completely before navigating
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) videoRef.current.srcObject = null;

        router.push("/decorate-photos");
      }
    }, 500);
  };

  const getOverlayText = () => {
    if (showGetReady) return `Get Ready for Photo ${currentCount + 1}`;
    if (isCapturing && countdown <= photoCountdownMax) return countdown;
    return "";
  };

  return (
    <div className="flex flex-col items-center px-8 pb-8 pt-[100px] space-y-4 bg-[#FFDBE9] min-h-screen">
      <div
        className="relative rounded-lg border-2 border-black overflow-hidden"
        style={{ width: cameraWidth, height: cameraHeight }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          style={{
            filter: isCustomCanvasFilter ? "none" : selectedFilter,
            display: isCustomCanvasFilter ? "none" : "block",
          }}
        />
        {isCustomCanvasFilter && (
          <canvas ref={liveCanvasRef} className="w-full h-full object-cover" />
        )}

        {(showGetReady || isCapturing) && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold z-10">
            {getOverlayText()}
          </div>
        )}

        {flash && (
          <div className="absolute inset-0 bg-white opacity-100 animate-[flash_0.5s] pointer-events-none z-20" />
        )}
      </div>

      {!sequenceStarted ? (
        <button
          onClick={startSequence}
          className="px-6 py-2 bg-[#FFBBE9] text-white rounded-md cursor-pointer hover:bg-[#FF9FD9] transition-colors flex items-center gap-2"
        >
          Start 📸
        </button>
      ) : (
        <button className="px-6 py-2 bg-[#FFBBE9] text-white rounded-md cursor-pointer hover:bg-[#FF9FD9] transition-colors">
          Capturing
        </button>
      )}

      {/* Filters */}
      <div className="flex gap-4 mt-4 flex-wrap justify-center">
        {filters.map((f) => (
          <div
            key={f.name}
            onClick={() => setSelectedFilter(f.value)}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div
              className={`w-18 h-18 rounded-sm transition-all border-2 overflow-hidden ${
                selectedFilter === f.value
                  ? " border-black shadow-lg scale-102"
                  : "hover:border-gray-400"
              }`}
            >
              <canvas
                ref={(el) => {
                  if (el) filterPreviewCanvasRefs.current[f.name] = el;
                }}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`text-xs font-medium ${
                selectedFilter === f.value
                  ? "text-black font-bold"
                  : "text-gray-700"
              }`}
            >
              {f.name}
            </span>
          </div>
        ))}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <style jsx>{`
        @keyframes flash {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-[flash_0.5s] {
          animation: flash 0.5s forwards;
        }
      `}</style>
    </div>
  );
};

export default CapturePhoto;
