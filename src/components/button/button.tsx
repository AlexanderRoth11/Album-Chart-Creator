import React from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
  appearance?: "default" | "delete" | "cancel";
  download?: boolean;
  small?: boolean;
  disabled?: boolean;
};

const Button = ({ text, onClick, download = false, small = false, disabled = false, appearance = "default" }: ButtonProps) => {
  const type = {
    default: "bg-[#36668d] enabled:hover:bg-blue",
    delete: "bg-[#DC143C] hover:bg-[#B22222]",
    cancel: "border-[#555555] bg-[#1e1e1e] hover:bg-gray border-[1.5px] border-solid box-border h-8",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center justify-center rounded p-1 ${type[appearance]} ${disabled ? "opacity-50" : ""}`}
    >
      <span className={small ? "text-sm" : ""}>{text}</span>
      {download && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      )}
    </button>
  );
};

export default Button;
