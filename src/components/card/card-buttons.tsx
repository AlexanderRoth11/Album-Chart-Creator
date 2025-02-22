"use client";

import { useAppContext } from "@/context/app-context";
import { AlbumSize, AlbumType } from "@/types/enums";
import React, { useState } from "react";
import Button from "../button/button";
import Modal from "../modal/modal";
import { Album } from "@/types/components";
import AddAlbum from "../album/album-editor";

type CardButtonsProps = {
  size: `${AlbumSize}`;
  album: Album;
  showInfoModal: boolean;
  setShowInfoModal: (value: boolean) => void;
  onDeleteClick?: (country: string, checked: boolean) => void;
};

const iconSize = {
  large: "size-5",
  medium: "size-5",
  small: "size-4",
};

const CardButtons = ({ size, album, showInfoModal, setShowInfoModal }: CardButtonsProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const { dispatch } = useAppContext();

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  const deleteAlbum = () => {
    dispatch({ type: "UPDATE_ALBUMS", key: AlbumType[size], payload: { action: "REMOVE", value: album } });
    closeModal();
  };

  return (
    <>
      <div className="absolute z-30 flex w-full justify-center gap-2 rounded-t-lg bg-black/50 p-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          aria-label="edit"
          className="rounded-full bg-white p-1"
          onClick={() => {
            setShowUpdateModal(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#36668d" className={iconSize[size]}>
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
        </button>

        <button
          aria-label="delete"
          className="rounded-full bg-white p-1"
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#B22222" className={iconSize[size]}>
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          aria-label="delete"
          className="rounded-full bg-white p-1"
          onClick={() => {
            setShowInfoModal(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1e1e1e" className={iconSize[size]}>
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showDeleteModal && (
        <Modal title={"Delete Album"} show={showDeleteModal} closeModal={closeModal}>
          <div className="mt-10">
            <p>
              Are you sure you want to delete <b>{album.album}</b> by <b>{album.band}</b>?
            </p>
          </div>
          <div className="mt-10 flex justify-center gap-4 sm:justify-end">
            <div className="min-w-28">
              <Button text={"Cancel"} onClick={closeModal} appearance="cancel" />
            </div>
            <div className="min-w-28">
              <Button text={"Delete"} onClick={deleteAlbum} appearance="delete" />
            </div>
          </div>
        </Modal>
      )}

      {showUpdateModal && <AddAlbum showModal={showUpdateModal} setModal={setShowUpdateModal} size={size} updateAlbum={album} />}
      {showInfoModal && <AddAlbum showModal={showInfoModal} setModal={setShowInfoModal} size={size} updateAlbum={album} info={true} />}
    </>
  );
};

export default CardButtons;
