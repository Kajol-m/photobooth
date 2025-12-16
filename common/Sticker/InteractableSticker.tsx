// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import Moveable from "react-moveable";

// interface StickerProps {
//   id: string;
//   src: string;
//   isSelected: boolean;
//   onSelect: () => void;
//   transform: string;
//   onUpdate: (id: string, transform: string) => void;
//   containerWidth: number;  // 👈 NEW: For boundary calculation
//   containerHeight: number; // 👈 NEW: For boundary calculation
// }

// export const InteractableSticker = ({
//   id,
//   src,
//   isSelected,
//   onSelect,
//   transform,
//   onUpdate,
//   containerWidth,
//   containerHeight,
// }: StickerProps) => {
//   const targetRef = useRef<HTMLImageElement>(null);
//   const [target, setTarget] = useState<HTMLImageElement | null>(null);
//   const [isEditing, setIsEditing] = useState(false); // 👈 NEW: Track Edit Mode

//   useEffect(() => {
//     setTarget(targetRef.current);
//   }, []);

//   // Reset Editing mode when deselected
//   useEffect(() => {
//     if (!isSelected) {
//       setIsEditing(false);
//     }
//   }, [isSelected]);

//   return (
//     <>
//       <img
//         ref={targetRef}
//         src={src}
//         alt="sticker"
//         draggable={false}
//         className="sticker-target touch-none"
//         // 1. Single Click = Select (Drag Mode)
//         onClick={(e) => {
//           e.stopPropagation();
//           onSelect();
//         }}
//         // 2. Double Click = Edit Mode (Resize/Rotate)
//         onDoubleClick={(e) => {
//           e.stopPropagation();
//           setIsEditing(true);
//         }}
//         style={{
//           position: "absolute",
//           width: "100px",
//           height: "100px",
//           top: 0,
//           left: 0,
//           transform: transform,
//           // Cursor logic: 'grab' usually, 'move' if editing
//           cursor: isEditing ? "move" : "grab", 
//           zIndex: isSelected ? 50 : 10,
//           userSelect: "none",
//         }}
//       />

//       {isSelected && target && (
//         <>
//           {/* Hide controls if not in "Edit Mode" (Single Click) */}
//           <style jsx global>{`
//             .moveable-hidden-controls .moveable-control,
//             .moveable-hidden-controls .moveable-line,
//             .moveable-hidden-controls .moveable-area {
//                display: none !important;
//             }
//           `}</style>

//           <Moveable
//             target={target}
//             // 3. Toggle visual controls based on Double Click
//             className={isEditing ? "" : "moveable-hidden-controls"}
            
//             // 4. Always draggable if selected
//             draggable={true}
//             // 5. Only resizable/rotatable if in Edit Mode
//             resizable={isEditing}
//             rotatable={isEditing}
//             pinchable={true} 
            
//             // 6. Boundary Constraints (Cannot leave frame)
//             snappable={true}
//             bounds={{
//                 left: 0,
//                 top: 0,
//                 right: containerWidth,
//                 bottom: containerHeight,
//                 position: "css",
//             }}

//             throttleDrag={0}
//             throttleRotate={0}
//             throttleResize={0}
//             keepRatio={true}
//             edge={false}

//             // --- DRAG ---
//             onDragStart={(e) => {
//                // Visual feedback: show 'grabbing' fingers
//                e.target.style.cursor = "grabbing";
//             }}
//             onDrag={(e) => {
//               e.target.style.transform = e.transform;
//             }}
//             onDragEnd={(e) => {
//               e.target.style.cursor = isEditing ? "move" : "grab";
//               if (e.lastEvent) {
//                 onUpdate(id, e.lastEvent.transform);
//               }
//             }}

//             // --- RESIZE ---
//             onResize={(e) => {
//               e.target.style.width = `${e.width}px`;
//               e.target.style.height = `${e.height}px`;
//               e.target.style.transform = e.drag.transform;
//             }}
//             onResizeEnd={(e) => {
//               if (e.lastEvent) {
//                 onUpdate(id, e.lastEvent.drag.transform);
//               }
//             }}

