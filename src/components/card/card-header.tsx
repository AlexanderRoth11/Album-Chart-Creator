"use client";

import React, { useState } from "react";
import Modal from "../modal/modal";
import Button from "../button/button";
import { useAppContext } from "@/context/app-context";
import { AlbumType } from "@/types/enums";
import InfoTooltip, { TooltipPosition } from "../tooltip/info-tooltip";

type CardHeaderProps = {
  text: string;
  type: AlbumType;
};

enum TooltipMessage {
  largeAlbums = "You can add up to 4 <b>legendary</b> albums in this section. Only the very best belong here—choose wisely!",
  mediumAlbums = "You can add up to 30 <b>masterwork</b> albums in this section. Which ones will you choose?",
  smallAlbums = "You can add up to 66 <b>epic</b> albums in this section. Make sure to pick the best from many!",
}

const CardHeader = ({ text, type }: CardHeaderProps) => {
  const { dispatch } = useAppContext();
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteSection = () => {
    dispatch({ type: "REPLACE_ALBUMS", key: type, payload: [] });
    closeModal();
  };

  return (
    <>
      <div className="flex items-center pt-2 max-sm:flex-row-reverse max-sm:justify-between">
        <button
          aria-label="reset"
          className="mr-3"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
        <div className="flex items-center">
          <span className="mr-1">{text}</span>
          <InfoTooltip position={TooltipPosition.RIGTH} message={TooltipMessage[type]} />
        </div>
      </div>

      {showModal && (
        <Modal title={"Reset Section"} show={showModal} closeModal={closeModal}>
          <div className="mt-10">
            <p>
              Are you sure you want to reset the <b>{text}</b> section?
            </p>
            <p className="mt-1">This will delete all entries in this section.</p>
          </div>
          <div className="mt-10 flex justify-center gap-4 sm:justify-end">
            <div className="min-w-28">
              <Button text={"Cancel"} onClick={closeModal} appearance="cancel" />
            </div>
            <div className="min-w-28">
              <Button text={"Delete"} onClick={deleteSection} appearance="delete" />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CardHeader;
