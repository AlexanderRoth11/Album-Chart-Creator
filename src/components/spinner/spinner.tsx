import React from "react";

type SpinnerProps = {
  small?: boolean;
};

const Spinner = ({ small = false }: SpinnerProps) => {
  return <div className={`animate-spin rounded-full border-white border-t-transparent ${!small ? "h-9 w-9 border-4" : "h-3 w-3 border-2"}`} />;
};

export default Spinner;
