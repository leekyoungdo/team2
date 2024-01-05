import styles from "./UserProfile.module.scss";
import React, { useState, useRef, useEffect } from "react";

export default function UserProfile() {

    return(
        <>
        <div className={styles.profileContainer}>
            <div className={styles.profilePicture}>
              <img src="프로필 사진 URL" alt="프로필 사진" />
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.nickname}>닉네임</h2>
              <p className={styles.introduction}>슈나우져 5세</p>
              <button className={styles.messageButton}>쪽지 보내기</button>
            </div>
            <div className={styles.userPosts}>
              <h3>작성 글</h3>
              <ul>
                <li>작성 글 1</li>
                <li>작성 글 2</li>
                <li>작성 글 3</li>
              </ul>
            </div>
            <div className={styles.userComments}>
              <h3>작성 댓글</h3>
              <ul>
                <li>작성 댓글 1</li>
                <li>작성 댓글 2</li>
                <li>작성 댓글 3</li>
              </ul>
            </div>
        </div>
        </> 
    );
  }
  