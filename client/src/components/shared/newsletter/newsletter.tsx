import CustomImage from "../bgImageContainer/bgImageContainer";
import Typography from "../typography";
import "@/styles/components/shared/newsletter.scss";
import Container from "../container";
import NewsletterForm from "./newsletterForm";
import { getFormatedImage, getStrapiData } from "@/utils";
import qs from "qs";
import { MASTER_TAG } from "@/utils/constants";

const query = qs.stringify({
  populate: ["image"],
  fields: ["name", "short_description"],
});

async function Newsletter() {
  const { data } = await getStrapiData("newsletter", query, {
    tags: [MASTER_TAG, "newsletter"],
  });

  const { name, short_description, image: imageRes } = data.attributes;

  const image = getFormatedImage(imageRes);

  return (
    <section className="newsletter">
      <Container maxWidth="xlg">
        <div className="newsletter__container">
          <CustomImage
            className="newsletter__image"
            src={image?.srcs.medium || ""}
            alt={""}
            sizes={`(max-width:768px) 0vw,(max-width:1200px) 30vw,35vw`}
          />
          <div className="newsletter__wraper">
            <Typography variant="h2" className="newsletter__title">
              {name}
            </Typography>
            <Typography className="newsletter__description" variant="body1">
              {short_description}
            </Typography>
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Newsletter;
