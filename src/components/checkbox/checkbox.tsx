import React from "react";
import ".//checkbox.css";

type CheckboxProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: (country: string, checked: boolean) => void;
};

const Checkbox = ({ name, label, checked, onChange }: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" id={name} checked={checked} onChange={(e) => onChange(name, e.target.checked)} />
      <label className="cursor-pointer pl-3" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
