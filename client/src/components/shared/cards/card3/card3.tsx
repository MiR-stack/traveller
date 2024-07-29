import variables from "@/styles/base/_constant.module.scss";
import CustomImage from "../../bgImageContainer/bgImageContainer";
import Typography from "../../typography";
import ShortInfo from "../../shortInfo";
import { FiClock } from "react-icons/fi";
import "@/styles/components/shared/cards/card3.scss";
import Link from "next/link";

interface card3PropsType {
  image: { url: string; alt: string };
  title: string;
  slug: string;
  country: { name: string };
  readTime: string;
  className?: string;
}

function Card3({
  image,
  title,
  country,
  readTime,
  className,
  slug,
}: card3PropsType) {
  return (
    <div className={`${variables.brandName}-card3 ${className ?? ""}`}>
      <Link
        className={`${variables.brandName}-card3--image-link link`}
        href={slug}
      >
        <CustomImage
          className={`${variables.brandName}-card3--image`}
          src={image.url}
          alt={image.alt}
        />
      </Link>
      <div className={`${variables.brandName}-card3-content`}>
        <div className={`${variables.brandName}-card3-header`}>
          <Typography
            className={`${variables.brandName}-card3--country`}
            variant="body2"
          >
            {country.name}
          </Typography>
          <ShortInfo
            className={`${variables.brandName}-card3--readTime`}
            icon={<FiClock />}
            text={readTime}
          />
        </div>
        <Link href={slug} className="link">
          <Typography
            className={`${variables.brandName}-card3--title`}
            variant="h4"
            component="h1"
          >
            {title}
          </Typography>
        </Link>
      </div>
    </div>
  );
}

export default Card3;
