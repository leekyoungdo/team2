import styles from "./Nav.module.scss";
import React, { useState, useRef, useEffect } from "react";

export default function Nav() {

    return(
        <>
        <div className="{styles.navContainer}">
          <ul>
            <div><a>멍멍투게더</a></div>
            <li><a className={styles.home} href="#">홈</a></li>
            <li><a className={styles.category} href="#">게시판</a></li>
            <li><a href="#">소모임</a></li>
            <li><a href="#">유기견 공고</a></li>
            <li><a href="#">로그인</a></li>
          </ul>
        </div>
        </> 
    );
  }
  