import { useEffect, useCallback, useState, useRef } from "react";

import { useDebounce } from "../../../common/hooks/use-debounce";

const totalRecords = process.env.REACT_APP_TOTAL_RECORDS || 100;
const recordsPerLoad = process.env.REACT_APP_LIMIT_RECORDS_PER_REQUEST || 10;

export const useCarousel = (service) => {
  let endY = 0;
  let startY = 0;
  const imagesWrapperRef = useRef(null);

  const [page, setPage] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);
  const [imagesData, setImagesData] = useState();
  const [activeImage, setActiveImage] = useState();

  const setWheelData = (...args) => {
    const val = args?.[0];

    if (imgIndex + 1 === imagesData?.length) {
      setImgIndex(0);
    } else if (val > 0) {
      setImgIndex((old) => (old += 1));
    } else if (val < 0 && imgIndex > 0) {
      setImgIndex((old) => (old -= 1));
    }
  };

  const debounce = useDebounce(setWheelData, 60);

  const handleTouchStart = (event) => {
    startY = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    endY = event.changedTouches[0].clientY;
    const deltaY = endY - startY;

    if (deltaY > 0 && imgIndex > 0) {
      setImgIndex((old) => (old -= 1));
    } else if (deltaY < 0) {
      setImgIndex((old) => (old += 1));
    }
  };

  const getImages = useCallback(async () => {
    if (page * recordsPerLoad > totalRecords) {
      return;
    }

    const data = await service(page);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (
      imgIndex % recordsPerLoad === 5 &&
      imgIndex >= page * recordsPerLoad - 5
    ) {
      setPage((old) => (old += 1));
    }

    setActiveImage(imagesData?.[imgIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgIndex, imagesData]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const handleWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const scrollSpeed = event.deltaY;

    debounce(scrollSpeed);
  };

  return {
    handleWheel,
    handleTouchEnd,
    handleTouchStart,
    imagesData,
    activeImage,
    imagesWrapperRef,
  };
};
