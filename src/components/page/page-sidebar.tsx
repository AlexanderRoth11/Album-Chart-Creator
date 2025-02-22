"use client";

import { useAppContext } from "@/context/app-context";
import { Album } from "@/types/components";
import { AlbumType } from "@/types/enums";
import React, { useEffect, useRef, useState } from "react";
import Accordion from "../accordion/accordion";
import Slider from "../slider/sldier";
import Filter from "../filter/filter";

const PageSidebar = () => {
  const { state, dispatch } = useAppContext();
  const [countries, setCountries] = useState<Set<string>>(new Set());
  const [years, setYears] = useState<Set<number>>(new Set());
  const [isFilterSet, setIsFilterSet] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [mouseDownOnBackground, setMouseDownOnBackground] = useState(false);
  const DrawerContentRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setMouseDownOnBackground(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownOnBackground && e.target === e.currentTarget) {
      setShowDrawer(false);
    }
    setMouseDownOnBackground(false);
  };

  useEffect(() => {
    if (screenWidth > 1536) {
      setShowDrawer(false);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (screenWidth < 640 && showDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [screenWidth, showDrawer]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const countries = new Set<string>();
    const genres = new Set<string>();
    const years = new Set<number>();

    Object.values(AlbumType).forEach((type: `${AlbumType}`) => {
      state[type].forEach((album: Album) => {
        const { country, genre, releaseYear } = album;
        if (country) countries.add(country);
        if (genre) genres.add(genre);
        if (releaseYear) years.add(releaseYear);
      });

      setCountries(countries);
      dispatch({ type: "REPLACE_GENRE_OPTIONS", payload: genres });
      setYears(years);
    });
  }, [state.smallAlbums, state.mediumAlbums, state.largeAlbums]);

  useEffect(() => {
    const { countries, genres, years } = state.filter;

    if (countries.length > 0 || genres.length > 0 || years.from !== null) {
      if (!isFilterSet) setIsFilterSet(true);
    } else {
      if (isFilterSet) setIsFilterSet(false);
    }
  }, [state.filter]);

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const getFilters = () => {
    return (
      <nav className="flex h-full w-full flex-col overflow-y-auto max-2xl:bg-dark sm:w-[19rem]" ref={DrawerContentRef}>
        {isFilterSet && (
          <button
            className="flex cursor-pointer justify-between border-b-2 border-solid border-b-light-gray pb-2 pl-2 pr-4 pt-2 text-[#f44336]"
            onClick={() => clearFilters()}
          >
            Clear filters
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {countries.size > 0 && (
          <Accordion headline="Countries">
            <Filter items={[...countries].sort()} filterKey="countries" />
          </Accordion>
        )}

        {state.genreOptions.size > 0 && (
          <Accordion headline="Genres">
            <Filter items={[...state.genreOptions].sort()} filterKey="genres" />
          </Accordion>
        )}

        {years.size > 0 && (
          <Accordion headline="Release Year">
            <Slider range={[...years]} />
          </Accordion>
        )}
      </nav>
    );
  };

  return (
    <>
      {!showDrawer && (
        <div className="fixed inset-0 top-9 z-20 box-border hidden w-[19rem] border-r-2 border-solid border-light-gray 2xl:block">{getFilters()}</div>
      )}
      <div className="fixed left-1 top-[5px] z-50 2xl:hidden">
        <button onClick={() => setShowDrawer(!showDrawer)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      {showDrawer && (
        <div className="fixed top-9 z-40 h-full w-full bg-black bg-opacity-50" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
          {getFilters()}
        </div>
      )}
    </>
  );
};

export default PageSidebar;
