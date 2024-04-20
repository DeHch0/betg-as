import React, { useEffect, useCallback, useState, useRef } from "react";

import { useDebounce } from "./hooks/use-debounce";
import { getAllMockImages } from "../../services/image-service";

const recordsPerLoad = 10;

const PreloadImage = ({ src }) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  return null;
};

const Carousel = () => {
  let endY = 0;
  let startY = 0;
  const imagesWrapperRef = useRef(null);

  const [page, setPage] = useState(1);
  console.log("page", page);
  const [imgIndex, setImgIndex] = useState(0);
  const [imagesData, setImagesData] = useState();
  console.log("imagesData", imagesData);
  const [activeImage, setActiveImage] = useState();

  const setWheelData = (...args) => {
    const val = args?.[0];
    console.log("val", val);

    if (imgIndex + 1 === imagesData?.length) {
      setImgIndex(0);
    } else if (val > 0) {
      setImgIndex((old) => (old += 1));
    } else if (val < 0) {
      setImgIndex((old) => (old -= 1));
    }
  };

  const setTouchData = (...args) => {
    console.log("args", args);
  };

  const handleTouchStart = (event) => {
    // Get the starting Y position of the touch
    startY = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    // Get the ending Y position of the touch
    endY = event.changedTouches[0].clientY;

    // Calculate the difference between starting and ending Y positions
    const deltaY = endY - startY;

    // Determine if the swipe is upward or downward based on deltaY
    if (deltaY > 0 && imgIndex > 0) {
      console.log("Swiped downward");
      setImgIndex((old) => (old -= 1));
      // Do something for downward swipe
    } else if (deltaY < 0) {
      console.log("Swiped upward");
      setImgIndex((old) => (old += 1));
      // Do something for upward swipe
    } else {
      console.log("No vertical swipe");
      // No vertical swipe occurred
    }
  };

  const debounce = useDebounce(setWheelData, 60);
  const debounceTouch = useDebounce(setTouchData, 120);

  const getImages = useCallback(async () => {
    const data = await getAllMockImages(page);

    if (page === 1) {
      setActiveImage(data?.[0]);
    }

    setImagesData((old) => {
      if (old?.length) {
        return [...old, ...data];
      } else {
        return data;
      }
    });
  }, [page]);

  useEffect(() => {
    console.log("imgIndex", imgIndex);
    if (
      imgIndex % recordsPerLoad === 5 &&
      imgIndex >= page * recordsPerLoad - 5
    ) {
      setPage((old) => (old += 1));
    }

    setActiveImage(imagesData?.[imgIndex]);
  }, [imgIndex, imagesData]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const handleWheel = (event) => {
    const scrollSpeed = event.deltaY;
    console.log("scrollSpeed", scrollSpeed);

    debounce(scrollSpeed);
  };

  return (
    <>
      <div
        id="images-wrapper"
        ref={imagesWrapperRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={activeImage?.id}
          src={activeImage?.urls?.full}
          alt={activeImage?.links?.slug}
        />

        {/* {imagesData &&
          imagesData.slice(-recordsPerLoad).map((elm) => {
            return <PreloadImage src={elm?.urls?.full} key={elm.id} />;
          })} */}

        {imagesData &&
          imagesData.map((elm) => {
            return <PreloadImage src={elm?.urls?.full} />;
          })}
      </div>
    </>
  );
};

export default Carousel;
