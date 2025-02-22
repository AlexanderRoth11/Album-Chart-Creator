"use client";

import Button from "@/components/button/button";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAppContext } from "@/context/app-context";
import { State } from "@/context/app-reducer";
import { filterAlbums } from "@/uitls/filter";
import Spinner from "@/components/spinner/spinner";

function truncateMultiLineText(element: HTMLElement) {
  let maxLines = 27;

  if (element.classList.contains("max-h-12")) {
    maxLines = 38;
  }

  if (element.classList.contains("max-h-14")) {
    maxLines = 45;
  }

  if (element.textContent) {
    if (element.textContent.length > maxLines) {
      element.textContent = element.textContent.slice(0, maxLines).trim();
      element.textContent += "...";
    }
  }
}

function truncateText(element: HTMLElement) {
  let maxLines = 20;

  if (element.classList.contains("text-xs")) {
    maxLines = 28;
  }

  if (element.classList.contains("text-sm")) {
    maxLines = 35;
  }

  if (element.textContent) {
    if (element.textContent.length > maxLines) {
      element.textContent = element.textContent.slice(0, maxLines).trim();
      element.textContent += "...";
    }
  }
}

function removeAreas(areas: NodeList, state: State) {
  const largeAlbums = filterAlbums(state.largeAlbums, state.filter);
  const mediumAlbums = filterAlbums(state.mediumAlbums, state.filter);
  const smallAlbums = filterAlbums(state.smallAlbums, state.filter);

  if (largeAlbums.length === 0) {
    (areas[0] as HTMLElement).remove();
  }
  if (mediumAlbums.length === 0) {
    (areas[1] as HTMLElement).remove();
  }
  if (smallAlbums.length === 0) {
    (areas[2] as HTMLElement).remove();
  }
}

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
      const clonedElement = element.cloneNode(true) as HTMLElement;

      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      clonedElement.style.width = "100%";
      clonedElement.style.minHeight = "1600px";

      clonedElement.querySelector("#album-list")?.classList.remove("hidden");

      document.body.appendChild(clonedElement);

      const buttonsToRemove = clonedElement.querySelectorAll('button[aria-label="reset"], button[aria-label="info"]');
      buttonsToRemove.forEach((button) => button.remove());

      const cardsToRemove = clonedElement.querySelectorAll('[id^="add-album"]');
      cardsToRemove.forEach((card) => card.remove());

      const areas = clonedElement.querySelectorAll('[id*="area"]');
      removeAreas(areas, state);

      const multilineTruncateElements = clonedElement.querySelectorAll(".multiline-truncate");
      multilineTruncateElements.forEach((element: any) => {
        truncateMultiLineText(element);
        element.classList.remove("multiline-truncate");
      });

      const singlelineTruncateElements = clonedElement.querySelectorAll(".singleline-truncate");
      singlelineTruncateElements.forEach((element: any) => {
        truncateText(element);
        element.classList.remove("singleline-truncate");
      });

      const targetWidth = 1535;

      const canvas = await html2canvas(clonedElement, {
        useCORS: true,
        width: targetWidth,
        windowWidth: targetWidth,
        scale: 3.5,
      });

      document.body.removeChild(clonedElement);

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
