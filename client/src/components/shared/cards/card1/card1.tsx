import { basicBlogTypes } from "@/types/blog.types";
import CustomImage from "../../bgImageContainer";
import Typography from "../../typography";
import Link from "next/link";
import "@/styles/components/shared/cards.scss";

interface card1PropTypes extends basicBlogTypes {
  className?: string;
}

function Card1({
  image,
  title,
  country,
  category,
  slug,
  className,
}: card1PropTypes) {
  return (
    <div className={`card1 ${className ?? ""}`}>
      <Link className="card1-image-link" href={slug}>
        <CustomImage
          className="card1-image"
          src={image.url}
          alt={image.alt}
          sizes={`(max-width:900px) 46vw, 30vw`}
        />
      </Link>
      <div className="card1-contents">
        <Typography className="card1-country" variant="body2">
          {country.name}
        </Typography>
        <Link className="link" href={slug}>
          <Typography className="card1-title" variant="h4" component="h2">
            {title}
          </Typography>
        </Link>
        <Typography className="card1-category" variant="body2">
          {category.name}
        </Typography>
      </div>
    </div>
  );
}

export default Card1;
