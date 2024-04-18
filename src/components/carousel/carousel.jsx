import React, { useEffect, useCallback, useState, useRef } from "react";

import { getAllMockImages } from "../../services/image-service";
import { useDebounce } from "./hooks/use-debounce";

const recordsPerLoad = 10;

const PreloadImage = ({ src }) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  return null;
};

const Carousel = () => {
  const imagesWrapperRef = useRef(null);

  const [page, setPage] = useState(1);
  console.log("page", page);
  const [imgIndex, setImgIndex] = useState(0);
  const [imagesData, setImagesData] = useState();
  console.log("imagesData", imagesData);
  const [activeImage, setActiveImage] = useState();

  const setWheelData = (...args) => {
    const val = args?.[0];

    if (imgIndex + 1 === imagesData?.length) {
      setImgIndex(0);
    } else if (val) {
      setImgIndex((old) => (old += 1));
    } else if (imgIndex > 0) {
      setImgIndex((old) => (old -= 1));
    }
  };

  const debounce = useDebounce(setWheelData, 60);

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

    debounce(scrollSpeed);
  };

  return (
    <>
      <div id="images-wrapper" ref={imagesWrapperRef} onWheel={handleWheel}>
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
