import React from "react";

import Carousel from "../components/carousel/carousel";
import Navbar from "../common/components/navbar/navbar";

import { getAllMockImages } from "../services/image-service";

import styles from "./home-page.module.scss";

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <div id="wrapper" className={styles.wrapper}>
        <Carousel service={getAllMockImages} />
      </div>
    </div>
  );
};

export default HomePage;
