"use client";

import { useAppContext } from "@/context/app-context";
import { Album } from "@/types/components";
import { filterAlbums } from "@/uitls/filter";
import React from "react";

const AlbumList = () => {
  const { state } = useAppContext();
  const { filter } = state;
  let count = 1;
  const albums = state.largeAlbums.concat(state.mediumAlbums, state.smallAlbums);
  const filteredAlbums = filterAlbums(albums, filter);

  const getListEntry = (album: Album) => {
    return (
      <li key={`${album.album}-${album.id}`}>
        {count++}. {album.band} - {album.album}
      </li>
    );
  };

  return (
    <div id="album-list" className="flex hidden justify-center">
      <div className="my-5 grid w-[73.958rem] grid-cols-3 gap-8">
        <ol>{filteredAlbums.slice(0, 34).map((album) => getListEntry(album))}</ol>
        <ol>{filteredAlbums.slice(34, 68).map((album) => getListEntry(album))}</ol>
        <ol>{filteredAlbums.slice(68, 100).map((album) => getListEntry(album))}</ol>
      </div>
    </div>
  );
};

export default AlbumList;
