import SectionLayout from "../../sectionLayout";
import Link from "next/link";
import { icons } from "@/components/utils/icons";
import { getSocialMedias } from "@/utils";
import { socialMediaTypes } from "@/types";

async function Follow() {
  const medias = await getSocialMedias();

  return (
    <SectionLayout title="connect & follow">
      <div className="blog-sidebar-follow">
        {medias.map((media: socialMediaTypes) => (
          <Link
            className="blog-sidebar-follow-card link"
            key={media.name}
            href={media.url}
          >
            {icons[media.icon as keyof typeof icons]}
            <p className="blog-sidebar-follow--name">{media.name}</p>
          </Link>
        ))}
      </div>
    </SectionLayout>
  );
}

export default Follow;
