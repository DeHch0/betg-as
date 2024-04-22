import React from "react";

import { useCarousel } from "./hooks/use-carousel";
import PreloadImage from "../../common/components/preload-image/preload-image";

import { ReactComponent as Wave1 } from "../../assets/wave1.svg";
import { ReactComponent as Wave2 } from "../../assets/wave2.svg";

import styles from "./carousel.module.scss";

const Carousel = ({ service }) => {
  const {
    handleWheel,
    handleTouchEnd,
    handleTouchStart,
    imagesData,
    activeImage,
    imagesWrapperRef,
  } = useCarousel(service);

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
          <Wave1 />

          <Wave2 />
        </div>
      </div>
    </>
  );
};

export default Carousel;
