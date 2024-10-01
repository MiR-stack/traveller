import Brand from "@/components/shared/brand/brand";
import Typography from "@/components/shared/typography/typography";
import Link from "next/link";
import { socialMediaTypes } from "@/types";
import { icons } from "@/components/utils/icons";
import { MASTER_TAG } from "@/utils/constants";
import { getStrapiData } from "@/utils";
import qs from "qs";

const query = qs.stringify({
  populate: ["social_medias"],
  fields: ["short_description"],
});

const BrandSection = async () => {
  const brandRes = await getStrapiData("brand", query, {
    tags: [MASTER_TAG, "brand"],
  });

  const { short_description, social_medias } = brandRes.data.attributes;

  return (
    <div className="footer-brand">
      <Brand variant="footer" />
      <Typography className="footer-brand__description" variant="body1">
        {short_description}
      </Typography>
      <div className="footer-brand__social-medias">
        {social_medias &&
          social_medias.map((media: socialMediaTypes) => (
            <Link
              className="link"
              href={media.url}
              key={media.name}
              aria-label={media.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icons[media.name as keyof typeof icons]}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BrandSection;
