import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography/typography";
import "@/styles/components/shared/brand.scss";
import { getStrapiData } from "@/utils";
import Link from "next/link";
import qs from "qs";
import { MASTER_TAG } from "@/utils/constants";

interface brandPropsType {
  isMoto?: boolean;
  variant?: "extended" | "nav" | "footer";
}

const query = qs.stringify({
  populate: ["logo"],
  fields: ["name", "moto"],
});

async function Brand({ isMoto = false, variant = "extended" }: brandPropsType) {
  const brandRes = await getStrapiData("brand", query, {
    tags: [MASTER_TAG, "brand"],
  });

  const { logo, name, moto } = brandRes?.data?.attributes;

  return (
    <section className={`brand  ${variant ? `${variant}-brand` : ""}`}>
      {logo.data ? (
        <CustomImage
          src={""}
          className={`brand-logo ${variant ? `${variant}-brand-logo` : ""}`}
          alt="brand logo"
          sizes="30vw"
        />
      ) : (
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
      )}
    </section>
  );
}

export default Brand;
