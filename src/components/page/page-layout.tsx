"use client";

import React, { ReactNode, useEffect, useState } from "react";
import PageHeader from "./page-header";
import PageSidebar from "./page-sidebar";
import AlbumList from "../album/album-list";
import Modal from "../modal/modal";
import Button from "../button/button";
import Spinner from "../spinner/spinner";

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
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

  const onStart = () => {
    setShowDisclaimer(false);

    fetch("/api/albums")
      .then((data) => {
        console.log(data);
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
                <p>
                  By clicking the button below, you'll load a prefilled chart featuring my 100 personal favorite albums. Feel free to explore these
                  selections, or hit the reset buttons of each section to start building your own chart from scratch.
                </p>
                <p className="mt-3">
                  Please note that your album entries are saved in your browser cache. If caching is disabled, your picks won't be retained.
                </p>
                <p className="mt-3">Have fun and enjoy your musical journey!</p>

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
