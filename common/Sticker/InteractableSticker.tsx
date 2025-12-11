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

"use client";
import React, { useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";

interface StickerProps {
  id: string;
  src: string;
  isSelected: boolean;
  onSelect: () => void;
  transform: string;
  onUpdate: (id: string, transform: string) => void;
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
  containerWidth,
  containerHeight,
  scale,
}: StickerProps) => {
  const targetRef = useRef<HTMLImageElement>(null);
  const [target, setTarget] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    setTarget(targetRef.current);
  }, []);

  return (
    <>
      <img
        ref={targetRef}
        src={src}
        alt="sticker"
        draggable={false}
        className="touch-none"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        style={{
          position: "absolute",
          width: "100px", // Initial size
          height: "100px", // Initial size
          top: 0,
          left: 0,
          transform: transform,
          cursor: isSelected ? "move" : "grab",
          zIndex: isSelected ? 50 : 10,
          userSelect: "none",
          outline: isSelected ? "2px solid #3b82f6" : "none",
        }}
      />

      {isSelected && target && (
        <Moveable
          target={target}
          dragTarget={target}
          
          // 1. ZOOM FIX
          zoom={1 / scale}
          
          draggable={true}
          resizable={true}
          rotatable={true}
          pinchable={true}
          keepRatio={true}
          
          // 2. DISABLE LIBRARY BOUNDS (We do it manually)
          snappable={false} 
          
          throttleDrag={0}
          edge={false}
          origin={false}

          // --- MANUAL BOUNDARY LOGIC ---
          onDrag={(e) => {
            // A. Get the proposed X and Y coordinates from the event
            let [x, y] = e.translate;

            // B. Get current sticker dimensions directly from the DOM element
            // (We use offsetWidth because resizing changes the actual style width)
            const currentWidth = target.offsetWidth;
            const currentHeight = target.offsetHeight;

            // C. Clamp X (0 to ContainerWidth - StickerWidth)
            x = Math.max(0, Math.min(x, containerWidth - currentWidth));

            // D. Clamp Y (0 to ContainerHeight - StickerHeight)
            y = Math.max(0, Math.min(y, containerHeight - currentHeight));

            // E. Force the clamped values back into the transform string
            e.target.style.transform = e.transform.replace(
                /translate\([^)]+\)/, 
                `translate(${x}px, ${y}px)`
            );
          }}
          
          onDragEnd={(e) => {
             if (e.lastEvent) {
                // Save the final clamped position
                onUpdate(id, e.target.style.transform);
             }
          }}

          // --- RESIZE ---
          onResize={(e) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
          }}
          onResizeEnd={(e) => {
            if (e.lastEvent) onUpdate(id, e.lastEvent.drag.transform);
          }}

          // --- ROTATE ---
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