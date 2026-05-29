"use client";

import { CheckCircleIcon } from "@phosphor-icons/react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        bg-base-subtitle text-white
        px-4 py-3 rounded-md shadow-lg
        transition-all duration-300 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <CheckCircleIcon
        size={30}
        weight="fill"
        className="text-yellow shrink-0"
      />
      <span className="text-text-s">{message}</span>
    </div>
  );
}
