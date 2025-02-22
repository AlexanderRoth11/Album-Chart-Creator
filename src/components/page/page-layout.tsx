"use client";

import React, { ReactNode, useEffect, useState } from "react";
import PageHeader from "./page-header";
import PageSidebar from "./page-sidebar";
import AlbumList from "../album/album-list";
import Modal from "../modal/modal";
import Button from "../button/button";
import Spinner from "../spinner/spinner";
import { useAppContext } from "@/context/app-context";
import { AlbumType } from "@/types/enums";
import { Album } from "@/types/components";

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  const { dispatch } = useAppContext();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [fetchLoad, setFetchLoad] = useState(true);

  useEffect(() => {
    const largeAlbums = JSON.parse(localStorage.getItem("largeAlbums") || "[]");
    const mediumAlbums = JSON.parse(localStorage.getItem("mediumAlbums") || "[]");
    const smallAlbums = JSON.parse(localStorage.getItem("smallAlbums") || "[]");

    if (largeAlbums.length > 0 || mediumAlbums.length > 0 || smallAlbums.length > 0) {
      setFetchLoad(false);
      setShowDisclaimer(false);
    }

    setInitialLoad(false);
  }, []);

  const addToState = (type: AlbumType, data: Album[]) => {
    dispatch({
      type: "REPLACE_ALBUMS",
      key: type,
      payload: data,
    });

    localStorage.setItem(type, JSON.stringify(data));
  };

  const onStart = () => {
    setShowDisclaimer(false);

    fetch("/api/albums")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        addToState(AlbumType.large, data.largeAlbums);
        addToState(AlbumType.medium, data.mediumAlbums);
        addToState(AlbumType.small, data.smallAlbums);
        setFetchLoad(false);
      })
      .catch((err) => {
        console.error(err);
        setFetchLoad(false);
      });
  };

  return initialLoad ? null : (
    <div className="font-sans">
      <PageHeader />
      <div>
        <PageSidebar />
        <div id="album-chart" className="bg-dark 2xl:pl-[19rem]">
          {showDisclaimer ? (
            <Modal title={"Welcome to Album Chart Creator!"} show={showDisclaimer} closeModal={() => setShowDisclaimer(false)} disclaimer>
              <div className="flex flex-col">
                <p className="mt-10">
                  By clicking the button below, you&apos;ll load a prefilled chart featuring my 100 personal favorite albums. Feel free to explore
                  these selections, or hit the reset button
                  <span className="mx-1">
                    (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="mx-1 inline size-5 bg-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    )
                  </span>
                  of each section to start building your own chart from scratch.
                </p>

                <p className="mt-8">
                  Please note that your album entries are saved in your browser cache. If caching is disabled, your picks won&apos;t be retained.
                </p>

                <p className="mt-1">Once you have selected your top albums, you can save them as a PDF.</p>

                <p className="mt-12">Have fun and enjoy your musical journey!</p>

                <span className="mt-10 inline-block w-48 self-center">
                  <Button text="Start" onClick={onStart} />
                </span>
              </div>
            </Modal>
          ) : fetchLoad ? (
            <div className="mt-24 flex justify-center">
              <Spinner />
            </div>
          ) : (
            children
          )}
          <AlbumList />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
