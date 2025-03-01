"use client";

import Button from "@/components/button/button";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAppContext } from "@/context/app-context";
import { State } from "@/context/app-reducer";
import { filterAlbums } from "@/uitls/filter";
import Spinner from "@/components/spinner/spinner";

const truncateTextContent = (element: HTMLElement, maxLines: number) => {
  if (element.textContent && element.textContent.length > maxLines) {
    element.textContent = element.textContent.slice(0, maxLines).trim() + "...";
  }
};

const truncateText = (element: HTMLElement, className: string) => {
  let maxLines = 20;

  if (className.includes("text-xs")) maxLines = 28;
  if (className.includes("text-sm")) maxLines = 35;

  truncateTextContent(element, maxLines);
};

const truncateMultiLineText = (element: HTMLElement, className: string) => {
  let maxLines = 27;

  if (className.includes("max-h-12")) maxLines = 38;
  if (className.includes("max-h-14")) maxLines = 45;

  truncateTextContent(element, maxLines);
};

const removeAreas = (areas: NodeList, state: State) => {
  const largeAlbums = filterAlbums(state.largeAlbums, state.filter);
  const mediumAlbums = filterAlbums(state.mediumAlbums, state.filter);
  const smallAlbums = filterAlbums(state.smallAlbums, state.filter);

  if (largeAlbums.length === 0) (areas[0] as HTMLElement).remove();
  if (mediumAlbums.length === 0) (areas[1] as HTMLElement).remove();
  if (smallAlbums.length === 0) (areas[2] as HTMLElement).remove();
};

const generatePDF = async (clonedElement: HTMLElement, targetWidth: number) => {
  const canvas = await html2canvas(clonedElement, {
    useCORS: true,
    width: targetWidth,
    windowWidth: targetWidth,
    scale: 3.5,
  });

  const pdfWidth = 800;
  const pdfHeight = (canvas.height / canvas.width) * pdfWidth;
  const imgData = canvas.toDataURL("image/jpeg", 0.95);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [pdfWidth, pdfHeight],
  });

  pdf.setFillColor(30, 30, 30);
  pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("album-chart.pdf");
};

const generateMultiPagePDF = async (firstPage: HTMLElement, secondPage: HTMLElement, targetWidth: number) => {
  const canvasFirstPage = await html2canvas(firstPage, {
    useCORS: true,
    width: targetWidth,
    windowWidth: targetWidth,
    scale: 3.5,
  });

  const canvasSecondPage = await html2canvas(secondPage, {
    useCORS: true,
    width: targetWidth,
    windowWidth: targetWidth,
    scale: 3.5,
  });

  const pdfWidth = 800;
  const pdfHeightFirstPage = (canvasFirstPage.height / canvasFirstPage.width) * pdfWidth;
  const pdfHeightSecondPage = (canvasSecondPage.height / canvasSecondPage.width) * pdfWidth;

  const imgDataFirstPage = canvasFirstPage.toDataURL("image/jpeg", 0.95);
  const imgDataSecondPage = canvasSecondPage.toDataURL("image/jpeg", 0.95);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [pdfWidth, pdfHeightFirstPage],
  });

  pdf.setFillColor(30, 30, 30);
  pdf.rect(0, 0, pdfWidth, pdfHeightFirstPage, "F");
  pdf.addImage(imgDataFirstPage, "JPEG", 0, 0, pdfWidth, pdfHeightFirstPage);

  pdf.addPage([pdfWidth, pdfHeightSecondPage]);
  pdf.setFillColor(30, 30, 30);
  pdf.rect(0, 0, pdfWidth, pdfHeightSecondPage, "F");
  pdf.addImage(imgDataSecondPage, "JPEG", 0, 0, pdfWidth, pdfHeightSecondPage);

  pdf.save("album-chart.pdf");
};

const PdfExporter = () => {
  const { state } = useAppContext();
  const [generating, setGenerating] = useState(false);

  const handleExport = async () => {
    setGenerating(true);
    const element = document.getElementById("album-chart");

    if (!element) {
      console.error(`Element with ID "album-chart" not found.`);
      return;
    }

    try {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      clonedElement.style.width = "1535px";
      clonedElement.style.minHeight = "1600px";
      if (!isIOS) clonedElement.querySelector("#album-list")?.classList.remove("hidden");

      document.body.appendChild(clonedElement);

      const buttonsToRemove = clonedElement.querySelectorAll('button[aria-label="reset"], button[aria-label="info"]');
      buttonsToRemove.forEach((button) => button.remove());

      const cardsToRemove = clonedElement.querySelectorAll('[id^="add-album"]');
      cardsToRemove.forEach((card) => card.remove());

      const areas = clonedElement.querySelectorAll('[id*="area"]');
      removeAreas(areas, state);

      const multilineTruncateElements = clonedElement.querySelectorAll(".multiline-truncate");
      multilineTruncateElements.forEach((element: any) => {
        truncateMultiLineText(element, element.className);
        element.classList.remove("multiline-truncate");
      });

      const singlelineTruncateElements = clonedElement.querySelectorAll(".singleline-truncate");
      singlelineTruncateElements.forEach((element: any) => {
        truncateText(element, element.className);
        element.classList.remove("singleline-truncate");
      });

      const targetWidth = 1535;

      if (isIOS && clonedElement.clientHeight > 2000) {
        const firstPage = clonedElement.cloneNode(true) as HTMLElement;
        const secondPage = clonedElement.cloneNode(true) as HTMLElement;

        firstPage.querySelector("#small-area")?.remove();
        firstPage.querySelector("#album-list")?.remove();

        secondPage.querySelector("#large-area")?.remove();
        secondPage.querySelector("#medium-area")?.remove();
        secondPage.querySelector("#album-list")?.remove();

        clonedElement.appendChild(firstPage);
        clonedElement.appendChild(secondPage);

        await generateMultiPagePDF(firstPage, secondPage, targetWidth);
      } else {
        await generatePDF(clonedElement, targetWidth);
      }

      document.body.removeChild(clonedElement);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }

    setGenerating(false);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <div className="w-32">
        <Button text="Get PDF" onClick={handleExport} small download disabled={generating} />
      </div>
      {generating && <Spinner small />}
    </div>
  );
};

export default PdfExporter;
