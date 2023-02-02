import MediaPlayer from "app/components/home/image-container/MediaPlayer";
import Image from "next/image";
import Link from "next/link";
import Button from "app/components/button";

async function getImage(id: string): Promise<{ data: IGalleryImage } | null> {
  const response = await fetch(`https://api.imgur.com/3/image/${id}`, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getImage(id);
  const image = data && (data?.data as IGalleryImage);

  const prettyViews = image && image.views ? image.views.toLocaleString("en-US") : "-";
  const prettyUpvotes = image && image.ups ? image.ups.toLocaleString("en-US") : "-";
  const prettyDownvotes = image && image.downs ? image.downs.toLocaleString("en-US") : "-";
  const prettyScore = image && image.score ? image.score.toLocaleString("en-US") : "-";

  return (
    <main className="single-image-page">
      {image ? (
        <div className="main image-box">
          <div className="image-id">
            Image: <b>{id}</b>
          </div>
          <div
            style={{
              width: "100%",
              padding: "1rem",
            }}
          >
            <div className="image-container">
              <MediaPlayer loop autoPlay image={image} width={600} height={600} />
            </div>
            <div className="image-details">
              <div className="image-details-title">
                Title: <b>{image.title}</b>
              </div>
              <div className="image-details-description">
                Description: <b>{image.description || "-"}</b>
              </div>
              <div className="image-details-upvotes">
                Upvotes: <b>{prettyUpvotes}</b>
              </div>
              <div className="image-details-downvotes">
                Downvotes: <b>{prettyDownvotes}</b>
              </div>
              <div className="image-details-score">
                Score: <b>{prettyScore}</b>
              </div>
              <div className="image-details-views">
                Views: <b>{prettyViews}</b>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Image src="/images/404.png" alt="404" width={500} height={500} />
          <Link href="/">
            <Button
              variant="light"
              styles={{
                label: {
                  fontSize: "1.25rem",
                },
              }}
            >
              Go Home
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
