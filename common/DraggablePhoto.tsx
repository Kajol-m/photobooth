// "use client";
// import React, { useState, useEffect } from "react";

// interface DraggablePhotoProps {
//   id?: string; // 👈 each sticker id from the store
//   src: string;
//   initialX?: number;
//   initialY?: number;
//   containerRef?: React.RefObject<HTMLDivElement | null>;
//   onPositionChange?: (x: number, y: number) => void; // 👈 new prop
// }

// const DraggablePhoto: React.FC<DraggablePhotoProps> = ({
//   id,
//   src,
//   initialX = 0,
//   initialY = 0,
//   containerRef,
//   onPositionChange,
// }) => {
//   const [position, setPosition] = useState({ x: initialX, y: initialY });
//   const [dragging, setDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });

//   const onMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
//     e.stopPropagation();
//     setDragging(true);
//     setOffset({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y,
//     });
//   };

//   const onMouseMove = (e: MouseEvent) => {
//     if (!dragging || !containerRef?.current) return;

//     const rect = containerRef.current.getBoundingClientRect();
//     const newX = Math.max(0, Math.min(e.clientX - offset.x, rect.width - 70));
//     const newY = Math.max(0, Math.min(e.clientY - offset.y, rect.height - 70));

//     setPosition({ x: newX, y: newY });
//     onPositionChange?.(newX, newY); // 👈 keep store synced
//   };

//   const onMouseUp = () => setDragging(false);

//   useEffect(() => {
//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//     return () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };
//   });

//   return (
//     <img
//       src={src}
//       alt="sticker"
//       onMouseDown={onMouseDown}
//       style={{
//         position: "absolute",
//         left: position.x,
//         top: position.y,
//         width: 70,
//         height: 70,
//         cursor: dragging ? "grabbing" : "grab",
//         userSelect: "none",
//       }}
//       draggable={false}
//     />
//   );
// };

// export default DraggablePhoto;
"use client";
import React, { useState, useEffect } from "react";

interface DraggablePhotoProps {
  id?: string; // 👈 each sticker id from the store
  src: string;
  initialX?: number;
  initialY?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onPositionChange?: (x: number, y: number) => void; // 👈 new prop
}

const DraggablePhoto: React.FC<DraggablePhotoProps> = ({
  id,
  src,
  initialX = 0,
  initialY = 0,
  containerRef,
  onPositionChange,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging || !containerRef?.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(e.clientX - offset.x, rect.width - 70));
    const newY = Math.max(0, Math.min(e.clientY - offset.y, rect.height - 70));

    setPosition({ x: newX, y: newY });
    onPositionChange?.(newX, newY); // 👈 keep store synced
  };

  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <img
      src={src}
      alt="sticker"
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: 70,
        height: 70,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      draggable={false}
    />
  );
};

export default DraggablePhoto;

