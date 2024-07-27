import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography/typography";
import "@/styles/components/shared/brand.scss";
import Link from "next/link";

const brandData = {
  logo: "",
  name: "traveller",
  moto: "Collect moments, not things. Travel with us!",
};

interface brandPropsType {
  moto?: boolean;
  variant?: "extended" | "nav" | "footer";
}

function Brand({ moto = false, variant = "extended" }: brandPropsType) {
  return (
    <section className={`brand  ${variant ? `${variant}-brand` : ""}`}>
      {brandData.logo ? (
        <CustomImage
          src={brandData.logo}
          className={`brand-logo ${variant ? `${variant}-brand-logo` : ""}`}
          alt="brand logo"
          sizes="30vw"
        />
      ) : (
        <div className="brand-container">
          <Typography variant="h3" component="h1">
            <Link
              href={"/"}
              className={`brand-name link ${
                variant ? `${variant}-brand-name` : ""
              }`}
            >
              {brandData.name}
            </Link>
          </Typography>
          {brandData.moto && moto && (
            <Typography className="brand-moto" variant="body2">
              {brandData.moto}
            </Typography>
          )}
        </div>
      )}
    </section>
  );
}

export default Brand;
