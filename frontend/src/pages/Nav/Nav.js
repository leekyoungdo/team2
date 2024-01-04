import styles from "./Nav.module.scss";
import React, { useState, useRef, useEffect } from "react";

export default function Nav() {

    return(
        <>
        <div className={styles.navContainer}>
          <ul>
            <div className={styles.logo} ><a href="/">멍멍투게더</a></div>
            <li><a className={styles.home} href="/">홈</a></li>
            <li><a href="/board">게시판</a></li>
            <li><a href="/communityboard">소모임</a></li>
            <li><a href="/shelterboard">유기견 공고</a></li>
            <li><a href="/user/signin">로그인</a></li>
          </ul>
        </div>
        </> 
    );
  }
  