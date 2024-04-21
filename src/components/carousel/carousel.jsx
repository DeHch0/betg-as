import React from "react";

import PreloadImage from "../../common/components/preload-image/preload-image";

import styles from "./carousel.module.scss";
import { useCarousel } from "./hooks/use-carousel";

const Carousel = () => {
  const {
    handleWheel,
    handleTouchEnd,
    handleTouchStart,
    imagesData,
    activeImage,
    imagesWrapperRef,
  } = useCarousel();

  return (
    <>
      <div
        id="images-wrapper"
        ref={imagesWrapperRef}
        className={styles.imagesWrapper}
        onWheel={handleWheel}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        <img
          key={activeImage?.id}
          src={activeImage?.urls?.full}
          alt={activeImage?.links?.slug}
        />

        {imagesData &&
          imagesData.map((elm) => {
            return <PreloadImage src={elm?.urls?.full} />;
          })}

        <div className={styles.waves}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffeba5"
              fill-opacity="1"
              d="M0,96L30,96C60,96,120,96,180,106.7C240,117,300,139,360,165.3C420,192,480,224,540,240C600,256,660,256,720,240C780,224,840,192,900,186.7C960,181,1020,203,1080,202.7C1140,203,1200,181,1260,170.7C1320,160,1380,160,1410,160L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            ></path>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffeba5"
              fill-opacity="0.5"
              d="M0,224L34.3,218.7C68.6,213,137,203,206,208C274.3,213,343,235,411,234.7C480,235,549,213,617,192C685.7,171,754,149,823,133.3C891.4,117,960,107,1029,122.7C1097.1,139,1166,181,1234,170.7C1302.9,160,1371,96,1406,64L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Carousel;
