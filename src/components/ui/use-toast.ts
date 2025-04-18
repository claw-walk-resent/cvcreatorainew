
import * as React from "react";
import { useToast as useToastHook, toast as toastFunction } from "@/hooks/use-toast";

// Re-export the hooks with safety checks
export const useToast = () => {
  // Create a safe version of the hook
  try {
    return useToastHook();
  } catch (e) {
    console.warn("Toast context not available, using fallback");
    return {
      toast: () => {
        console.log("Toast attempted but provider not available");
        return { id: "fallback", dismiss: () => {}, update: () => {} };
      },
      dismiss: () => {},
      toasts: []
    };
  }
};

// Safe version of toast function
export const toast = (props: any) => {
  try {
    return toastFunction(props);
  } catch (e) {
    console.warn("Toast function failed, using fallback", e);
    return { id: "fallback", dismiss: () => {}, update: () => {} };
  }
};
