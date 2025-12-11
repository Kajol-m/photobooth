// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import LayoutCard from "@/common/layouts/LayoutCard"; // We will update this next
// import { usePhotoboothStore } from "@/store/usePhotoboothStore";
// import { useCameraStore } from "@/store/useCameraStore";
// import { LAYOUTS } from "@/lib/layouts/layout"; // 👈 Import from new constants

// const SelectLayout = () => {
//   const router = useRouter();
  
//   // 👈 Use the new store action
//   const setSelectedLayoutId = usePhotoboothStore((state) => state.setSelectedLayoutId);
//   const currentLayoutId = usePhotoboothStore((state) => state.selectedLayoutId);

//   const handleLayoutSelect = (layoutId: string) => {
//     // 👈 We only need to pass the ID now
//     setSelectedLayoutId(layoutId);
//     router.push("/select-filters");
//   };

//   const { stopStream } = useCameraStore();
//   useEffect(() => {
//     stopStream();
//   }, [stopStream]);

//   // Split layouts: First 3 in row 1, the rest in row 2
//   const row1Layouts = LAYOUTS.slice(0, 3);
//   const row2Layouts = LAYOUTS.slice(3);

//   return (
//     <div className="relative bg-[#FFDBE9] px-8 pt-6 pb-[100px] min-h-screen">
//       {/* Header */}
//       <header className="flex flex-col justify-center items-center text-center h-32">
//         <p className="text-3xl tracking-wide font-semibold">Choose Layout</p>
//         <p className="text-sm text-gray-600">
//           The layouts are visual representations and not the actual size.
//         </p>
//       </header>

//       {/* Layout Rows */}
//       {[row1Layouts, row2Layouts].map((row, idx) => (
//         <div key={idx} className="flex justify-center gap-8 mb-8 flex-wrap">
//           {row.map((layout) => (
//             <LayoutCard
//               key={layout.id}
//               layout={layout} // 👈 Pass the whole config object
//               isSelected={currentLayoutId === layout.id}
//               onSelect={() => handleLayoutSelect(layout.id)}
//             />
//           ))}
//         </div>
//       ))}

//       {/* Footer */}
//       <footer className="absolute bottom-0 right-0 p-4 text-xs text-gray-700">
//         Visual representations created with CSS Grid.
//       </footer>
//     </div>
//   );
// };

// export default SelectLayout;

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LayoutCard from "@/common/layouts/LayoutCard"; 
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { useCameraStore } from "@/store/useCameraStore";
import { LAYOUTS } from "@/lib/layouts/layout"; // 👈 Import from your new constants

const SelectLayout = () => {
  const router = useRouter();
  
  // 1. Store Hooks
  const setSelectedLayoutId = usePhotoboothStore((state) => state.setSelectedLayoutId);
  const currentLayoutId = usePhotoboothStore((state) => state.selectedLayoutId);
  const { stopStream } = useCameraStore();

  // 2. Selection Handler
  const handleLayoutSelect = (layoutId: string) => {
    setSelectedLayoutId(layoutId); // 👈 Store the ID
    router.push("/select-filters"); // or "/select-filters" depending on your flow
  };

  // 3. Cleanup Camera on Mount
  useEffect(() => {
    stopStream();
  }, [stopStream]);

  // Optional: Group layouts if you have many (e.g., first 3, then the rest)
  const row1 = LAYOUTS.slice(0, 3);
  const row2 = LAYOUTS.slice(3);

  return (
    <div className="relative bg-[#F5F5DA] px-8 pt-10 pb-[100px] min-h-screen flex flex-col items-center">
      
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wide mb-2">Choose Your Layout</h1>
        <p className="text-gray-600">Select a grid to start your session</p>
      </header>

      {/* Grid Container */}
      <div className="w-full max-w-6xl flex flex-col gap-10 items-center">
        
        {/* Row 1 */}
        <div className="flex flex-wrap justify-center gap-8">
          {row1.map((layout) => (
            <LayoutCard
              key={layout.id}
              layout={layout}
              isSelected={currentLayoutId === layout.id}
              onSelect={() => handleLayoutSelect(layout.id)}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap justify-center gap-8">
          {row2.map((layout) => (
            <LayoutCard
              key={layout.id}
              layout={layout}
              isSelected={currentLayoutId === layout.id}
              onSelect={() => handleLayoutSelect(layout.id)}
            />
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 right-4 text-xs text-gray-500 bg-white/50 px-3 py-1 rounded-full">
        Previews generated via CSS Grid
      </footer>
    </div>
  );
};

export default SelectLayout;