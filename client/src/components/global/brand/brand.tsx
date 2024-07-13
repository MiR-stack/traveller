import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography/typography";
import "@/styles/components/global/brand.scss";

const brandData = {
  logo: "",
  name: "traveller",
  moto: "Collect moments, not things. Travel with us!",
};

function Brand() {
  return (
    <section className="brand">
      {brandData.logo ? (
        <CustomImage
          src={brandData.logo}
          className="brand-logo"
          alt="brand logo"
          sizes="30vw"
        />
      ) : (
        <div className="brand-container">
          <Typography className="brand-name" variant="h1">
            {brandData.name}
          </Typography>
          <Typography className="brand-moto" variant="body2">
            {brandData.moto}
          </Typography>
        </div>
      )}
    </section>
  );
}

export default Brand;
