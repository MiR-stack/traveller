"use client";

import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "@/styles/components/utils/goTop.scss";

const GoToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={"goToTop"}
          aria-label="Go to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
