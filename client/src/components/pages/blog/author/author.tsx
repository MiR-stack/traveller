import Avatar from "@/components/shared/avatar";
import Typography from "@/components/shared/typography";
import { icons } from "@/components/utils/icons";
import { imageAttrTypes, imageTypes } from "@/types";
import Link from "next/link";

export interface authorPropsType {
  name: string;
  role: string;
  bio: string;
  social_medias: { name: string; url: string; icon: string }[];
  avatar?: imageTypes;
}

function Author({ name, role, bio, social_medias, avatar }: authorPropsType) {
  return (
    <section className="blog-author">
      <Avatar name={name} avatar={avatar?.data.attributes} size="lg" />
      <div>
        <Typography className="blog-author__name" variant="h4">
          {name} . <span className="blog-author__role">{role}</span>
        </Typography>
        <Typography className="blog-author__bio" variant="body2">
          {bio}
        </Typography>
        <div className="blog-author__social-medias">
          {social_medias.map((media) => (
            <Link
              className="link"
              key={media.name}
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icons[media.icon as keyof typeof icons]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Author;
