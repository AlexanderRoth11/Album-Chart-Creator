import React from "react";
import ".//input.css";

type InputProps = {
  label: string;
  value: string | number;
  type: "text" | "number" | "url";
  onChange: (input: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
};

const Input = ({ label, value, type, error, onChange }: InputProps) => {
  return (
    <div className="input-wrapper relative">
      <input type={type} id={label} name={label} value={value} onChange={(e) => onChange(e)} autoComplete="off" required={error} />
      <label className={`label ${value ? "active" : ""}`} htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

export default Input;
