import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import { photos } from "./gallary.photos";
import Typography from "@/components/shared/typography";
import Link from "next/link";

function Gallery() {
  return (
    <div className="gallery__container">
      {photos.map((photo, index) => (
        <Link href={"/slug"} key={index}>
          <CustomImage
            className="galleryImage"
            src={photo.image.medium}
            alt={photo.image.alt}
            style={{ aspectRatio: photo.image.aspectRatio }}
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
