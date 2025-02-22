import React, { useEffect, useState } from "react";
import ".//slider.css";
import { useAppContext } from "@/context/app-context";

type SlidertProps = {
  range: number[];
};

const Slider = ({ range }: SlidertProps) => {
  const min = Math.min(...range);
  const max = Math.max(...range);
  const [from, setFrom] = useState(min);
  const [to, setTo] = useState(max);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const { from: filterFrom, to: filterTo } = state.filter.years;
    if (filterFrom !== null && filterTo !== null) {
      setFrom(filterFrom);
      setTo(filterTo);
    } else {
      setFrom(min);
      setTo(max);
    }
  }, [state.filter.years, range]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFrom(value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTo(value);
  };

  const handleRelease = () => {
    if ((from == min && to == max) || (from == max && to == min)) {
      dispatch({ type: "UPDATE_FILTER", key: "years", payload: { yearsValues: { from: null, to: null } } });
    } else {
      dispatch({ type: "UPDATE_FILTER", key: "years", payload: { yearsValues: { from: from, to: to } } });
    }
  };

  const fromVal = from <= to ? from : to;
  const toVal = from <= to ? to : from;
  const fillWidth = ((toVal - fromVal) / (max - min)) * 100;
  const fillPosition = ((fromVal - min) / (max - min)) * 100;

  return (
    <div>
      <div className="container">
        <input type="range" min={min} max={max} value={from} onChange={handleFromChange} onMouseUp={handleRelease} onTouchEnd={handleRelease} />
        <input type="range" min={min} max={max} value={to} onChange={handleToChange} onMouseUp={handleRelease} onTouchEnd={handleRelease} />
        <div className="slider-track" />
        <div className="slider-fill" style={{ width: `${fillWidth}%`, left: `${fillPosition}%` }} />
      </div>
      <div className="mt-2 text-center">
        {fromVal} - {toVal}
      </div>
    </div>
  );
};
export default Slider;
