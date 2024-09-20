import variables from "@/styles/base/_constant.module.scss";
import Link from "next/link";
import { socialMediaTypes } from "@/types";
import { icons } from "@/components/utils/icons";
import { MASTER_TAG } from "@/utils/constants";
import { getStrapiData } from "@/utils";
import qs from "qs";

const query = qs.stringify({
  populate: ["social_medias"],
  fields: ["name"],
});

async function SocialMedias() {
  const mediaRes = await getStrapiData("brand", query, {
    tags: [MASTER_TAG, "social_medias"],
  });
  const medias = mediaRes?.data?.attributes?.social_medias;

  return (
    <div className={`${variables.brandName}-social_medias`}>
      {medias.slice(0, 3).map((media: socialMediaTypes) => (
        <Link
          href={media.url}
          className={`${variables.brandName}-link link`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={media.name}
          key={media.name}
        >
          {icons[media.icon as keyof typeof icons]}
        </Link>
      ))}
    </div>
  );
}

export default SocialMedias;
