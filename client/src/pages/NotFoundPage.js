import React from "react";
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./NotFound.scss";

const cx = classNames.bind(styles);

const NotFound = () => (
  <div className={cx("not-found")}>
    <div className={cx("description")}>
      404 page 
      <br /> 페이지를 찾을 수 없습니다. 
      <Link to="adminHome" className={cx("home")}>Home으로 가기</Link>
    </div>
  </div>
);

export default NotFound;