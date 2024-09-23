import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Banner from "@/components/shared/banner";
import Blogs from "@/components/pages/search/blogs";
import Container from "@/components/shared/container";
import "@/styles/components/pages/search.scss";
import qs from "qs";
import { getStrapiData } from "@/utils";

async function page({
  searchParams,
}: {
  searchParams: {
    con?: string;
    des?: string;
    q?: string;
    cat?: string;
    page?: number;
  };
}) {
  const { con, des, q, cat, page } = searchParams;

  let filter: object[] = [];
  if (q) {
    filter.push({ title: { $containsi: q } });
  }

  if (con) {
    filter.push({ continent: { slug: { $eq: con } } });
  }
  if (des) {
    filter.push({ destination: { slug: { $eq: des } } });
  }

  if (cat) {
    filter.push({ categories: { slug: { $eq: cat } } });
  }

  const query = qs.stringify({
    populate: ["images.landscape"],
    fields: ["title", "slug", "description", "createdAt", "readTime"],
    filters: {
      $and: filter,
    },
    pagination: {
      page: page || 1,
      pageSize: 5,
    },
  });

  const blogs = await getStrapiData("blogs", query);

  return (
    <div className="search">
      <Navbar />
      <Container maxWidth="lg">
        <Banner
          resultCount={blogs.meta.pagination.total}
          title="search results"
          path="search"
          className="search__banner"
        />
        <Blogs blogs={blogs.data} pagination={blogs.meta.pagination} />
      </Container>
      <Footer />
    </div>
  );
}

export default page;
