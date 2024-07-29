import React from "react";
import Product from "./product";
import { productPropsType } from "./product/product";
import Follow from "./follow";
import LatestPosts from "./latestPosts";
import Categories from "./categories";

interface sidebarPropsType {
  product: productPropsType;
}

function Sidebar({ product }: sidebarPropsType) {
  return (
    <div className="blog-sidebar">
      <Product {...product} />
      <Follow />
      <LatestPosts />
      <Categories />
    </div>
  );
}

export default Sidebar;
