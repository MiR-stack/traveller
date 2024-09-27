import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography/typography";
import "@/styles/components/shared/brand.scss";
import { getFormatedImage, getStrapiData, getStrapiMedia } from "@/utils";
import Link from "next/link";
import qs from "qs";
import { MASTER_TAG } from "@/utils/constants";
import { formatedImageTypes, imageAttrTypes } from "@/types";

interface brandPropsType {
  isMoto?: boolean;
  variant?: "extended" | "nav" | "footer";
  logo?: "horizontal" | "vertical" | "mobile" | "wordmark" | "nav" | false;
}

interface logosType {
  [key: string]: {
    src: string;
    aspectRatio: number;
  };
}

const query = qs.stringify({
  populate: { logos: { populate: "*" } },
  fields: ["name", "moto"],
});

async function Brand({
  isMoto = false,
  variant = "extended",
  logo = false,
}: brandPropsType) {
  const brandRes = await getStrapiData("brand", query, {
    tags: [MASTER_TAG, "brand"],
  });

  const { logos: logosRes, name, moto } = brandRes?.data?.attributes;

  const logos: logosType | null = logosRes
    ? Object.keys(logosRes).reduce((acc, key) => {
        if (!logosRes[key].data) return acc;

        const { url, height, width } = logosRes[key].data.attributes;
        acc[key] = {
          src: getStrapiMedia(url)!,
          aspectRatio: width / height,
        };

        return acc;
      }, {} as logosType)
    : null;

  function Logo() {
    if (logo === "nav" && logos?.horizontal && logos?.mobile) {
      return (
        <>
          <CustomImage
            src={logos.horizontal.src}
            className={`brand__logo--horizontal`}
            style={{
              aspectRatio: logos.horizontal.aspectRatio,
            }}
            alt="brand logo"
            sizes="30vw"
          />
          <CustomImage
            src={logos.mobile.src}
            className={`brand__logo--mobile`}
            style={{
              aspectRatio: logos.mobile.aspectRatio,
            }}
            alt="brand logo"
            sizes="30vw"
          />
        </>
      );
    } else if (logo && logos?.[logo]) {
      return (
        <CustomImage
          src={logos[logo].src}
          className={`brand__logo ${variant ? `${variant}-brand-logo` : ""}`}
          style={{ aspectRatio: logos[logo].aspectRatio }}
          alt="brand logo"
          sizes="30vw"
        />
      );
    } else {
      return (
        <div className="brand-container">
          <Typography variant="h3" component="h1">
            <Link
              href={"/"}
              className={`brand-name link ${
                variant ? `${variant}-brand-name` : ""
              }`}
            >
              {name}
            </Link>
          </Typography>
          {moto && isMoto && (
            <Typography className="brand-moto" variant="body2">
              {moto}
            </Typography>
          )}
        </div>
      );
    }
  }
  return (
    <section className={`brand  ${variant ? `${variant}-brand` : ""}`}>
      {Logo()}
    </section>
  );
}

export default Brand;
