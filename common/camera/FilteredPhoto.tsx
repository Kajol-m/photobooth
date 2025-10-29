// "use client";
// import { useRef, useEffect, useState } from "react";

// const FilteredPhoto = ({ src, filter,className }: { src: string; filter: string,className:string }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [image, setImage] = useState<HTMLImageElement | null>(null);

//   useEffect(() => {
//     const img = new Image();
//     img.src = src;
//     img.className=className;
//     img.crossOrigin = "anonymous";
//     img.onload = () => setImage(img);
//   }, [src]);

//   useEffect(() => {
//     if (!canvasRef.current || !image) return;
//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return;

//     const { width, height } = image;
//     canvasRef.current.width = width;
//     canvasRef.current.height = height;
//     ctx.drawImage(image, 0, 0, width, height);

//     switch (filter) {
//       case "twilight":
//         ctx.fillStyle = "rgba(7, 207, 161, 0.2)";
//         // ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
//         ctx.fillRect(0, 0, width, height);
//         ctx.globalCompositeOperation = "soft-light";
//         ctx.fillStyle = "rgba(48, 145, 172, 0.2)";
//         //ctx.fillStyle = "rgba(0, 60, 80, 0.2)";
//         ctx.fillRect(0, 0, width, height);
//         ctx.globalCompositeOperation = "source-over";
//         break;

//       case "tumblr2016":
//         ctx.fillStyle = "rgba(237, 161, 181, 0.75)";
//         ctx.fillRect(0, 0, width, height);
//         ctx.fillStyle = "rgba(212, 113, 202, 0.9)";
//         ctx.fillRect(0, 0, width, height);
//         //ctx.filter = "contrast(0.9) brightness(1.1) saturate(1.2)";
//         ctx.drawImage(image, 0, 0, width, height);
//         break;

//       case "bryant":
//         ctx.filter = "contrast(1.1) brightness(1.05) sepia(0.1)";
//         ctx.drawImage(image, 0, 0, width, height);
//         ctx.fillStyle = "rgba(25, 23, 23, 0.36)";
//         ctx.fillRect(0, 0, width, height);
//         break;

//       case "promist":
//         ctx.filter = "blur(2px) brightness(1.1) contrast(0.9)";
//         ctx.globalCompositeOperation = "screen";
//         ctx.drawImage(image, 0, 0, width, height);
//         ctx.globalCompositeOperation = "source-over";
//         break;

//       default:
//         break;
//     }
//   }, [image, filter]);

//   return <canvas ref={canvasRef} className="w-[250px]" />;
// };

// export default FilteredPhoto;
"use client";
import { useRef, useEffect, useState } from "react";

interface FilteredPhotoProps {
  src: string;
  filter: string;
  className?: string; // ✅ allow optional className
}

const FilteredPhoto = ({ src, filter, className = "" }: FilteredPhotoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
  }, [src]);

  useEffect(() => {
    if (!canvasRef.current || !image) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const { width, height } = image;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    switch (filter) {
      case "twilight":
        ctx.fillStyle = "rgba(7, 207, 161, 0.2)";
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "soft-light";
        ctx.fillStyle = "rgba(48, 145, 172, 0.2)";
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
        break;

      case "tumblr2016":
        ctx.fillStyle = "rgba(237, 161, 181, 0.75)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "rgba(212, 113, 202, 0.9)";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0, width, height);
        break;

      case "bryant":
        ctx.filter = "contrast(1.1) brightness(1.05) sepia(0.1)";
        ctx.drawImage(image, 0, 0, width, height);
        ctx.fillStyle = "rgba(25, 23, 23, 0.36)";
        ctx.fillRect(0, 0, width, height);
        break;

      case "promist":
        ctx.filter = "blur(2px) brightness(1.1) contrast(0.9)";
        ctx.globalCompositeOperation = "screen";
        ctx.drawImage(image, 0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
        break;

      default:
        break;
    }
  }, [image, filter]);

  return <canvas ref={canvasRef} className={`w-[250px] ${className}`} />;
};

export default FilteredPhoto;
