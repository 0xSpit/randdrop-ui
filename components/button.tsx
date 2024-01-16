import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
}

export const Button = ({
  text,
  disabled = false,
  isLoading = false,
  ...props
}: ButtonProps) => {
  console.log("isLoading", isLoading);
  return (
    <button
      type="button"
      className={twMerge(
        "w-full rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 z-10 mb-4",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded-full animate-spin mr-2"></div>
          <span>Chill fren, we are checking...</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};
