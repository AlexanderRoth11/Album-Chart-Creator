"use client";

import React, { useState } from "react";
import Modal from "../modal/modal";
import Input from "../input/input";
import { AlbumSize, AlbumType, countries } from "@/types/enums";
import Autocomplete from "../autocomplete/autocomplete";
import Button from "../button/button";
import Card from "../card/card";
import { useAppContext } from "@/context/app-context";
import { getImageGradient } from "@/uitls/image";
import { Album } from "@/types/components";
import InfoTooltip from "../tooltip/info-tooltip";

type AlbumEditorProps = {
  size: `${AlbumSize}`;
  showModal: boolean;
  setModal: (value: boolean) => void;
  updateAlbum?: Album;
  info?: boolean;
};

const sectionName = {
  large: "legendary",
  medium: "masterwork",
  small: "epic",
};

const AlbumEditor = ({ size, showModal, setModal, updateAlbum, info }: AlbumEditorProps) => {
  const { state, dispatch } = useAppContext();
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [band, setBand] = useState<string>(updateAlbum?.band ?? "");
  const [album, setAlbum] = useState<string>(updateAlbum?.album ?? "");
  const [image, setImage] = useState<string>(updateAlbum?.img ?? "");
  const [validImage, setValidImage] = useState<string>(updateAlbum?.img ?? "");
  const [year, setYear] = useState<string>(updateAlbum?.releaseYear?.toString() ?? "");
  const [country, setCountry] = useState<string>(updateAlbum?.country ?? "");
  const [genre, setGenre] = useState<string>(updateAlbum?.genre ?? "");
  const [gradient, setGradient] = useState<string>(updateAlbum?.gradient ?? "");

  const closeModal = () => {
    setModal(false);
    setSubmitClicked(false);
    setBand("");
    setAlbum("");
    setYear("");
    setCountry("");
    setImage("");
    setValidImage("");
    setGenre("");
    setGradient("");
  };

  const onImageUrl = async (url: string, valid: boolean) => {
    setImage(url);
    if (valid && url) {
      setGradient(await getImageGradient(url));
      setValidImage(url);
    } else {
      setGradient("");
      setValidImage("");
    }
  };

  const generateUniqueId = () => {
    return `${Date.now()}${Math.random().toString(36).substring(2, 9)}`;
  };

  const submitForm = () => {
    setSubmitClicked(true);

    if (band && album && year && country && validImage && genre) {
      dispatch({ type: "ADD_GENRE_OPTIONS", payload: genre });

      if (!updateAlbum) {
        dispatch({
          type: "UPDATE_ALBUMS",
          key: AlbumType[size],
          payload: {
            action: "ADD",
            value: {
              id: generateUniqueId(),
              img: validImage,
              band: band,
              country: country,
              album: album,
              genre: genre,
              releaseYear: Number(year),
              gradient: gradient,
            },
          },
        });
      } else {
        dispatch({
          type: "UPDATE_ALBUMS",
          key: AlbumType[size],
          payload: {
            action: "UPDATE",
            value: {
              id: updateAlbum.id,
              img: validImage,
              band: band,
              country: country,
              album: album,
              genre: genre,
              releaseYear: Number(year),
              gradient: gradient,
            },
          },
        });
      }

      closeModal();
    }
  };
  return (
    showModal && (
      <Modal title={!updateAlbum ? `Add ${sectionName[size]} album` : !info ? "Update album" : "Album info"} show={showModal} closeModal={closeModal}>
        <div className="flex flex-col max-sm:justify-center max-sm:gap-4 sm:flex-row">
          <div className={`flex flex-col gap-4 sm:w-1/2 ${info ? "mt-3 text-center text-lg" : "max-sm:items-center"}`}>
            {!info ? (
              <>
                <Input type="text" label={"Album"} value={album} onChange={(e) => setAlbum(e.target.value)} error={submitClicked && !album} />
                <Input type="text" label={"Band"} value={band} onChange={(e) => setBand(e.target.value)} error={submitClicked && !band} />
                <div className="items-center gap-3 sm:flex">
                  <span className="order-2 flex justify-center max-sm:mb-4 max-sm:w-full">
                    <InfoTooltip
                      message={
                        "For a gradient background to appear, please use images from  sources such as Spotify, Wikipedia, or Soundcloud. Other images may not produce a background."
                      }
                    />
                  </span>
                  <Input
                    type="url"
                    label={"Image URL"}
                    value={image}
                    onChange={(e) => onImageUrl(e.target.value, e.target.validity.valid)}
                    error={submitClicked && !image}
                  />
                </div>

                <Input type="number" label={"Year"} value={year} onChange={(e) => setYear(e.target.value)} error={submitClicked && !year} />
                <Autocomplete label={"Country"} value={country} options={countries} onChange={setCountry} error={submitClicked && !country} />
                <Autocomplete
                  label={"Genre"}
                  value={genre}
                  options={[...state.genreOptions].sort()}
                  onChange={setGenre}
                  allowAddOption
                  error={submitClicked && !genre}
                />
              </>
            ) : (
              <>
                <div className="bg-dark">
                  <span className="mr-1">📀</span>
                  {album}
                </div>
                <div className="bg-dark">
                  <span className="mr-1">🎸</span>
                  {band}
                </div>
                <div className="bg-dark">
                  <span className="mr-1">📅</span>
                  {year}
                </div>
                <div className="bg-dark">
                  <span className="mr-1">🌎</span>
                  {country}
                </div>
                <div className="bg-dark">
                  <span className="mr-1">🎶</span>
                  {genre}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-center justify-between sm:w-1/2">
            <div className="w-[259px] max-sm:hidden">
              <Card
                presentation
                size="large"
                album={{
                  id: "showcase",
                  country: country,
                  genre: genre,
                  releaseYear: Number(year),
                  album: album,
                  band: band,
                  img: validImage,
                  gradient: gradient,
                }}
              />
            </div>
            <div className="mt-[34px] min-w-40">
              {!info ? (
                <Button onClick={submitForm} text={updateAlbum ? "Update" : "Submit"} />
              ) : (
                <Button onClick={closeModal} appearance="cancel" text="Close" />
              )}
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default AlbumEditor;
