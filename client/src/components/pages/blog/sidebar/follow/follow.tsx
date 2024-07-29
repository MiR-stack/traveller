import React from "react";
import SectionLayout from "../../sectionLayout";
import Link from "next/link";
import Typography from "@/components/shared/typography";
import { icons } from "@/components/utils/icons";

const socialMedias = [
  {
    name: "facebook",
    logo: "facebook",
    url: "",
  },
  {
    name: "youtube",
    logo: "youtube",
    url: "",
  },
  {
    name: "twitter",
    logo: "twitter",
    url: "",
  },
  {
    name: "instagram",
    logo: "instagram",
    url: "",
  },
  {
    name: "pinterest",
    logo: "pinterest",
    url: "",
  },
];

function Follow() {
  return (
    <SectionLayout title="connect & follow">
      <div className="blog-sidebar-follow">
        {socialMedias.map((media) => (
          <Link
            className="blog-sidebar-follow-card link"
            key={media.name}
            href={media.url}
          >
            {icons[media.logo as keyof typeof icons]}
            <p className="blog-sidebar-follow--name">{media.name}</p>
          </Link>
        ))}
      </div>
    </SectionLayout>
  );
}

export default Follow;
