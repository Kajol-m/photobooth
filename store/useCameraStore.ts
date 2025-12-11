import { create } from "zustand";

interface CameraStore {
  stream: MediaStream | null;
  setStream: (stream: MediaStream | null) => void;
  stopStream: () => void;
}

export const useCameraStore = create<CameraStore>((set, get) => ({
  stream: null,
  setStream: (stream) => {
    // Stop any existing stream first before replacing it
    const current = get().stream;
    if (current && current.id !== stream?.id) {
      current.getTracks().forEach((track) => track.stop());
    }
    set({ stream });
  },
  stopStream: () => {
    const currentStream = get().stream;
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
      set({ stream: null });
      console.log("Global camera stream stopped successfully");
    } else {
      console.log("No global stream to stop");
    }
  },
}));
