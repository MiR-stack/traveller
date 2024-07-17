import React from "react";
import SectionLayout from "../sectionLayout";
import Link from "next/link";
import Container from "@/components/shared/container";
import { productsData } from "./products.data";
import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography";

function Products() {
  return (
    <SectionLayout
      title="travel essentials"
      description="Lorem   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
      background="bg2"
    >
      <Container maxWidth="lg">
        <div className="products">
          {productsData.map((product) => (
            <Link
              className="product link"
              key={product.slug}
              href={product.slug}
            >
              <CustomImage
                className="product-image"
                src={product.image.url}
                alt={product.image.alt}
                sizes={`(max-width:600px) 30vw,(max-widht:900px) 25vw,(max-width:1200px)20vw ,18vw`}
              />
              <div className="product-content">
                {product.price.discounted !== 0 &&
                product.price.discounted < product.price.base ? (
                  <div className="product-price">
                    <Typography
                      className="product-price--active"
                      variant="body2"
                    >
                      ${product.price.discounted}
                    </Typography>
                    <Typography
                      className="product-price--disabled"
                      variant="body2"
                    >
                      ${product.price.base}
                    </Typography>
                  </div>
                ) : (
                  <Typography className="product-price--active" variant="body2">
                    ${product.price.base}
                  </Typography>
                )}

                <Typography
                  className="product-name"
                  variant="h4"
                  component="h2"
                >
                  {product.name}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </SectionLayout>
  );
}

export default Products;
