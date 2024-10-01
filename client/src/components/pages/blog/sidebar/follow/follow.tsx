import SectionLayout from "../../sectionLayout";
import Link from "next/link";
import { icons } from "@/components/utils/icons";
import { getSocialMedias } from "@/utils";
import { socialMediaTypes } from "@/types";

async function Follow() {
  const medias = await getSocialMedias();

  return (
    <SectionLayout title="connect & follow">
      <div className="sidebar-follow-us">
        {medias.map((media: socialMediaTypes) => (
          <Link
            className="sidebar-follow-us__card link"
            key={media.name}
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icons[media.icon as keyof typeof icons]}
            <p className="sidebar-follow-us__name">{media.name}</p>
          </Link>
        ))}
      </div>
    </SectionLayout>
  );
}

export default Follow;
