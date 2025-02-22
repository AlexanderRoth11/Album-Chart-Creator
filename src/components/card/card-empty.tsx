"use client";

import { AlbumSize } from "@/types/enums";
import React, { useState } from "react";
import AlbumEditor from "../album/album-editor";

const sizeClasses = {
  large: "h-[350px] w-[259px] py-3",
  medium: "h-[258px] w-[177px] py-2.5",
  small: "h-[192px] w-[126px] py-2",
};

type CardEmpty = {
  size: `${AlbumSize}`;
};

const CardEmpty = ({ size }: CardEmpty) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div
        id={`add-album-${size}`}
        className={`flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed ${sizeClasses[size]}`}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed">+</div>
      </div>
      <AlbumEditor showModal={showModal} setModal={setShowModal} size={size} />
    </>
  );
};

export default CardEmpty;
