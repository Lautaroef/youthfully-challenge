import Home from "./components/home";

async function getImages() {
  const section = "top"; // hot, top, user
  const sort = "top"; // viral, top, time, rising
  const window = "all"; // day, week, month, year, all
  const page = 1;

  const showViral = true; // Show or hide viral images from the user section.
  const mature = false; // Show or hide mature (nsfw) images in the response section.
  const album_previews = false; // Include image metadata for gallery posts which are albums

  const response = await fetch(
    `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/${page}
    ?showViral=${showViral}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
}

export default async function Page() {
  const data = await getImages();
  const images = data.data as IGalleryImage[];

  return <Home images={images} />;
}
