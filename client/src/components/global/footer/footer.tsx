import Container from "@/components/shared/container";
import Typography from "@/components/shared/typography";
import React from "react";
import { socialMedias } from "../navbar/socialMedias/socialMedias";
import Link from "next/link";
import { navData } from "../navbar/nav.data";
import { blogsData } from "@/components/pages/home/blogsData";
import "@/styles/components/global/footer.scss";
import { footerData } from "./footer.data";
import { FaRegCopyright } from "react-icons/fa6";
import Brand from "@/components/shared/brand";

function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="xlg">
        <div className="footer-container">
          <div className="footer-brand-container">
            <Brand variant="footer" />
            <Typography className="footer-brand-description" variant="body1">
              {footerData.brand.description}
            </Typography>
            <div className="footer-brand-medias">
              {socialMedias.map((media) => (
                <Link
                  className="link"
                  href={media.url}
                  key={media.name}
                  aria-label={media.name}
                >
                  {media.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-destinations">
            <Typography className="footer-title" variant="h3">
              top destinations
            </Typography>
            <div className="footer-wraper">
              {navData.destinations.slice(0, 4).map((destination) => (
                <Link
                  className="link footer-destination"
                  href={destination.slug}
                  key={destination.slug}
                >
                  {destination.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-posts">
            <Typography className="footer-title" variant="h3">
              popular posts
            </Typography>
            <div className="footer-wraper">
              {blogsData.slice(0, 3).map((blog) => (
                <div className="footer-blog" key={blog.slug}>
                  <Link className="footer-blog-title link" href={blog.slug}>
                    {blog.title}
                  </Link>
                  <Typography className="footer-blog-country" variant="body2">
                    {blog.country.name}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <div className="footer-bottom">
        <p className="footer-bottom-text">
          <FaRegCopyright /> 2024 Traveller blog. All right Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
