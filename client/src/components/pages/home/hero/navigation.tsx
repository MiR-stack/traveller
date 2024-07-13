import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useSwiper } from "swiper/react";

const Navigation = () => {
  const swiper = useSwiper();

  return (
    <div className="slider-navigation">
      <FaLongArrowAltLeft
        className="slider-navigation--item"
        onClick={() => swiper.slidePrev()}
      />
      <FaLongArrowAltRight
        className="slider-navigation--item"
        onClick={() => swiper.slideNext()}
      />
    </div>
  );
};

export default Navigation;
