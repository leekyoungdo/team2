import React from "react";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MakeCommunity.module.scss";
import AxiosMockAdapter from "axios-mock-adapter";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function MakeCommunity() {
  const { community_id } = useParams();
  const location = useLocation();
  const update_D = location.state?.value ?? "기본값";

  const [community_Data, setCommunity_Data] = useState({
    community_local: "",
    community_name: "",
    introduce: "",
  });

  useEffect(() => {
    if (update_D?.communityData) {
      setCommunity_Data((prevData) => ({
        ...prevData,
        ...update_D.communityData,
      }));
    }
  }, [update_D]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const sendRequest = (method, url, data) => {
    axios[method](`${process.env.REACT_APP_HOST}${url}`, data, {
      withCredentials: true,
    })
      .then(() => {
        navigate("/communityboard/");
      })
      .catch(console.error);
  };

  const onSubmit = (data) => {
    const requestMethod = update_D !== "기본값" ? "patch" : "post";
    const url =
      update_D !== "기본값"
        ? `/community/updatecommunity/${community_id}`
        : "/community/createcommunity";

    sendRequest(requestMethod, url, data);
  };

  return (
    <>
      <div className={styles.bg1}>
        <h1>👨‍👩‍👧‍👦 소모임 만들기</h1>
      </div>
      <div className={styles.bg2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            활동 지역을 입력해주세요. (**시 **구)
            <br />
            <input
              className={styles.textarea}
              {...register("community_local", {
                required: true,
                pattern: /^[가-힣]*시 [가-힣]*구$/,
              })}
              placeholder="(ex.서울시 성동구)"
              value={community_Data.community_local}
              onChange={(e) =>
                setCommunity_Data({
                  ...community_Data,
                  community_local: e.target.value,
                })
              }
            />
            {errors.community_local ? (
              <p className={styles.alert}>
                활동 지역을 형식에 맞게 입력해주세요. (ex.서울시 성동구)
              </p>
            ) : (
              <p className={styles.placeholder}>&nbsp;</p>
            )}
            <br />
            <br />
          </label>

          <label>
            이름을 정해주세요.
            <br />
            <input
              className={styles.textarea}
              {...register("community_name", { required: true, minLength: 3 })}
              placeholder="(ex.동네 산책 모임)"
              value={community_Data.community_name}
              onChange={(e) =>
                setCommunity_Data({
                  ...community_Data,
                  community_name: e.target.value,
                })
              }
            />
            {errors.community_name?.type === "required" ? (
              <p className={styles.alert}>
                소모임 이름은 최소 3자 이상 입력해주세요.
              </p>
            ) : (
              <p></p>
            )}
            {errors.community_name?.type === "minLength" ? (
              <p className={styles.alert}>
                소모임 이름은 최소 5자 이상이어야 합니다.
              </p>
            ) : (
              <p className={styles.placeholder}>&nbsp;</p>
            )}
            <br />
            <br />
          </label>

          <label>
            어떤 활동을 진행하는 모임인지 설명해주세요.
            <br />
            <textarea
              className={`${styles.textarea} ${styles.big}`}
              {...register("introduce", { required: true })}
              placeholder="(ex.주말 점심마다 모여서 산책해봐요!)"
              value={community_Data.introduce}
              onChange={(e) =>
                setCommunity_Data({
                  ...community_Data,
                  introduce: e.target.value,
                })
              }
            />
            {errors.introduce ? (
              <p className={styles.alert}>소모임 설명을 입력해주세요.</p>
            ) : (
              <p className={styles.placeholder}>&nbsp;</p>
            )}
            <br />
            <br />
          </label>
          <input
            className={styles.submitButton}
            type="submit"
            value="소모임 생성하기"
          />
        </form>
      </div>
    </>
  );
}
