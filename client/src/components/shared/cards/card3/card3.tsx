import variables from "@/styles/base/_constant.module.scss";
import CustomImage from "../../bgImageContainer/bgImageContainer";
import Typography from "../../typography";
import ShortInfo from "../../shortInfo";
import { FiClock } from "react-icons/fi";
import "@/styles/components/shared/cards/card3.scss";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";

interface card3PropsType {
  image: { url: string; alt: string };
  imageSizes?: string;
  title: string;
  slug: string;
  country: { name: string };
  readTime: string;
  className?: string;
  variant?: "search";
  shortDescription?: string;
  createdAt?: string;
  options?: {
    country?: boolean;
    date?: boolean;
    readTime?: boolean;
    shortDescription?: boolean;
  };
}

const initOptions = {
  country: true,
  date: false,
  readTime: true,
  shortDescription: false,
};

function Card3({
  image,
  imageSizes,
  title,
  country,
  readTime,
  className,
  slug,
  variant,
  shortDescription,
  createdAt,
  options,
}: card3PropsType) {
  // let time = "0";

  // if (createdAt) {
  //   time = formatDistanceToNowStrict(createdAt);
  // }

  if (options) {
    options = {
      ...initOptions,
      ...options,
    };
  } else {
    options = initOptions;
  }

  return (
    <div className={`${variables.brandName}-card3 ${className ?? ""}`}>
      <Link
        className={`${variables.brandName}-card3--image-link link ${
          className ? `${className}--image-link` : ""
        }`}
        href={slug}
      >
        <CustomImage
          className={`${variables.brandName}-card3--image ${
            className ? `${className}--image` : ""
          }`}
          src={image.url}
          alt={image.alt}
          sizes={imageSizes}
        />
      </Link>
      <div
        className={`${variables.brandName}-card3-content ${
          className ? `${className}-content` : ""
        }`}
      >
        <div
          className={`${variables.brandName}-card3-header ${
            className ? `${className}-header` : ""
          }`}
        >
          {options.country && (
            <Typography
              className={`${variables.brandName}-card3--country ${
                variant ? `${className}--country` : ""
              }`}
              variant="body2"
            >
              {country.name}
            </Typography>
          )}
          {options.date && (
            <ShortInfo
              className={`${variables.brandName}-card3--readTime ${
                className ? `${className}--date` : ""
              }`}
              icon={<FaRegCalendarAlt />}
              text={createdAt!}
            />
          )}
          {options.readTime && (
            <ShortInfo
              className={`${variables.brandName}-card3--readTime ${
                variant ? `${className}--readTime` : ""
              }`}
              icon={<FiClock />}
              text={readTime}
            />
          )}
        </div>
        <Link href={slug} className="link">
          <Typography
            className={`${variables.brandName}-card3--title ${
              className ? `${className}--title` : ""
            }`}
            variant="h4"
            component="h1"
          >
            {title}
          </Typography>
        </Link>
        {options.shortDescription && (
          <Typography
            className={`${variables.brandName}-card3--shortDesc ${
              className ? `${className}--shortDesc` : ""
            }`}
            variant="body1"
          >
            {shortDescription}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Card3;
