import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import { photos } from "./gallary.photos";
import Typography from "@/components/shared/typography";
import Link from "next/link";
import qs from "qs";
import { getFormatedImage, getStrapiData } from "@/utils";
import { formatedImageTypes } from "@/types";

const query = qs.stringify({
  populate: ["image"],
  fields: ["location", "shortDesc"],
});

interface photo {
  image: formatedImageTypes;
  location: string;
  shortDesc: string;
  aspectRatio: number;
}

async function Gallery() {
  const photosRes = await getStrapiData("photos", query);

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
        <Link href={"/slug"} key={index}>
          <CustomImage
            className="galleryImage"
            src={photo.image.srcs.medium}
            alt={photo.image.alt}
            style={{ aspectRatio: photo.aspectRatio }}
          >
            <div className="galleryImage__wraper">
              <p className="galleryImage__shortDesc">{photo.shortDesc}</p>
              <Typography className="galleryImage__location" variant="h4">
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
