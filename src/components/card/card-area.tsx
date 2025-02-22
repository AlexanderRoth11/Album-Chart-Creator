"use client";

import React, { useEffect, useState } from "react";
import Card from "./card";
import { Album } from "@/types/components";
import CardEmpty from "./card-empty";
import { useAppContext } from "@/context/app-context";
import { AlbumSize, AlbumType } from "@/types/enums";
import { filterAlbums } from "@/uitls/filter";
import Spinner from "../spinner/spinner";

type CardAreaProps = {
  size: `${AlbumSize}`;
};

const gapClasses = {
  large: "gap-x-12",
  medium: "gap-x-6 ",
  small: " gap-x-6 ",
};

const maxSize = {
  large: 4,
  medium: 30,
  small: 66,
};

const CardArea = ({ size }: CardAreaProps) => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [isFilterSet, setIsFilterSet] = useState(false);
  const albumType: AlbumType = AlbumType[size];
  const albums: Album[] = state[albumType];
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const { filter } = state;

  useEffect(() => {
    const storedAlbums = localStorage.getItem(albumType);
    if (storedAlbums) {
      const parsedAlbums: Album[] = JSON.parse(storedAlbums);

      dispatch({
        type: "REPLACE_ALBUMS",
        key: albumType,
        payload: parsedAlbums,
      });

      setFilteredAlbums(parsedAlbums);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(albumType, JSON.stringify(state[albumType]));
    }
  }, [state[albumType]]);

  useEffect(() => {
    setIsFilterSet(filter.countries.length > 0 || filter.genres.length > 0 || (filter.years.from !== null && filter.years.to !== null));

    const filteredAlbums = filterAlbums(albums, filter);

    setFilteredAlbums(filteredAlbums);
  }, [filter, albums]);

  return (
    <div className="flex justify-center">
      <div className={`relative flex w-[73.958rem] flex-wrap gap-y-3 py-4 max-2xl:justify-center ${gapClasses[size]}`}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {filteredAlbums.length > 0 && filteredAlbums.map((album, index) => <Card key={`album ${index}`} album={album} size={size} />)}
            {!isFilterSet && albums.length < maxSize[size] && <CardEmpty size={size} />}
            {isFilterSet && filteredAlbums.length === 0 && albums.length > 0 && (
              <div className="flex w-full max-sm:justify-center">No results for current filters.</div>
            )}
            {isFilterSet && albums.length === 0 && <div className="flex w-full max-sm:justify-center"> Clear filters to add a new album.</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default CardArea;
