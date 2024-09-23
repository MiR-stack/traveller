import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Banner from "@/components/shared/banner";
import Blogs from "@/components/pages/search/blogs";
import Container from "@/components/shared/container";
import "@/styles/components/pages/search.scss";
import qs from "qs";
import { getStrapiData } from "@/utils";
import { notFound } from "next/navigation";

interface SearchParams {
  con?: string;
  des?: string;
  q?: string;
  cat?: string;
  page?: string;
}

const PAGE_SIZE = 5;

async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { con, des, q, cat, page = "1" } = searchParams;

  const filter = buildFilter({ con, des, q, cat });
  const query = buildQuery(filter, parseInt(page));

  try {
    const blogs = await getStrapiData("blogs", query);

    if (blogs.data.length === 0 && parseInt(page) > 1) {
      notFound();
    }

    return (
      <div className="search">
        <Navbar />
        <Container maxWidth="lg">
          <Banner
            resultCount={blogs.meta.pagination.total}
            title="Search Results"
            path="search"
            className="search__banner"
          />
          <Blogs blogs={blogs.data} pagination={blogs.meta.pagination} />
        </Container>
        <Footer bg="bg2" />
      </div>
    );
  } catch (error) {
    console.error("Error fetching search results:", error);
    notFound();
  }
}

function buildFilter({
  con,
  des,
  q,
  cat,
}: Omit<SearchParams, "page">): object[] {
  const filter: object[] = [];
  if (q) filter.push({ title: { $containsi: q } });
  if (con) filter.push({ continent: { slug: { $eq: con } } });
  if (des) filter.push({ destination: { slug: { $eq: des } } });
  if (cat) filter.push({ categories: { slug: { $eq: cat } } });
  return filter;
}

function buildQuery(filter: object[], page: number): string {
  return qs.stringify({
    populate: ["images.landscape"],
    fields: ["title", "slug", "description", "createdAt", "readTime"],
    filters: { $and: filter },
    pagination: {
      page,
      pageSize: PAGE_SIZE,
    },
  });
}

export default SearchPage;
