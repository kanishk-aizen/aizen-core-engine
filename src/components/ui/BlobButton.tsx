import React from "react";
import { cn } from "@/lib/utils";

interface BlobButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const BlobButton = ({
  children,
  className,
  ...props
}: BlobButtonProps) => {
  return (
    <button className={cn("blob-btn", className)} {...props}>
      {children}
      <span className="blob-btn__inner">
        <span className="blob-btn__blobs">
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
        </span>
      </span>
    </button>
  );
};

export const GooeyFilter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
    <defs>
      <filter id="goo">
        <feGaussianBlur
          in="SourceGraphic"
          result="blur"
          stdDeviation="10"
        ></feGaussianBlur>
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
          result="goo"
        ></feColorMatrix>
        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
      </filter>
    </defs>
  </svg>
);
