// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import DraggablePhoto from "@/common/DraggablePhoto";
// import { usePhotoboothStore } from "@/store/usePhotoboothStore";
// import html2canvas from "html2canvas";
// import { useRouter } from "next/navigation";

// const Layout11 = () => {
//   const frameRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const { photos, decorations, photoTraits } = usePhotoboothStore();
//   const { backgroundColor, textOption, dateOption, timeOption } = photoTraits;
//   const router = useRouter();

//   // 🕒 Hold date/time in state, update only on client
//   const [formattedDate, setFormattedDate] = useState<string | null>(null);
//   const [formattedTime, setFormattedTime] = useState<string | null>(null);

//   useEffect(() => {
//     const now = new Date();
//     setFormattedDate(
//       now
//         .toLocaleDateString("en-US", {
//           month: "short",
//           year: "numeric",
//           weekday: "short",
//         })
//         .replace(/,/g, ", ")
//     );
//     setFormattedTime(
//       now.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     );
//   }, []); // runs only on client mount

//   const handleDownload = () => {
//     if (canvasRef.current) {
//       const link = document.createElement('a');
//       link.download = `photobooth-${Date.now()}.png`;
//       link.href = canvasRef.current.toDataURL('image/png');
//       link.click();

//     }
//   };

//   const handleRetake = () => {
//     router.push("/select-layout");
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       {/* Layout Frame */}
//       <div
//         ref={frameRef}
//         className="w-[270px] h-[365px] p-6 relative overflow-hidden flex flex-col items-center justify-start"
//         style={{
//           background: backgroundColor.startsWith("/")
//             ? `url(${backgroundColor}) center/cover no-repeat`
//             : backgroundColor,
//         }}
//       >
//         {/* Photo */}
//         {photos[0] && (
//           <img
//             src={photos[0].dataUrl}
//             alt="Captured"
//             className="bg-white aspect-[4/5] w-full object-cover"
//           />
//         )}

//         {/* Custom Text */}
//         {textOption && (
//           <p
//             className="text-sm text-center pt-3"
//             style={{ color: photoTraits.textColor || "#000" }}
//           >
//             {textOption}
//           </p>
//         )}

//         {/* Date and/or Time */}
//         {(dateOption || timeOption) && formattedDate && formattedTime && (
//           <div
//             className="text-[8px] text-center flex flex-row gap-1"
//             style={{ color: photoTraits.textColor || "#000" }}
//           >
//             {dateOption && <p>{formattedDate}</p>}
//             {timeOption && <p>{formattedTime}</p>}
//           </div>
//         )}

//         {/* Stickers */}
//         {decorations
//           .filter((d) => d.type === "sticker")
//           .map((d) => (
//             <DraggablePhoto
//               key={d.id}
//               src={d.props.src}
//               initialX={d.x}
//               initialY={d.y}
//               containerRef={frameRef}
//             />
//           ))}
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-4 mt-4">
//         <button
//           onClick={handleDownload}
//           className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Download
//         </button>
//         <button
//           onClick={handleRetake}
//           className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
//         >
//           Retake
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Layout11;

// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import DraggablePhoto from "@/common/DraggablePhoto";
// import { usePhotoboothStore } from "@/store/usePhotoboothStore";

// const Layout11 = () => {
//   const frameRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const { photos, decorations, photoTraits } = usePhotoboothStore();
//   const { backgroundColor, textOption, dateOption, timeOption } = photoTraits;

//   // 🕒 date/time
//   const [formattedDate, setFormattedDate] = useState<string | null>(null);
//   const [formattedTime, setFormattedTime] = useState<string | null>(null);

//   useEffect(() => {
//     const now = new Date();
//     setFormattedDate(
//       now
//         .toLocaleDateString("en-US", {
//           month: "short",
//           year: "numeric",
//           weekday: "short",
//         })
//         .replace(/,/g, ", ")
//     );
//     setFormattedTime(
//       now.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     );
//   }, []);

//   const loadImage = (src: string): Promise<HTMLImageElement> => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = "anonymous";
//       img.onload = () => resolve(img);
//       img.onerror = reject;
//       img.src = src;
//     });
//   };

//   const handleDownload = async () => {
//     if (!frameRef.current || !canvasRef.current) return;

//     try {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       // Use higher resolution for better quality
//       const scale = 3;
//       canvas.width = 270 * scale;
//       canvas.height = 365 * scale;
//       ctx.scale(scale, scale);

