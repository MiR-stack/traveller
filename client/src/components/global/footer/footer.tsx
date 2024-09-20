import React from "react";
import { FaRegCopyright } from "react-icons/fa6";
import Container from "@/components/shared/container";
import "@/styles/components/global/footer.scss";
import BrandSection from "./brandSection";
import DestinationsSection from "./destinationSection";
import PopularPostsSection from "./popuarPostsSection";

interface FooterProps {
  bg?: "bg1" | "bg2";
}

const Footer: React.FC<FooterProps> = ({ bg = "bg1" }) => {
  return (
    <footer className={`footer footer-${bg}`}>
      <Container maxWidth="xlg">
        <div className="footer-container">
          <BrandSection />
          <DestinationsSection />
          <PopularPostsSection />
        </div>
      </Container>
      <CopyrightSection />
    </footer>
  );
};

const CopyrightSection = () => (
  <div className="footer-bottom">
    <p className="footer-bottom-text">
      <FaRegCopyright /> 2024 Traveller blog. All right Reserved.
    </p>
  </div>
);

export default React.memo(Footer);
