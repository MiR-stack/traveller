import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography";
import Link from "next/link";
import qs from "qs";
import { getFormatedImage, getStrapiData } from "@/utils";
import { TAGS } from "@/utils/constants";

const query = qs.stringify({
  populate: ["image"],
  fields: ["location", "shortDesc"],
});

async function Gallery() {
  const photosRes = await getStrapiData("photos", query, {
    tags: [TAGS.MASTER_TAG, TAGS.PHOTOS],
  });

  const photos = photosRes.data.map((photo: any) => {
    const { image: imageRes, location, shortDesc } = photo.attributes;

    const image = getFormatedImage(imageRes);

    const { width, height } = imageRes.data.attributes;
    const aspectRatio = width / height;

    return {
      image,
      location,
      shortDesc,
      aspectRatio,
    };
  });

  return (
    <div className="gallery__container">
      {photos.map((photo: any, index: number) => (
        <Link href={"/search"} key={index}>
          <CustomImage
            className="gallery-image"
            src={photo.image.srcs.medium}
            alt={photo.image.alt}
            style={{ aspectRatio: photo.aspectRatio }}
          >
            <div className="gallery-image__wrapper">
              <p className="gallery-image__description">{photo.shortDesc}</p>
              <Typography className="gallery-image__location" variant="h4">
                {photo.location}
              </Typography>
            </div>
          </CustomImage>
        </Link>
      ))}
    </div>
  );
}

export default Gallery;
