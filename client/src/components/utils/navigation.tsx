import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useSwiper } from "swiper/react";
import "@/styles/components/utils.scss";

interface slideNavigationPropTypes {
  className?: string;
}

const Navigation = ({ className }: slideNavigationPropTypes) => {
  const swiper = useSwiper();

  return (
    <div className={`slider-navigation ${className ?? ""}`}>
      <FaLongArrowAltLeft
        className="slider-navigation__button"
        onClick={() => swiper.slidePrev()}
      />
      <FaLongArrowAltRight
        className="slider-navigation__button"
        onClick={() => swiper.slideNext()}
      />
    </div>
  );
};

export default Navigation;
