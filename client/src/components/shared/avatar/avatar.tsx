import { imageAttrTypes } from "@/types";
import CustomImage from "../bgImageContainer/bgImageContainer";
import { getStrapiMedia } from "@/utils/utils";
import variables from "@/styles/base/_constant.module.scss";
import "@/styles/components/shared/avatar.scss";

const sizes = {
  lg: {
    height: 70,
    width: 70,
  },
  md: {
    height: 50,
    width: 50,
    fontSize: "1.3rem",
  },
  sm: {
    height: 40,
    width: 40,
  },
};

interface AvatarProps {
  avatar?: imageAttrTypes;
  size?: keyof typeof sizes;
  name: string;
  avatarUrl?: string;
}

function Avatar({ avatar, size = "md", name, avatarUrl }: AvatarProps) {
  const avatarMedia =
    avatarUrl || (avatar && getStrapiMedia(avatar.formats?.thumbnail?.url));

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, size === "sm" ? 1 : 2)
    .join("")
    .toUpperCase();

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  return (
    <div
      className={`${variables.brandName}-avatar`}
      style={{
        backgroundColor: stringToColor(name),
        ...sizes[size],
      }}
    >
      {avatarMedia ? (
        <CustomImage
          className={`${variables.brandName}-avatar-image`}
          src={avatarMedia}
          alt={`${name}'s avatar`}
          sizes={`${sizes[size].width}px`}
        />
      ) : (
        <div className={`${variables.brandName}-avatar-initials`}>
          {initials}
        </div>
      )}
    </div>
  );
}

export default Avatar;
