import Typography from "@/components/shared/typography/typography";
import Link from "next/link";
import { getStrapiData } from "@/utils";
import qs from "qs";
import { TAGS } from "@/utils/constants";

const query = qs.stringify({
  fields: ["title", "slug"],
  populate: {
    destination: {
      fields: ["name"],
    },
  },
  filters: {
    isPopular: {
      $eq: true,
    },
  },
  pagination: {
    start: 0,
    limit: 3,
  },
  sort: "updatedAt:desc",
});

const PopularPostsSection = async () => {
  const blogs = await getStrapiData("blogs", query, {
    tags: [TAGS.MASTER_TAG, TAGS.POPULAR],
  });

  const popularBlogs = blogs.data.map((blog: any) => {
    const { title, slug, destination } = blog.attributes;
    return {
      title,
      slug,
      destination: destination.data
        ? destination.data.attributes.name
        : "world",
    };
  });

  return (
    <div className="footer-blogs">
      <Typography className="footer__title" variant="h3" component="h2">
        popular posts
      </Typography>
      <div className="footer__wraper">
        {popularBlogs.slice(0, 3).map((blog: any) => (
          <div className="footer-blog" key={blog.slug}>
            <Link className="footer-blog__title link" href={blog.slug}>
              {blog.title}
            </Link>
            <Typography className="footer-blog__country" variant="body2">
              {blog.destination}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPostsSection;
