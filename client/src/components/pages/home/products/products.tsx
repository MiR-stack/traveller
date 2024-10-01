import React from "react";
import SectionLayout from "../sectionLayout";
import Link from "next/link";
import Container from "@/components/shared/container";
import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography";
import { getFormatedImage, getStrapiData } from "@/utils";
import { MASTER_TAG } from "@/utils/constants";
import qs from "qs";

const QUERY = qs.stringify({
  populate: ["image", "price", "affiliates"],
  fields: ["name"],
  pagination: {
    start: 0,
    limit: 5,
  },
});

interface ProductPrice {
  discount: number;
  regular: number;
}

interface Product {
  name: string;
  image: {
    srcs: {
      small: string;
    };
    alt: string;
  };
  price: ProductPrice;
  url: string;
}

async function Products() {
  const products = await getStrapiData("products", QUERY, {
    tags: [MASTER_TAG, "travelEssentials"],
  });

  const essentialsProducts: Product[] = products.data.map((product: any) => {
    const { name, image, price, affiliates } = product.attributes;
    return {
      name,
      image: getFormatedImage(image),
      price,
      url: affiliates[0]?.url || "#",
    };
  });

  return (
    <SectionLayout
      title="Travel Essentials"
      description="Discover must-have items for your next adventure"
      background="bg2"
    >
      <Container maxWidth="lg">
        <div className="products">
          {essentialsProducts.map((product) => (
            <ProductCard key={product.url} product={product} />
          ))}
        </div>
      </Container>
    </SectionLayout>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      className="product link"
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CustomImage
        className="product__image"
        src={product.image.srcs.small}
        alt={product.image.alt}
        sizes="(max-width: 600px) 30vw, (max-width: 900px) 25vw, (max-width: 1200px) 20vw, 18vw"
      />
      <div className="product__content">
        <ProductPrice price={product.price} />
        <Typography className="product__name" variant="h4" component="h2">
          {product.name}
        </Typography>
      </div>
    </Link>
  );
}

function ProductPrice({ price }: { price: ProductPrice }) {
  const hasDiscount =
    price.discount && price.discount !== 0 && price.discount < price.regular;

  if (!hasDiscount) {
    return (
      <Typography className="product__price--active" variant="body2">
        ${price.regular}
      </Typography>
    );
  }

  return (
    <div className="product__price">
      <Typography className="product__price--active" variant="body2">
        ${price.discount}
      </Typography>
      <Typography className="product__price--disabled" variant="body2">
        ${price.regular}
      </Typography>
    </div>
  );
}

export default Products;
