import styles from "./CommunityWrite.module.scss";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export default function CommunityWrite() {
  const [communityData, setCommunityData] = useState(null); // new state for community data
  const { community_id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/community/getcommunity/${community_id}`
      )
      .then((response) => {
        if (response.data.result) {
          setCommunityData(response.data.data);
        } else {
          console.error("커뮤니티 데이터를 불러오는데 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.error(
          "커뮤니티 데이터를 불러오는 API 호출에 실패하였습니다:",
          error
        );
      });
  }, [community_id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBack = () => {
    navigator(`/communityboard/community/${community_id}/communityinnerboard/`);
    window.location.reload();
  };

  const onValid = (data) => {
    const postData = {
      title: data.title,
      category:
        data.category === "자유게시판"
          ? `${community_id}_자유`
          : `${community_id}_공지`,
      content: data.content,
    };

    axios
      .post(`${process.env.REACT_APP_HOST}/board/boardsubmit`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        handleBack();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.bg1}>
          <h2>
            📃{communityData ? communityData.community_name : "Loading..."}{" "}
            소모임 게시글 작성
          </h2>
        </div>
        <div className={styles.bg2}>
          <form onSubmit={handleSubmit(onValid)}>
            <div>
              게시판
              <div
                className={styles["board-type-container"]}
                {...register("category")}
              >
                <select className={styles["board-type-select"]}>
                  <option>자유게시판</option>
                  <option>공지게시판</option>
                </select>
              </div>
              <br />
              제목
              <div className={styles["title-container"]}>
                <br />
                <input
                  type="text"
                  className={styles["title-text"]}
                  placeholder="  제목을 입력해주세요"
                  {...register("title", {
                    required: "제목은 필수로 입력해야 합니다",
                  })}
                />{" "}
                {errors.title && (
                  <small role="alert" className={styles.error}>
                    {errors.title.message}
                  </small>
                )}
              </div>
              <br />
              <div className={styles["contents"]}>
                내용
                <br />
                <textarea
                  className={styles["contents-text"]}
                  {...register("content", {
                    required: "내용은 필수로 입력해야 합니다",
                  })}
                ></textarea>{" "}
                {errors.content && (
                  <small role="alert" className={styles.error}>
                    {errors.content.message}
                  </small>
                )}
              </div>
              <div className={styles.buttonsDiv}>
                <div className={styles["buttonsBar1"]}>
                  <button type="submit" className={styles["submit-button"]}>
                    등록
                  </button>
                  {/* <label className={styles["upload-button"]} htmlFor="picture">
                    사진 업로드
                    <input
                      {...register("image")}
                      id="picture"
                      type="file"
                      className={styles["hidden"]}
                      accept="image/*"
                      style={{ display: "none" }}
                      // formData()로 파일을 업로드할 때 encType 속성을 아래와 같이 명시해주어야 한다
                      encType="multipart/form-data"
                    />
                  </label> */}
                </div>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles["back-button"]}
                >
                  목록으로
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
