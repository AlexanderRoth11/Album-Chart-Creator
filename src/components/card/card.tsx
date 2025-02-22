"use client";

import "../../uitls/css-utils.css";
import { Album } from "@/types/components";
import { AlbumSize } from "@/types/enums";
import CardButtons from "./card-buttons";
import { useState } from "react";

type Card = {
  album: Album;
  size: `${AlbumSize}`;
  presentation?: boolean;
};

const sizeClasses = {
  large: "h-[350px] w-[259px] py-3",
  medium: "h-[258px] w-[177px] py-2.5",
  small: "h-[192px] w-[126px] py-2",
};

const albumNameSizes = {
  large: "text-xl max-h-14",
  medium: "text-base max-h-12",
  small: "text-xs max-h-8",
};

const bandNameSizes = {
  large: "text-sm",
  medium: "text-xs",
  small: "text-[0.625rem]",
};

const imagePadding = {
  large: "px-3 h-60",
  medium: "px-2.5 h-40",
  small: "px-2 h-28",
};

const Card = ({ album, size, presentation = false }: Card) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  return (
    <div className="group relative">
      {!presentation && <CardButtons size={size} album={album} showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} />}
      <div
        className={`flex flex-col rounded-lg bg-black bg-opacity-50 bg-blend-multiply ${sizeClasses[size]}`}
        style={{ background: `${album.gradient}` }}
      >
        <div className={`relative ${imagePadding[size]}`}>
          {album.img && (
            <img
              src={album.img}
              alt={album.album}
              onClick={() => {
                if (!presentation) setShowInfoModal(true);
              }}
              className={`mx-auto h-full object-contain ${!presentation ? "cursor-pointer" : ""}`}
            />
          )}
        </div>
        <div className="my-2 flex h-full flex-col px-1 text-center">
          <div className={`multiline-truncate ${albumNameSizes[size]}`}>{album.album}</div>
          <div className={`singleline-truncate text-[#ffffffb3] ${bandNameSizes[size]}`}>{album.band}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
