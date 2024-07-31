import ProductCard from "../productCard/productCard";
import { products } from "../products.data";

function Products() {
  return (
    <div className="shop-products">
      {products.map((product) => (
        <ProductCard key={product.name} {...product} />
      ))}
    </div>
  );
}

export default Products;
