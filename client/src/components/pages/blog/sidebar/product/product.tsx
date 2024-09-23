import SectionLayout from "../../sectionLayout";
import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import { imageTypes } from "@/types";
import Typography from "@/components/shared/typography";
import Link from "next/link";
import { getFormatedImage } from "@/utils/utils";

export interface ProductPropsType {
  id: number;
  name: string;
  image: imageTypes;
  affiliates: {
    name: string;
    url: string;
  }[];
}

export interface ProductComponentProps {
  product: {
    data: {
      attributes: ProductPropsType;
    };
  };
}

const Product: React.FC<ProductComponentProps> = ({ product }) => {
  const { name, image: imageRes, affiliates } = product.data.attributes;

  const image = getFormatedImage(imageRes);

  if (!image || !affiliates[0]) {
    return <div>Error: Missing product image or affiliate data.</div>;
  }

  return (
    <SectionLayout title="Travel Friend">
      <CustomImage
        className="blog-product"
        src={image.srcs.small ?? ""}
        alt={image.alt ?? "Product Image"}
      >
        <div className="blog-product-content">
          <Typography className="blog-product--name" variant="h4">
            {name}
          </Typography>
          <AffiliateLink name={affiliates[0].name} url={affiliates[0].url} />
        </div>
      </CustomImage>
    </SectionLayout>
  );
};

const AffiliateLink: React.FC<{ name: string; url: string }> = ({
  name,
  url,
}) => (
  <Link
    className="blog-product--link link"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    Check price on {name}
  </Link>
);

export default Product;
