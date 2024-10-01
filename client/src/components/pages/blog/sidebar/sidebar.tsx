import Product from "./product";
import { ProductComponentProps } from "./product/product";
import Follow from "./follow";
import LatestPosts from "./latestPosts";
import Categories from "./categories";

function Sidebar({ product }: ProductComponentProps) {
  return (
    <div className="blog__sidebar">
      <Product product={product} />
      <Follow />
      <LatestPosts />
      <Categories />
    </div>
  );
}

export default Sidebar;
