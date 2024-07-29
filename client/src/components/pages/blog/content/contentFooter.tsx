import { icons } from "@/components/utils/icons";
import Link from "next/link";

const share = [
  {
    name: "facebook",
    url: "",
  },
  {
    name: "twitter",
    url: "",
  },
  {
    name: "whatsapp",
    url: "",
  },
  {
    name: "mail",
    url: "",
  },
];

function ContentFooter({}: { url: string }) {
  return (
    <div className="blog-content-footer">
      <div className="blog-content-share">
        {share.map((media) => (
          <Link className="link" key={media.name} href={media.url}>
            {icons[media.name as keyof typeof icons]}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ContentFooter;
