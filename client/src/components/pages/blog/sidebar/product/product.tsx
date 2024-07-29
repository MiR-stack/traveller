import React from "react";
import SectionLayout from "../../sectionLayout";
import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import { formatedImageTypes } from "@/types";
import Typography from "@/components/shared/typography";
import Link from "next/link";

export interface productPropsType {
  name: string;
  image: formatedImageTypes;
  affiliats: {
    name: string;
    url: string;
  }[];
}

function Product({ name, image, affiliats }: productPropsType) {
  return (
    <SectionLayout title="travel frined">
      <CustomImage
        className="blog-product"
        src={image.srcs.thumbnail}
        alt={image.alt}
      >
        <div className="blog-product-content">
          <Typography className="blog-product--name" variant="h4">
            {name}
          </Typography>
          <Link className="blog-product--link link" href={affiliats[0].url}>
            check price on {affiliats[0].name}
          </Link>
        </div>
      </CustomImage>
    </SectionLayout>
  );
}

export default Product;
