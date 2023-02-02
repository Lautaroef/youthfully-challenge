"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spoiler } from "@mantine/core";
import MediaPlayer from "./MediaPlayer";

type Props = {
  image: IGalleryImage;
};

function index({ image }: Props) {
  // If description is only a link, replace it with the title.
  // If description is empty, use the title.
  const [prettyDescription, setPrettyDescription] = useState("");
  useEffect(() => {
    if (image.description) {
      const link = image.description.match(/https?:\/\/[^\s]+/g);
      if (link && link[0] === image.description) {
        setPrettyDescription(image.title);
      } else {
        setPrettyDescription(image.description);
      }
    } else {
      setPrettyDescription(image.title);
    }
  }, [image]);

  return (
    <div className="gallery-image">
      <Link href={`/image/${image.id}`} as={`/image/${image.id}`} className="video">
        <MediaPlayer image={image} width={300} height={300} runOnHover={true} />
      </Link>
      <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide" className="spoiler">
        {prettyDescription}
      </Spoiler>
    </div>
  );
}

export default index;