//       // Enable better image rendering
//       ctx.imageSmoothingEnabled = true;
//       ctx.imageSmoothingQuality = "high";

//       // Get computed background color
//       const computedBg = window.getComputedStyle(frameRef.current).backgroundColor;

//       // Draw background
//       if (backgroundColor.startsWith("/")) {
//         const bgImg = await loadImage(backgroundColor);
//         ctx.drawImage(bgImg, 0, 0, 270, 365);
//       } else {
//         ctx.fillStyle = computedBg;
//         ctx.fillRect(0, 0, 270, 365);
//       }

//       // Draw main photo with exact layout measurements
//       if (photos[0]) {
//         const photoImg = await loadImage(photos[0].dataUrl);
//         const padding = 24; // p-6 = 24px
//         const photoWidth = 270 - (padding * 2); // 222px
//         const photoHeight = photoWidth * 1.25; // aspect-[4/5] = 277.5px
        
//         // White background for photo
//         ctx.fillStyle = "white";
//         ctx.fillRect(padding, padding, photoWidth, photoHeight);
        
//         // Draw photo with object-cover behavior
//         const imgAspect = photoImg.width / photoImg.height;
//         const boxAspect = photoWidth / photoHeight;
        
//         let drawWidth, drawHeight, offsetX, offsetY;
        
//         if (imgAspect > boxAspect) {
//           // Image is wider - fit height
//           drawHeight = photoHeight;
//           drawWidth = photoImg.width * (photoHeight / photoImg.height);
//           offsetX = padding - (drawWidth - photoWidth) / 2;
//           offsetY = padding;
//         } else {
//           // Image is taller - fit width
//           drawWidth = photoWidth;
//           drawHeight = photoImg.height * (photoWidth / photoImg.width);
//           offsetX = padding;
//           offsetY = padding - (drawHeight - photoHeight) / 2;
//         }
        
//         ctx.save();
//         ctx.beginPath();
//         ctx.rect(padding, padding, photoWidth, photoHeight);
//         ctx.clip();
//         ctx.drawImage(photoImg, offsetX, offsetY, drawWidth, drawHeight);
//         ctx.restore();
//       }

//       // Calculate positions for text elements
//       const padding = 24;
//       const photoWidth = 270 - (padding * 2);
//       const photoHeight = photoWidth * 1.25;
//       let currentY = padding + photoHeight;

//       // Draw custom text
//       if (textOption) {
//         currentY += 12; // pt-3 spacing
//         const textColor = photoTraits.textColor || "#000";
//         ctx.fillStyle = textColor;
//         ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "top";
//         ctx.fillText(textOption, 135, currentY);
//         currentY += 18; // Approximate line height
//       }

//       // Draw date/time
//       if ((dateOption || timeOption) && formattedDate && formattedTime) {
//         const textColor = photoTraits.textColor || "#000";
//         ctx.fillStyle = textColor;
//         ctx.font = "8px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "top";
        
//         const parts = [];
//         if (dateOption) parts.push(formattedDate);
//         if (timeOption) parts.push(formattedTime);
//         const dateTimeText = parts.join(" ");
        
//         ctx.fillText(dateTimeText, 135, currentY);
//       }

//       // Draw stickers - get actual DOM positions
//       const frameRect = frameRef.current.getBoundingClientRect();
//       const stickers = decorations.filter((d) => d.type === "sticker");
      
//       for (const sticker of stickers) {
//         try {
//           const stickerImg = await loadImage(sticker.props.src);
          
//           // Find the actual sticker element in DOM by matching src
//           const allImgs = frameRef.current.querySelectorAll('img');
//           let stickerEl: HTMLImageElement | null = null;
          
//           // Find the matching sticker by src
//           for (let i = 0; i < allImgs.length; i++) {
//             if (allImgs[i].src === sticker.props.src || allImgs[i].getAttribute('src') === sticker.props.src) {
//               stickerEl = allImgs[i];
//               break;
//             }
//           }
          
//           if (stickerEl) {
//             // Get actual position relative to frame
//             const stickerRect = stickerEl.getBoundingClientRect();
//             const relativeX = stickerRect.left - frameRect.left;
//             const relativeY = stickerRect.top - frameRect.top;
            
