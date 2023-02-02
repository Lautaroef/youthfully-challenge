"use client";

import { Inter } from "@next/font/google";
import Filters from "../filter-section";
import ImageBox from "./image-container";
import { Skeleton } from "@mantine/core";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createStyles } from "@mantine/core";
import FiltersApplied from "./FiltersApplied";

const inter = Inter({ subsets: ["latin"] });

const useStyles = createStyles((theme) => ({
  input: {
    height: "auto",
    width: "100%",
  },

  label: {
    pointerEvents: "none",
    marginBottom: 2,
    fontSize: theme.fontSizes.md,
    zIndex: 1,
  },
}));

const fetchImages = async (
  section: SectionsType,
  sort: SortType,
  window: WindowType,
  showViral: boolean
) => {
  // here we call the /api/get-filtered-images endpoint to get an array of images
  const response = await fetch(
    `/api/get-filtered-images?section=${section}&sort=${sort}&window=${window}&showViral=${showViral}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
};

type Props = {
  images: IGalleryImage[];
};

function index({ images }: Props) {
  const params = useSearchParams();
  const paramsEntries = Array.from(params.entries());
  const [filteredImages, setFilteredImages] = useState<IGalleryImage[]>(images);
  const [showViral, setShowViral] = useState<boolean>(params.get("showViral") === "true");
  const [section, setSection] = useState<SectionsType>(params.get("section") as SectionsType);
  const [sort, setSort] = useState<SortType>(params.get("sort") as SortType);
  const [window, setWindow] = useState<WindowType>(params.get("window") as WindowType);
  const router = useRouter();
  const { classes } = useStyles();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // update the url with the new filters
    router.push(`/?section=${section}&sort=${sort}&window=${window}&showViral=${showViral}`);

    const data = await fetchImages(section, sort, window, showViral);

    const images = data.data as IGalleryImage[];
    setFilteredImages(images);
  };

  return (
    <main className="main home-page">
      <Filters
        classes={classes}
        showViral={showViral}
        setShowViral={setShowViral}
        section={section}
        setSection={setSection}
        sort={sort}
        setSort={setSort}
        window={window}
        setWindow={setWindow}
        onSubmit={onSubmit}
      />
      {paramsEntries.length > 0 && (
        <FiltersApplied paramsEntries={paramsEntries} inter={inter} />
      )}
      <div className="gallery-images">
        {filteredImages.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height={300} width={300} />
            ))
          : filteredImages.map((image, index) => <ImageBox key={index} image={image} />)}
      </div>
    </main>
  );
}

export default index;
