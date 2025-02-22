import React, { ReactNode, useState } from "react";

type AccordionProps = {
  headline: string;
  children: ReactNode;
};

const Accordion = ({ headline, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`grid border-b-2 border-solid border-b-light-gray pl-2 pr-4 pt-2 transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[min-content_1fr] pb-2 pr-3" : "grid-rows-[min-content_0fr]"}`}
    >
      <button onClick={toggleAccordion} className="flex cursor-pointer justify-between">
        <div>{headline}</div>
        <div className={`transform transition-transform duration-300 ${isOpen ? "-rotate-180" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      <div className="overflow-hidden pt-2">{children}</div>
    </div>
  );
};

export default Accordion;
