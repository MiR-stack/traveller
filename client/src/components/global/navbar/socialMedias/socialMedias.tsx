import variables from "@/styles/base/_constant.module.scss";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";

const socialMedias = [
  {
    name: "facebook",
    icon: <IoLogoFacebook />,
    url: "https://www.facebook.com",
  },
  {
    name: "instagram",
    icon: <IoLogoInstagram />,
    url: "https://www.instagram.com",
  },
  {
    name: "twitter",
    icon: <IoLogoTwitter />,
    url: "https://www.x.com",
  },
];

function SocialMedias() {
  return (
    <div className={`${variables.brandName}-social_medias`}>
      {socialMedias.map((media) => (
        <Link
          href={media.url}
          className={`${variables.brandName}-link link`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={media.name}
          key={media.name}
        >
          {media.icon}
        </Link>
      ))}
    </div>
  );
}

export default SocialMedias;
