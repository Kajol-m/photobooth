// src/lib/layouts/layout.ts

export type LayoutConfig = {
  id: string;
  label: string;
  /** Tailwind classes for the GRID container (rows/cols) */
  gridClass: string;
  /** How many photos to take */
  photoCount: number;
  /** The Aspect Ratio of the CAMERA (Width / Height). 
   * 0.8 = 4:5 (Portrait)
   * 1.5 = 3:2 (Landscape)
   * 1.0 = Square 
   */
  cameraRatio: number;
  /** Optional: Force specific aspect ratio on the slots themselves via CSS */
  slotClass?: string;
  width?: number; // Optional fixed width for preview purposes
  height?: number; // Optional fixed height for preview purposes    
};

export const LAYOUTS: LayoutConfig[] = [
  // 1. Single Portrait (4:5)
  {
    id: "single-portrait",
    label: "Single (4:5)",
    gridClass: "grid-cols-1 grid-rows-1",
    photoCount: 1,
    cameraRatio: 0.8, // 4:5
    slotClass: "aspect-[4/5]",
    width: 200,
    height: 250
  },
  // 2. Single Landscape (3:2)
  {
    id: "single-landscape",
    label: "Single (3:2)",
    gridClass: "grid-cols-1 grid-rows-1",
    photoCount: 1,
    cameraRatio: 1.5, // 3:2
    slotClass: "aspect-[3/2]",
    width: 250,
    height: 166
  },
  // 3. Two Vertical (Strip of 2, Landscape photos)
  {
    id: "strip-2-vertical",
    label: "2-Photo Strip",
    gridClass: "grid-cols-1 grid-rows-2 gap-1.5",
    photoCount: 2,
    cameraRatio: 1.5, // 3:2 photos
    slotClass: "aspect-[3/2]",
    width: 200,
    height: 400
  },
  // 4. Two Horizontal (Side-by-side of 2, Portrait photos)
  {
    id: "strip-2-horizontal",
    label: "2-Photo Wide",
    gridClass: "grid-cols-2 grid-rows-1 gap-1.5",
    photoCount: 2,
    cameraRatio: 0.8, // 4:5 photos
    slotClass: "aspect-[4/5]",
    width: 400,
    height: 300
  },
  // 5. Three Horizontal (Square)
  {
    id: "strip-3-horizontal",
    label: "3-Photo Wide",
    gridClass: "grid-cols-3 grid-rows-1 gap-1.5",
    photoCount: 3,
    cameraRatio: 1, // Square
    slotClass: "aspect-square",
    width: 600,
    height: 200
  },
  // 6. Three Vertical (3:2 photos)
  {
    id: "strip-3-vertical",
    label: "3-Photo Strip",
    gridClass: "grid-cols-1 grid-rows-3 gap-1.5",
    photoCount: 3,
    cameraRatio: 1.5, // 3:2 photos
    slotClass: "aspect-[3/2]",
    width: 200,
    height: 600
  },
  // 7. Four Grid (Square)
  {
    id: "grid-2x2-square",
    label: "2x2 Square",
    gridClass: "grid-cols-2 grid-rows-2 gap-1.5",
    photoCount: 4,
    cameraRatio: 1, // Square
    slotClass: "aspect-square",
    width: 400,
    height:400
  },
  // 8. Four Grid (3:2 Landscape)
  {
    id: "grid-2x2-landscape",
    label: "2x2 Landscape",
    gridClass: "grid-cols-1 grid-rows-4 gap-1.5",
    photoCount: 4,
    cameraRatio: 1.5, // 3:2
    slotClass: "aspect-[3/2]",
    width: 200,
    height: 650

  },
];