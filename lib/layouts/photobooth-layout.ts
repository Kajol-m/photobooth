// /common/layouts/Layouts.ts
import { LayoutOption } from "@/store/usePhotoboothStore";

export type LayoutMetadata = LayoutOption & {
  imgSrc: string;
  sizeLabel: string;
  posesLabel: string;
  height?: string;
};

// Clean, single source of truth for layouts
export const layouts: LayoutMetadata[] = [
  {
    id: "layout1-Landscape",
    name: "Layout 1 Landscape",
    slots: 1,
    aspectRatio: 3 / 2,
    imgSrc: "/assets/photobooth-layout1-landscape.png",
    sizeLabel: "Size 3 × 2",
    posesLabel: "(1 pose)",
    height: "200px",
  },
  {
    id: "layout2-Portrait",
    name: "Layout 2 Portrait",
    slots: 2,
    aspectRatio: 4 / 5,
    imgSrc: "/assets/photobooth-layout2-portrait.png",
    sizeLabel: "Size 4 × 5",
    posesLabel: "(2 poses)",
    height: "200px",
  },
  {
    id: "layout3-Square",
    name: "Layout 3 Square",
    slots: 3,
    aspectRatio: 1,
    imgSrc: "/assets/photobooth-layout3-landscape.png",
    sizeLabel: "Size 1 × 1",
    posesLabel: "(3 poses)",
    height: "200px",
  },
  {
    id: "layout1-Portrait",
    name: "Layout 1 Portrait",
    slots: 1,
    aspectRatio: 4 / 5,
    imgSrc: "/assets/photobooth-layout1-portrait.png",
    sizeLabel: "Size 4 × 5",
    posesLabel: "(1 pose)",
    height: "400px",
  },
  {
    id: "layout2-Landscape",
    name: "Layout 2 Landscape",
    slots: 2,
    aspectRatio: 3 / 2,
    imgSrc: "/assets/photobooth-layout2-landscape.png",
    sizeLabel: "Size 3 × 2",
    posesLabel: "(2 poses)",
    height: "400px",
  },
  {
    id: "layout3-Landscape",
    name: "Layout 3 Landscape",
    slots: 3,
    aspectRatio: 3 / 2,
    imgSrc: "/assets/photobooth-layout3-portrait.png",
    sizeLabel: "Size 3 × 2",
    posesLabel: "(3 poses)",
    height: "400px",
  },
  {
    id: "layout4-Square",
    name: "Layout 4 Square",
    slots: 4,
    aspectRatio: 1,
    imgSrc: "/assets/photobooth-layout4.png",
    sizeLabel: "Size 1 × 1",
    posesLabel: "(4 poses)",
    height: "400px",
  },
  {
    id: "layout4-Landscape",
    name: "Layout 4 Landscape",
    slots: 4,
    aspectRatio: 3 / 2,
    imgSrc: "/assets/photobooth-layout4-2.png",
    sizeLabel: "Size 3 × 2",
    posesLabel: "(4 poses)",
    height: "400px",
  },
];
