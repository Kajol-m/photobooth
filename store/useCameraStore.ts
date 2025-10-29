// import { create } from "zustand";

// interface CameraStore {
//   stream: MediaStream | null;
//   setStream: (stream: MediaStream | null) => void;
//   stopStream: () => void;
// }

// export const useCameraStore = create<CameraStore>((set, get) => ({
//   stream: null,
//   setStream: (stream) => {
//     // Stop any existing one before setting a new one
//     const currentStream = get().stream;
//     if (currentStream && currentStream !== stream) {
//       currentStream.getTracks().forEach((track) => track.stop());
//     }
//     set({ stream });
//   },
//   stopStream: () => {
//     const currentStream = get().stream;
//     if (currentStream) {
//       currentStream.getTracks().forEach((track) => track.stop());
//       // Explicitly clear video elements that might still reference it
//       document.querySelectorAll("video").forEach((video) => {
//         if (video.srcObject === currentStream) {
//           video.srcObject = null;
//         }
//       });
//       set({ stream: null });
//       console.log("📷 Global camera stream fully stopped and detached");
//     } else {
//       console.log("ℹ️ No active camera stream to stop");
//     }
//   },
// }));
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
      console.log("📷 Global camera stream stopped successfully");
    } else {
      console.log("⚠️ No global stream to stop");
    }
  },
}));
