import { create } from "zustand";
import { UploadState, IngestionMetrics } from "../types";

interface UploadActions {
  uploadFile: (file: File) => Promise<void>;
  reset: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const useUpload = create<UploadState & UploadActions>((set) => ({
  status: "idle",
  progress: 0,
  error: null,
  metrics: null,

  reset: () => set({ status: "idle", progress: 0, error: null, metrics: null }),

  uploadFile: async (file: File) => {
    set({ status: "uploading", progress: 0, error: null, metrics: null });

    const formData = new FormData();
    formData.append("file", file);

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", `${API_URL}/api/upload`, true);

      // Track progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          set({ progress: percentage });
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const responseData: IngestionMetrics = JSON.parse(xhr.responseText);
            set({
              status: "success",
              progress: 100,
              metrics: responseData,
            });
            resolve();
          } catch {
            const errMsg = "Failed to parse upload response.";
            set({ status: "error", error: errMsg });
            reject(new Error(errMsg));
          }
        } else {
          try {
            const errResponse = JSON.parse(xhr.responseText);
            const errMsg = errResponse.message || `Upload failed with status ${xhr.status}`;
            set({ status: "error", error: errMsg });
            reject(new Error(errMsg));
          } catch {
            const errMsg = `Upload failed with status ${xhr.status}`;
            set({ status: "error", error: errMsg });
            reject(new Error(errMsg));
          }
        }
      };

      xhr.onerror = () => {
        const errMsg = "Network error occurred during upload.";
        set({ status: "error", error: errMsg });
        reject(new Error(errMsg));
      };

      xhr.send(formData);
    });
  },
}));
