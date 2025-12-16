import { create } from "zustand";

export type Photo = {
  id: string;
  dataUrl: string;
  width?: number;
  height?: number;
};

export type PhotoTraits = {
  backgroundColor: string;
  textOption: string;
  dateOption: boolean;
  timeOption: boolean;
  textColor: "white" | "black" | string;
};

export type LayoutOption = {
  id: string;
  name: string;
  slots: number;
  aspectRatio: number; // e.g. 2:3 -> 2/3
};

export type StickerProps = {
  src: string;
};

export type TextProps = {
  text: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
};

// We use a Discriminated Union here
export type Decoration =
  | {
      id: string;
      type: "sticker";
      transform: string;
      props: StickerProps;
    }
  | {
      id: string;
      type: "text";
      transform: string;
      props: TextProps;
    };

type Store = {
  selectedLayoutId: string;
  filter: string; // e.g., 'none', 'vintage', 'bw', etc.
  photos: Photo[];
  decorations: Decoration[];
  photoTraits: PhotoTraits;
  setSelectedLayoutId: (id: string) => void;
  setFilter: (filter: string) => void;
  addPhoto: (photo: Photo) => void;
  replacePhotoAt: (index: number, photo: Photo) => void;
  clearPhotos: () => void;
  addDecoration: (decoration: Decoration) => void;
  updateDecoration: (id: string, transform: string) => void;
  removeDecoration: (id: string) => void;
  setPhotoTraits: (traits: Partial<PhotoTraits>) => void;
};

export const usePhotoboothStore = create<Store>((set, get) => ({
  selectedLayoutId: "polaroid",
  filter: "none",
  photos: [],
  decorations: [],
  photoTraits: {
    backgroundColor: "#CA152A",
    textOption: "photobooth",
    dateOption: true,
    timeOption: true,
    textColor: "#F5F5DA",
  },

  setSelectedLayoutId: (id) =>
    set({ selectedLayoutId: id, photos: [], decorations: [] }),
  setFilter: (filter) => set({ filter }),
  addPhoto: (photo) => set({ photos: [...get().photos, photo] }),
  replacePhotoAt: (index, photo) =>
    set({
      photos: get().photos.map((p, i) => (i === index ? photo : p)),
    }),
  clearPhotos: () => set({ photos: [] }),
  addDecoration: (decoration) =>
    set({ decorations: [...get().decorations, decoration] }),
  updateDecoration: (id, transform) =>
    set({
      decorations: get().decorations.map((d) =>
        d.id === id ? { ...d, transform } : d
      ),
    }),
  removeDecoration: (id) =>
    set({ decorations: get().decorations.filter((d) => d.id !== id) }),
  setPhotoTraits: (traits) =>
    set({ photoTraits: { ...get().photoTraits, ...traits } }),
}));
