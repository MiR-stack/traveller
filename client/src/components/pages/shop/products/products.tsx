import { affiliateResponse, imageTypes, priceResponse } from "@/types";
import ProductCard from "../productCard/productCard";
import { products } from "../products.data";
import { getFormatedImage } from "@/utils";

interface productResponse {
  name: string;
  image: imageTypes;
  price: priceResponse;
  affiliates: affiliateResponse[];
}
function Products({
  productsRes,
}: {
  productsRes: { attributes: productResponse }[];
}) {
  const products = productsRes.map((product) => {
    const { name, image: imageRes, price, affiliates } = product.attributes;

    const image = getFormatedImage(imageRes);

    return {
      name,
      image,
      price,
      affiliates,
    };
  });

  return (
    <div className="shop-products">
      {products.map((product) => (
        <ProductCard key={product.name} {...product} />
      ))}
    </div>
  );
}

export default Products;