//             // --- ROTATE ---
//             onRotate={(e) => {
//               e.target.style.transform = e.drag.transform;
//             }}
//             onRotateEnd={(e) => {
//               if (e.lastEvent) {
//                 onUpdate(id, e.lastEvent.drag.transform);
//               }
//             }}
//           />
//         </>
//       )}
//     </>
//   );
// };

// "use client";
// import { useRef, useState, useEffect } from "react";
// import Moveable from "react-moveable";

// interface StickerProps {
//   id: string;
//   src: string;
//   isSelected: boolean;
//   onSelect: () => void;
//   transform: string;
//   onUpdate: (id: string, transform: string) => void;
//   containerWidth: number;
//   containerHeight: number;
//   scale: number;
// }

// export const InteractableSticker = ({
//   id,
//   src,
//   isSelected,
//   onSelect,
//   transform,
//   onUpdate,
//   containerWidth,
//   containerHeight,
//   scale,
// }: StickerProps) => {
//   const targetRef = useRef<HTMLImageElement>(null);
//   const [target, setTarget] = useState<HTMLImageElement | null>(null);

//   useEffect(() => {
//     setTarget(targetRef.current);
//   }, []);

//   return (
//     <>
//       <img
//         ref={targetRef}
//         src={src}
//         alt="sticker"
//         draggable={false}
//         className="touch-none"
//         onClick={(e) => {
//           e.stopPropagation();
//           onSelect();
//         }}
//         style={{
//           position: "absolute",
//           width: "50px", // Initial size
//           height: "50px", // Initial size
//           top: 0,
//           left: 0,
//           transform: transform,
//           cursor: isSelected ? "move" : "grab",
//           zIndex: isSelected ? 50 : 10,
//           userSelect: "none",
//           outline: isSelected ? "2px solid #3CA152A" : "none",
//         }}
//       />

//       {isSelected && target && (
//         <Moveable
//           target={target}
//           dragTarget={target}
          
//           // 1. ZOOM FIX
//           zoom={1 / scale}
          
//           draggable={true}
//           resizable={true}
//           rotatable={true}
//           pinchable={true}
//           keepRatio={true}
          
//           // 2. DISABLE LIBRARY BOUNDS (We do it manually)
//           snappable={false} 
          
//           throttleDrag={0}
//           edge={false}
//           origin={false}

//           // --- MANUAL BOUNDARY LOGIC ---
//           onDrag={(e) => {
//             // A. Get the proposed X and Y coordinates from the event
//             let [x, y] = e.translate;

//             // B. Get current sticker dimensions directly from the DOM element
//             // (We use offsetWidth because resizing changes the actual style width)
//             const currentWidth = target.offsetWidth;
//             const currentHeight = target.offsetHeight;

//             // C. Clamp X (0 to ContainerWidth - StickerWidth)
//             x = Math.max(0, Math.min(x, containerWidth - currentWidth));

//             // D. Clamp Y (0 to ContainerHeight - StickerHeight)
//             y = Math.max(0, Math.min(y, containerHeight - currentHeight));

//             // E. Force the clamped values back into the transform string
//             e.target.style.transform = e.transform.replace(
//                 /translate\([^)]+\)/, 
//                 `translate(${x}px, ${y}px)`
//             );
//           }}
          
//           onDragEnd={(e) => {
//              if (e.lastEvent) {
//                 // Save the final clamped position
//                 onUpdate(id, e.target.style.transform);
//              }
//           }}

//           // --- RESIZE ---
//           onResize={(e) => {
//             e.target.style.width = `${e.width}px`;
//             e.target.style.height = `${e.height}px`;
//             e.target.style.transform = e.drag.transform;
//           }}
//           onResizeEnd={(e) => {
//             if (e.lastEvent) onUpdate(id, e.lastEvent.drag.transform);
//           }}

//           // --- ROTATE ---
//           onRotate={(e) => {
//             e.target.style.transform = e.drag.transform;
//           }}
//           onRotateEnd={(e) => {
//             if (e.lastEvent) onUpdate(id, e.lastEvent.drag.transform);
//           }}
//         />
//       )}
//     </>
//   );
// };

