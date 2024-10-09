import Products from "@/components/pages/shop/products";
import Banner from "@/components/shared/banner";
import Container from "@/components/shared/container";
import Pagination from "@/components/shared/pagination";
import "@/styles/components/pages/shop.scss";
import { Suspense } from "react";
import qs from "qs";
import { getStrapiData } from "@/utils";
import { TAGS } from "@/utils/constants";

interface searchParamsType {
  q: string;
  page: number;
}

const PAGE_SIZE = 12;

async function page({ searchParams }: { searchParams: searchParamsType }) {
  const query = queryBuilder(searchParams);
  const products = await getStrapiData("products", query, {
    tags: [TAGS.MASTER_TAG, TAGS.PRODUCTS],
  });

  const { pageCount, page: currentPage, total } = products.meta.pagination;

  return (
    <div className="shop">
      <Container maxWidth="xlg">
        <Banner
          resultCount={total}
          resultText={`${total} products found`}
          title="buy travel essential items"
          path="shop"
          variant="shop"
        />
        <main className="shop__main">
          <Products productsRes={products.data} />
          {pageCount > 1 && (
            <Suspense fallback={<div>Loading...</div>}>
              <Pagination pageCount={pageCount} currentPage={currentPage} />
            </Suspense>
          )}
        </main>
      </Container>
    </div>
  );
}

export default page;

const queryBuilder = (searchParams: searchParamsType) => {
  const { q, page } = searchParams;

  const query = qs.stringify({
    populate: ["image", "price", "affiliates"],
    fields: ["name"],
    filters: {
      name: {
        $containsi: q,
      },
    },
    pagination: {
      page: page,
      pageSize: PAGE_SIZE || 8,
    },
    sort: "updatedAt:desc",
  });

  return query;
};
