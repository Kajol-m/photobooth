// // /store/usePhotoboothStore.ts
// import { create } from "zustand";

// export type Photo = {
//   id: string;
//   dataUrl: string; // base64
//   width?: number;
//   height?: number;
// };

// export type PhotoTraits = {
//   backgroundColor: string;
//   textOption: string;
//   dateOption: boolean;
//   timeOption: boolean;
//   textColor: "white" | "black";
// };

// export type LayoutOption = {
//   id: string;
//   name: string;
//   slots: number;
//   aspectRatio: number; // eg 2:3 -> 2/3
// };

// // type Decoration = {
// //   id: string;
// //   type: "sticker" | "text";
// //   x: number;
// //   y: number;
// //   scale: number;
// //   rotation: number;
// //   props: any;
// // };

// type StickerProps = {
//   src: string;
//   width?: number;
//   height?: number;
// };

// type TextProps = {
//   text: string;
//   color?: string;
//   fontSize?: number;
//   fontFamily?: string;
// };

// export type Decoration =
//   | {
//       id: string;
//       type: "sticker";
//       x: number;
//       y: number;
//       scale: number;
//       rotation: number;
//       props: StickerProps;
//     }
//   | {
//       id: string;
//       type: "text";
//       x: number;
//       y: number;
//       scale: number;
//       rotation: number;
//       props: TextProps;
//     };


// type Store = {
//   layout?: LayoutOption;
//   filter?: string; // 'none' or 'vintage', 'bw', etc.
//   photos: Photo[];
//   decorations: Decoration[];
//   photoTraits: PhotoTraits;
//   setLayout: (l: LayoutOption) => void;
//   setFilter: (f: string) => void;
//   addPhoto: (p: Photo) => void;
//   replacePhotoAt: (index: number, p: Photo) => void;
//   clearPhotos: () => void;
//   addDecoration: (d: Decoration) => void;
//   updateDecoration: (id: string, patch: Partial<Decoration>) => void;
//   removeDecoration: (id: string) => void;
//   setPhotoTraits: (traits: Partial<PhotoTraits>) => void;
// };
// export const usePhotoboothStore = create<Store>((set, get) => ({
//   layout: undefined,
//   filter: "none",
//   photos: [],
//   decorations: [],
//   photoTraits: {
//     backgroundColor: "#F8D7DA",
//     textOption: "photobooth",
//     dateOption: true,
//     timeOption: true,
//     textColor: "black"
//   },
//   setLayout: (l) => set({ layout: l, photos: [], decorations: [] }),
//   setFilter: (f) => set({ filter: f }),
//   addPhoto: (p) => set({ photos: [...get().photos, p] }),
//   replacePhotoAt: (i, p) =>
//     set({ photos: get().photos.map((ph, idx) => (idx === i ? p : ph)) }),
//   clearPhotos: () => set({ photos: [] }),
//   addDecoration: (d) => set({ decorations: [...get().decorations, d] }),
//   // 
  
//   removeDecoration: (id) =>
//     set({ decorations: get().decorations.filter((dc) => dc.id !== id) }),
//   setPhotoTraits: (traits: Partial<PhotoTraits>) =>
//   set({ photoTraits: { ...get().photoTraits, ...traits } }),
// }));



// /store/usePhotoboothStore.ts
import { create } from "zustand";

/* ----------------------------------------
   📸 Photo and Layout Types
---------------------------------------- */
export type Photo = {
  id: string;
  dataUrl: string; // base64
  width?: number;
  height?: number;
};

export type PhotoTraits = {
  backgroundColor: string;
  textOption: string;
  dateOption: boolean;
  timeOption: boolean;
  textColor: "white" | "black";
};

export type LayoutOption = {
  id: string;
  name: string;
  slots: number;
  aspectRatio: number; // e.g. 2:3 -> 2/3
};

/* ----------------------------------------
   🎨 Decoration Types (Strongly Typed)
---------------------------------------- */
export type StickerProps = {
  src: string;
  width?: number;
  height?: number;
};

export type TextProps = {
  text: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
};

export type Decoration =
  | {
      id: string;
      type: "sticker";
      x: number;
      y: number;
      scale: number;
      rotation: number;
      props: StickerProps;
    }
  | {
      id: string;
      type: "text";
      x: number;
      y: number;
      scale: number;
      rotation: number;
      props: TextProps;
    };

/* ----------------------------------------
   🏪 Store Type
---------------------------------------- */
type Store = {
  layout?: LayoutOption;
  filter: string; // e.g., 'none', 'vintage', 'bw', etc.
  photos: Photo[];
  decorations: Decoration[];
  photoTraits: PhotoTraits;

  // actions
  setLayout: (layout: LayoutOption) => void;
  setFilter: (filter: string) => void;
  addPhoto: (photo: Photo) => void;
  replacePhotoAt: (index: number, photo: Photo) => void;
  clearPhotos: () => void;
  addDecoration: (decoration: Decoration) => void;
  updateDecoration: <T extends Decoration["type"]>(
    id: string,
    patch: Partial<Extract<Decoration, { type: T }>>
  ) => void;
  removeDecoration: (id: string) => void;
  setPhotoTraits: (traits: Partial<PhotoTraits>) => void;
};

/* ----------------------------------------
   🧠 Zustand Store Implementation
---------------------------------------- */
export const usePhotoboothStore = create<Store>((set, get) => ({
  layout: undefined,
  filter: "none",
  photos: [],
  decorations: [],
  photoTraits: {
    backgroundColor: "#F8D7DA",
    textOption: "photobooth",
    dateOption: true,
    timeOption: true,
    textColor: "black",
  },

  setLayout: (layout) => set({ layout, photos: [], decorations: [] }),
  setFilter: (filter) => set({ filter }),
  addPhoto: (photo) => set({ photos: [...get().photos, photo] }),
  replacePhotoAt: (index, photo) =>
    set({
      photos: get().photos.map((p, i) => (i === index ? photo : p)),
    }),
  clearPhotos: () => set({ photos: [] }),
  addDecoration: (decoration) =>
    set({ decorations: [...get().decorations, decoration] }),
  updateDecoration: (id, patch) =>
    set({
      decorations: get().decorations.map((d) =>
        d.id === id ? { ...d, ...patch } : d
      ),
    }),
  removeDecoration: (id) =>
    set({ decorations: get().decorations.filter((d) => d.id !== id) }),
  setPhotoTraits: (traits) =>
    set({ photoTraits: { ...get().photoTraits, ...traits } }),
}));
