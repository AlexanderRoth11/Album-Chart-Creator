"use client";

import { useAppContext } from "@/context/app-context";
import { filterAlbums } from "@/uitls/filter";
import React from "react";

const AlbumList = () => {
  const { state } = useAppContext();
  const { filter } = state;
  let count = 1;
  const albums = state.largeAlbums.concat(state.mediumAlbums, state.smallAlbums);
  const filteredAlbums = filterAlbums(albums, filter);

  return (
    <div id="album-list" className="my-5 ml-48 grid hidden grid-cols-3 gap-8">
      <ol>
        {filteredAlbums.slice(0, 34).map((album) => {
          return (
            <li key={`${album.album}-${count}`}>
              {count++}. {album.band} - {album.album}
            </li>
          );
        })}
      </ol>

      <ol>
        {filteredAlbums.slice(34, 68).map((album) => {
          return (
            <li key={`${album.album}-${count}`}>
              {count++}. {album.band} - {album.album}
            </li>
          );
        })}
      </ol>

      <ol>
        {filteredAlbums.slice(68, 100).map((album) => {
          return (
            <li key={`${album.album}-${count}`}>
              {count++}. {album.band} - {album.album}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AlbumList;
