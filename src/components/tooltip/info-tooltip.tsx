"use client";

import React, { useState } from "react";

type InfoTooltipProps = {
  message: string;
  position?: TooltipPosition;
};

export enum TooltipPosition {
  TOP = "top",
  RIGTH = "right",
  BOTTOM = "bottom",
}

const boxClasses = {
  top: "bottom-full left-1/2 mb-2 w-72 -translate-x-1/2",
  right: "left-full top-1/2 ml-2 w-40 -translate-y-1/2 sm:w-52",
  bottom: "right-1/2 top-full mt-2 w-32 translate-x-1/2 sm:w-60",
};

const arrowClasses = {
  top: "bottom-full left-1/2 mb-1 -translate-x-1/2 rotate-45",
  right: "left-full top-1/2 ml-1 -translate-y-1/2 rotate-[135deg]",
  bottom: "right-1/2 top-full mt-1 translate-x-1/2 -rotate-[135deg]",
};

const InfoTooltip = ({ message, position = TooltipPosition.TOP }: InfoTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <button aria-label="info" className="relative" onMouseOver={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>

      {showTooltip && (
        <>
          <div
            className={`absolute z-50 cursor-text select-text rounded-md border border-solid border-[#555555] bg-dark px-1 py-2 text-xs ${boxClasses[position]}`}
            dangerouslySetInnerHTML={{ __html: message }}
          />
          <div className={`absolute z-50 transform border-b border-r border-solid border-[#555555] bg-dark p-1 ${arrowClasses[position]}`} />
        </>
      )}
    </button>
  );
};

export default InfoTooltip;
