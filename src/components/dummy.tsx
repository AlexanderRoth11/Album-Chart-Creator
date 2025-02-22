import React from "react";

type DummyProps = {
  prop: string;
  onChange: (country: string, checked: boolean) => void;
};

const Dummy = ({ prop }: DummyProps) => {
  return <div></div>;
};

export default Dummy;
