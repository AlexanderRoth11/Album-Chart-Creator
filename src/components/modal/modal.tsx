import React, { ReactNode, useEffect, useRef, useState } from "react";

type ModalProps = {
  show: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
  disclaimer?: boolean;
};

const Modal = ({ show, closeModal, children, title, disclaimer = false }: ModalProps) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [mouseDownOnBackground, setMouseDownOnBackground] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setMouseDownOnBackground(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownOnBackground && e.target === e.currentTarget && !disclaimer) {
      closeModal();
    }
    setMouseDownOnBackground(false);
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "initial";
    };
  }, [show]);

  return (
    show && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <div
          ref={modalContentRef}
          className={`absolute left-1/2 ${!disclaimer ? "top-1/2 -translate-y-1/2" : "top-9 sm:top-56"} z-50 w-full max-w-2xl -translate-x-1/2 transform rounded-lg bg-gray p-4 shadow-lg`}
        >
          <div className="mb-4 flex justify-between text-xl">
            <h2 className="font-bold">{title}</h2>
            {!disclaimer && (
              <button
                className="text-gray-500"
                onClick={() => {
                  closeModal();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
