import Products from "@/components/pages/shop/products";
import Banner from "@/components/shared/banner";
import Container from "@/components/shared/container";
import Pagination from "@/components/shared/pagination";
import "@/styles/components/pages/shop.scss";
import { Suspense } from "react";

function page() {
  return (
    <div className="shop">
      <Container maxWidth="xlg">
        <Banner
          resultCount={0}
          title="buy travel essential items"
          className="shop"
          path="shop"
        />
        <Products />
        <Suspense fallback={<div>Loading...</div>}>
          <Pagination pageCount={5} currentPage={2} />
        </Suspense>
      </Container>
    </div>
  );
}

export default page;
