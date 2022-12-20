import SlickSlider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './slider.module.css'

interface SliderType extends Settings {
  images?: string[];
}
const Slider = ({
  images = [],
  dots = true,
  infinite = true,
  speed = 500,
  slidesToScroll = 1,
  rtl = true,
  adaptiveHeight = true,
  autoplay=true,
}: SliderType) => {
  return (
    <div>
      <SlickSlider
        {...{
          dots,
          infinite,
          speed,
          slidesToScroll,
          rtl,
          adaptiveHeight,
          autoplay,
        }}
      >
        {images.map((image) => {
          return (
            <div className={styles.slideContainer}>
              <img src={image} alt='' />
            </div>
          );
        })}
      </SlickSlider>
    </div>
  );
};

export default Slider;
