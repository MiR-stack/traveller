import { basicBlogTypes } from "@/types/blog.types";
import CustomImage from "../../bgImageContainer";
import Typography from "../../typography";
import Link from "next/link";
import "@/styles/components/shared/cards/card1.scss";

interface card1PropTypes extends basicBlogTypes {
  className?: string;
  variant?: "related";
  readTime?: string;
  titleComponent?: keyof JSX.IntrinsicElements;
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
  titleComponent = "h2",
}: card1PropTypes) {
  return (
    <div
      className={`card1 ${className ?? ""} ${
        variant ? `card1--${variant}` : ""
      }`}
    >
      <Link className="card1__link" href={slug}>
        <CustomImage
          className={`card1__image`}
          src={image.url}
          alt={image.alt}
          sizes={`(max-width:900px) 46vw, 30vw`}
        />
      </Link>
      <div className={`card1__contents`}>
        <Typography className={`card1__country`} variant="body2">
          {country.name}
        </Typography>
        <Link className="link" href={slug}>
          <Typography
            className={`card1__title `}
            variant="h4"
            component={titleComponent}
          >
            {title}
          </Typography>
        </Link>
        {!variant && (
          <Typography className="card1__category" variant="body2">
            {category?.name}
          </Typography>
        )}
        {variant === "related" && (
          <Typography className={`card1__footer`} variant="body2">
            {createdAt} . {readTime}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Card1;
