"use client";
import Image from "next/image";
import { useRef } from "react";

type Props = {
  image: IGalleryImage;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  loop?: boolean;
  runOnHover?: boolean;
};

function MediaPlayer({
  image,
  width,
  height,
  autoPlay = false,
  loop = false,
  runOnHover = false,
}: Props) {
  // Play video on hover
  const video = useRef<HTMLVideoElement>(null);
  const handleMouseEnter = () => {
    runOnHover && video.current?.play();
  };
  const handleMouseLeave = () => {
    runOnHover && video.current?.pause();
  };

  // sometimes the link does not contain the image, but the images array does
  const srcImage = image.images ? image.images[0].link : image.link; // Check if image is an album, if so, use the first image
  const srcVideo = image.mp4 || (image.images && image.images[0].mp4);

  return srcVideo ? (
    <video
      controls
      playsInline
      loop={loop}
      ref={video}
      width={width}
      height={height}
      src={srcVideo}
      autoPlay={autoPlay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  ) : (
    <Image alt={image.title} src={srcImage} width={width} height={height} />
  );
}

export default MediaPlayer;
