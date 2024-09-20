import { basicBlogTypes } from "@/types/blog.types";
import CustomImage from "../../bgImageContainer";
import Typography from "../../typography";
import Link from "next/link";
import "@/styles/components/shared/cards/card1.scss";

interface card1PropTypes extends basicBlogTypes {
  className?: string;
  variant?: "related";
  readTime?: string;
}

function Card1({
  image,
  title,
  country,
  category,
  slug,
  className,
  variant,
  createdAt,
  readTime,
}: card1PropTypes) {
  return (
    <div
      className={`card1 ${className ?? ""} ${
        variant ? `card1-${variant}` : ""
      }`}
    >
      <Link className="card1-image-link" href={slug}>
        <CustomImage
          className={`card1-image ${variant ? `card1-${variant}-image` : ""}`}
          src={image.url}
          alt={image.alt}
          sizes={`(max-width:900px) 46vw, 30vw`}
        />
      </Link>
      <div
        className={`card1-contents ${
          variant ? `card1-${variant}-contents` : ""
        }`}
      >
        <Typography
          className={`card1-country ${
            variant ? `card1-${variant}-country` : ""
          }`}
          variant="body2"
        >
          {country.name}
        </Typography>
        <Link className="link" href={slug}>
          <Typography
            className={`card1-title ${variant ? `card1-${variant}-title` : ""}`}
            variant="h4"
            component="h2"
          >
            {title}
          </Typography>
        </Link>
        {!variant && (
          <Typography className="card1-category" variant="body2">
            {category?.name}
          </Typography>
        )}
        {variant === "related" && (
          <Typography className={`card1-related-footer`} variant="body2">
            {createdAt} . {readTime}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Card1;
