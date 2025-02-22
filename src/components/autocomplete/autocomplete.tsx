import React, { useRef, useState } from "react";
import ".//autocomplete.css";

type AutocompleteProps = {
  label: string;
  value: string;
  onChange: (input: string) => void;
  options: string[];
  allowAddOption?: boolean;
  error: boolean;
};

const Autocomplete = ({ label, value, onChange, options, error, allowAddOption = false }: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    onChange(e.target.value);
  };

  const toggleList = () => {
    focusInput();
    setIsOpen(!isOpen);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onOptionClick = (value: string) => {
    setIsOpen(false);
    onChange(value);
  };

  const checkOption = () => {
    if (!allowAddOption && !options.includes(value)) {
      onChange("");
    }
  };

  const filteredOptions = options.filter((option) => {
    if (value) {
      return option.toLowerCase().startsWith(value.toLowerCase());
    }
    return true;
  });

  return (
    <div className="relative">
      <div
        tabIndex={0}
        onClick={focusInput}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setIsOpen(false);
          checkOption();
        }}
        className={`autocomplete-wrapper ${error ? "error" : ""} relative flex cursor-text justify-between`}
      >
        <input type="text" id={label} name={label} value={value} onChange={(e) => onInputChange(e)} autoComplete="off" ref={inputRef} />
        <label className={`label ${error ? "label-error" : ""} ${value ? "active" : ""}`} htmlFor={label}>
          {label}
        </label>
        <button onClick={toggleList} className="h-fit cursor-pointer self-center" onMouseDown={(e) => e.preventDefault()}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={error ? "#d6453d" : "currentColor"}
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={error ? "#d6453d" : "currentColor"}
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </button>
      </div>
      {isOpen && (
        <ul
          className="absolute left-0 top-full z-50 max-h-64 w-[225px] overflow-y-auto rounded border-[0.5px] border-solid border-black bg-gray py-2"
          onMouseDown={(e) => e.preventDefault()}
        >
          {filteredOptions.map((option) => (
            <li key={option} onClick={() => onOptionClick(option)} className="cursor-pointer px-4 py-1.5 hover:bg-[#555555]">
              <span>{option}</span>
            </li>
          ))}

          {!allowAddOption && filteredOptions.length === 0 && <li className="px-4 py-1.5 text-gray-500">No option availalbe</li>}

          {allowAddOption && !filteredOptions.some((option) => option.toLowerCase() === value.toLowerCase()) && (
            <li className="px-4 py-1.5 text-gray-500">Submit to add option</li>
          )}
        </ul>
      )}
    </div>
  );
};
export default Autocomplete;