"use client";
import { useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";

interface StickerProps {
  id: string;
  src: string;
  isSelected: boolean;
  onSelect: () => void;
  transform: string;
  onUpdate: (id: string, transform: string) => void;
  onDelete: () => void;
  containerWidth: number;
  containerHeight: number;
  scale: number;
}

export const InteractableSticker = ({
  id,
  src,
  isSelected,
  onSelect,
  transform,
  onUpdate,
  onDelete,
  containerWidth,
  containerHeight,
  scale,
}: StickerProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setTarget(targetRef.current);
  }, []);

  // Keyboard Support
  useEffect(() => {
    if (!isSelected) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        onDelete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSelected, onDelete]);

  return (
    <>
      {isSelected && (
        <style jsx global>{`
          .moveable-control {
            background: #CA152A !important;
            border: none !important;
            border-radius: 0px !important;
            width: 10px !important;
            height: 10px !important;
            margin-top: -5px !important;
            margin-left: -5px !important;
          }
          .moveable-line {
            background: #CA152A !important;
            height: 2px !important;
            opacity: 1 !important;
          }
          .moveable-rotation-line {
            background: #CA152A !important;
            width: 2px !important;
            transform-origin: 50% 0px;
            height: 40px !important;
          }
        `}</style>
      )}

      <div
        ref={targetRef}
        className="touch-none"
        // Handle selection on touch/click
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        // Ensure touch doesn't drag the frame behind it
        onTouchStart={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          width: "50px",
          height: "50px",
          top: 0,
          left: 0,
          transform: transform,
          cursor: isSelected ? "move" : "pointer",
          zIndex: isSelected ? 50 : 10,
          userSelect: "none",
          // Standard touch-action to prevent scrolling while dragging
          touchAction: "none", 
        }}
      >
        <img
          src={src}
          alt="sticker"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />

        {/* --- DELETE BUTTON --- */}
        {isSelected && (
          <div
            // ✅ FIX: Aggressive Event Stopping for Touch Devices
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              // Do NOT prevent default here, or click might not fire
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
            }}
            // ✅ Fallback: Sometimes mobile 'click' is slow or eaten
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault(); // Prevents double-firing (ghost click)
              onDelete();
            }}
            style={{
              position: "absolute",
              top: "-25px",
              right: "-25px",
              width: "18px", // Made slightly larger for touch targets
              height: "18px",
              backgroundColor: "#CA152A",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1000, // Very high z-index
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              border: "2px solid #F5F5DA",
              touchAction: "manipulation", // Improves touch handling
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5F5DA"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        )}
      </div>

      {isSelected && target && (
        <Moveable
          target={target}
          dragTarget={target}
          zoom={1 / scale}
          draggable={true}
          resizable={true}
          rotatable={true}
          pinchable={true}
          keepRatio={true}
          renderDirections={["nw", "ne", "sw", "se"]}
          snappable={false}
          throttleDrag={0}
          edge={true}
          origin={false}
          
          // --- BOUNDARIES ---
          onDrag={(e) => {
            let [x, y] = e.translate;
            const currentWidth = target.offsetWidth;
            const currentHeight = target.offsetHeight;

            x = Math.max(0, Math.min(x, containerWidth - currentWidth));
            y = Math.max(0, Math.min(y, containerHeight - currentHeight));

            e.target.style.transform = e.transform.replace(
              /translate\([^)]+\)/,
              `translate(${x}px, ${y}px)`
            );
          }}
          onDragEnd={(e) => {
            if (e.lastEvent) onUpdate(id, e.target.style.transform);
          }}
          onResize={(e) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
          }}
          onResizeEnd={(e) => {
            if (e.lastEvent) onUpdate(id, e.lastEvent.drag.transform);
          }}
          onRotate={(e) => {
            e.target.style.transform = e.drag.transform;
          }}
          onRotateEnd={(e) => {
            if (e.lastEvent) onUpdate(id, e.lastEvent.drag.transform);
          }}
        />
      )}
    </>
  );
};