//             // Draw sticker at actual position
//             ctx.drawImage(
//               stickerImg,
//               relativeX,
//               relativeY,
//               stickerRect.width,
//               stickerRect.height
//             );
//           } else {
//             // Fallback to stored positions if element not found
//             ctx.drawImage(
//               stickerImg,
//               sticker.x,
//               sticker.y,
//               50,
//               50
//             );
//           }
//         } catch (err) {
//           console.warn("Failed to load sticker:", sticker.props.src);
//         }
//       }

//       // Download with high quality
//       canvas.toBlob((blob) => {
//         if (!blob) return;
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `photobooth-${Date.now()}.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//       }, "image/png", 1.0);
//     } catch (error) {
//       console.error("Download failed:", error);
//       alert("Failed to download image. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       {/* Hidden canvas for rendering */}
//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       {/* Layout Frame */}
//       <div
//         ref={frameRef}
//         className="w-[270px] h-[365px] p-6 relative overflow-hidden flex flex-col items-center justify-start"
//         style={{
//           background: backgroundColor.startsWith("/")
//             ? `url(${backgroundColor}) center/cover no-repeat`
//             : backgroundColor,
//         }}
//       >
//         {/* Photo */}
//         {photos[0] && (
//           <img
//             src={photos[0].dataUrl}
//             alt="Captured"
//             className="bg-white aspect-[4/5] w-full object-cover"
//           />
//         )}

//         {/* Custom Text */}
//         {textOption && (
//           <p
//             className="text-sm text-center pt-3"
//             style={{ color: photoTraits.textColor || "#000" }}
//           >
//             {textOption}
//           </p>
//         )}

//         {/* Date + Time */}
//         {(dateOption || timeOption) && formattedDate && formattedTime && (
//           <div
//             className="text-[8px] text-center flex flex-row gap-1"
//             style={{ color: photoTraits.textColor || "#000" }}
//           >
//             {dateOption && <p>{formattedDate}</p>}
//             {timeOption && <p>{formattedTime}</p>}
//           </div>
//         )}
//         {decorations
//           .filter((d) => d.type === "sticker")
//           .map((d) => (
//             <DraggablePhoto
//               key={d.id}
//               src={d.props.src}
//               initialX={d.x}
//               initialY={d.y}
//               containerRef={frameRef}
//             />
//           ))}
//       </div>

//       {/* Download Button */}
//       <button
//         onClick={handleDownload}
//         className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
//       >
//         Download Photo
//       </button>
//     </div>
//   );
// };

// export default Layout11;


"use client";
import React, { useRef, useState, useEffect } from "react";
import DraggablePhoto from "@/common/DraggablePhoto";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { useRouter } from "next/navigation";

const Layout11 = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { photos, decorations, photoTraits } = usePhotoboothStore();
  const { backgroundColor, textOption, dateOption, timeOption } = photoTraits;

  const router = useRouter();
  //date/time
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    setFormattedDate(
      now
        .toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          weekday: "short",
        })
        .replace(/,/g, ", ")
    );
    setFormattedTime(
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleDownload = async () => {
    if (!frameRef.current || !canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Use 2x resolution for better quality while maintaining reasonable file size
      const scale = 3;
      canvas.width = 270 * scale;
      canvas.height = 360 * scale;
      ctx.scale(scale, scale);

      // Enable better image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Get computed background color
      const computedBg = window.getComputedStyle(frameRef.current).backgroundColor;

      // Draw background
      if (backgroundColor.startsWith("/")) {
        const bgImg = await loadImage(backgroundColor);
        ctx.drawImage(bgImg, 0, 0, 270, 365);
      } else {
        ctx.fillStyle = computedBg;
        ctx.fillRect(0, 0, 270, 365);
      }

      // Draw main photo with exact layout measurements
      if (photos[0]) {
        const photoImg = await loadImage(photos[0].dataUrl);
        const padding = 24; // p-6 = 24px
        const photoWidth = 270 - (padding * 2); // 222px
        const photoHeight = photoWidth * 1.25; // aspect-[4/5] = 277.5px
        
        // White background for photo
        ctx.fillStyle = "white";
        ctx.fillRect(padding, padding, photoWidth, photoHeight);
        
        // Draw photo with object-cover behavior
        const imgAspect = photoImg.width / photoImg.height;
        const boxAspect = photoWidth / photoHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgAspect > boxAspect) {
          // Image is wider - fit height
          drawHeight = photoHeight;
          drawWidth = photoImg.width * (photoHeight / photoImg.height);
          offsetX = padding - (drawWidth - photoWidth) / 2;
          offsetY = padding;
        } else {
          // Image is taller - fit width
          drawWidth = photoWidth;
          drawHeight = photoImg.height * (photoWidth / photoImg.width);
          offsetX = padding;
          offsetY = padding - (drawHeight - photoHeight) / 2;
        }
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(padding, padding, photoWidth, photoHeight);
        ctx.clip();
        ctx.drawImage(photoImg, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
      }

      // Calculate positions for text elements
      const padding = 24;
      const photoWidth = 270 - (padding * 2);
      const photoHeight = photoWidth * 1.25;
      let currentY = padding + photoHeight;

      // Draw custom text
      if (textOption) {
        currentY += 12; // pt-3 spacing
        const textColor = photoTraits.textColor || "#000";
        ctx.fillStyle = textColor;
        ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(textOption, 135, currentY);
        currentY += 18; // Approximate line height
      }

      // Draw date/time
      if ((dateOption || timeOption) && formattedDate && formattedTime) {
        const textColor = photoTraits.textColor || "#000";
        ctx.fillStyle = textColor;
        ctx.font = "8px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        
        const parts = [];
        if (dateOption) parts.push(formattedDate);
        if (timeOption) parts.push(formattedTime);
        const dateTimeText = parts.join(" ");
        
        ctx.fillText(dateTimeText, 135, currentY);
      }

      // Draw stickers - get actual DOM positions
      const frameRect = frameRef.current.getBoundingClientRect();
      const stickers = decorations.filter((d) => d.type === "sticker");
      
      for (const sticker of stickers) {
        try {
          const stickerImg = await loadImage(sticker.props.src);
          
          // Find the actual sticker element in DOM by matching src
          const allImgs = frameRef.current.querySelectorAll('img');
          let stickerEl: HTMLImageElement | null = null;
          
          // Find the matching sticker by src
          for (let i = 0; i < allImgs.length; i++) {
            if (allImgs[i].src === sticker.props.src || allImgs[i].getAttribute('src') === sticker.props.src) {
              stickerEl = allImgs[i];
              break;
            }
          }
          
          if (stickerEl) {
            // Get actual position relative to frame
            const stickerRect = stickerEl.getBoundingClientRect();
            const relativeX = stickerRect.left - frameRect.left;
            const relativeY = stickerRect.top - frameRect.top;
            
            // Draw sticker at actual position
            ctx.drawImage(
              stickerImg,
              relativeX,
              relativeY,
              stickerRect.width,
              stickerRect.height
            );
          } else {
            // Fallback to stored positions if element not found
            ctx.drawImage(
              stickerImg,
              sticker.x,
              sticker.y,
              50,
              50
            );
          }
        } catch (err) {
          console.warn("Failed to load sticker:", sticker.props.src);
        }
      }

      // Download with high quality
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `photobooth-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/png", 1.0);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    }
  };


  // const handleRetake=

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Hidden canvas for rendering */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Layout Frame */}
      <div
        ref={frameRef}
        className="w-[270px] h-[365px] p-6 relative overflow-hidden flex flex-col items-center justify-start"
        style={{
          background: backgroundColor.startsWith("/")
            ? `url(${backgroundColor}) center/cover no-repeat`
            : backgroundColor,
        }}
      >
        {/* Photo */}
        {photos[0] && (
          <img
            src={photos[0].dataUrl}
            alt="Captured"
            className="bg-white aspect-[4/5] w-full object-cover"
          />
        )}

        {/* Custom Text */}
        {textOption && (
          <p
            className="text-sm text-center pt-3"
            style={{ color: photoTraits.textColor || "#000" }}
          >
            {textOption}
          </p>
        )}

        {/* Date + Time */}
        {(dateOption || timeOption) && formattedDate && formattedTime && (
          <div
            className="text-[8px] text-center flex flex-row gap-1"
            style={{ color: photoTraits.textColor || "#000" }}
          >
            {dateOption && <p>{formattedDate}</p>}
            {timeOption && <p>{formattedTime}</p>}
          </div>
        )}
        {decorations
          .filter((d) => d.type === "sticker")
          .map((d) => (
            <DraggablePhoto
              key={d.id}
              src={d.props.src}
              initialX={d.x}
              initialY={d.y}
              containerRef={frameRef}
            />
          ))}
      </div>

      {/* Download Button */}
      <div className="flex gap-3">
        <button
          onClick={() => router.push('/select-filters')}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors shadow-md"
        >
          Retake
        </button>
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
        >
          Download Photo
        </button>
      </div>
    </div>
  );
};

export default Layout11;