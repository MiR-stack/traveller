import { icons } from "@/components/utils/icons";
import Link from "next/link";

function ContentFooter({ url, title }: { url: string; title: string }) {
  const emailSubject = encodeURIComponent(`Check out this article: ${title}`);
  const emailBody = encodeURIComponent(
    `I found this article interesting: ${title}\n\nYou can read it here: ${url}`
  );

  const share = [
    {
      name: "facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: "twitter",
      url: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
    },
    {
      name: "whatsapp",
      url: `https://wa.me/?text=Check out this article: ${title} \n${url}`,
    },
    {
      name: "mail",
      url: `mailto:?subject=${emailSubject}&body=${emailBody}`,
    },
  ];
  return (
    <div className="blog-content-footer">
      <div className="blog-content-share">
        {share.map((media) => (
          <Link
            className="link"
            key={media.name}
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icons[media.name as keyof typeof icons]}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ContentFooter;
