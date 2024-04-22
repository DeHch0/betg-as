import React from "react";

import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <span className={styles.title}>Betty</span>
    </div>
  );
};

export default Navbar;
