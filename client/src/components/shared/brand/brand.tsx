import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography/typography";
import "@/styles/components/shared/brand.scss";
import { getStrapiData, getStrapiMedia } from "@/utils";
import Link from "next/link";
import qs from "qs";
import { TAGS } from "@/utils/constants";

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
    tags: [TAGS.MASTER_TAG, TAGS.BRAND],
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
          className={`brand__logo`}
          style={{ aspectRatio: logos[logo].aspectRatio }}
          alt="brand logo"
          sizes="30vw"
        />
      );
    } else {
      return (
        <div className="brand__container">
          <Typography variant="h3" className={`brand__name `} component="h1">
            {name}
          </Typography>
          {moto && isMoto && (
            <Typography className="brand__moto" variant="body2">
              {moto}
            </Typography>
          )}
        </div>
      );
    }
  }
  return (
    <section className={`brand  ${variant ? `brand--${variant}` : ""}`}>
      <Link href={"/"} className="link">
        {Logo()}
      </Link>
    </section>
  );
}

export default Brand;
