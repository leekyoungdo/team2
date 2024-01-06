import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import "./MakeCommunity.scss";
import AxiosMockAdapter from "axios-mock-adapter";
import { useNavigate } from "react-router-dom";

export default function MakeCommunity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("community_name", data.community_name);
    formData.append("community_local", data.community_local);
    formData.append("introduce", data.introduce);

    axios
      .post(
        `${process.env.REACT_APP_HOST}/community/createcommunity`,
        {
          community_name: data.community_name,
          community_local: data.community_local,
          introduce: data.introduce,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/communityboard/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h3>돌아가기</h3>
      <h1>👨‍👩‍👧‍👦 소모임 만들기</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          활동 지역을 입력해주세요. (**시 **구)
          <br />
          <input
            {...register("community_local", {
              required: true,
              pattern: /^[가-힣]*시 [가-힣]*구$/,
            })}
            placeholder="(ex.서울시 성동구)"
          />
          {errors.community_local ? (
            <p className="alert">활동 지역을 입력해주세요.</p>
          ) : (
            <p className="placeholder">-</p> //
          )}
          <br />
          <br />
        </label>

        <label>
          이름을 정해주세요.
          <br />
          <input
            {...register("community_name", { required: true, minLength: 5 })}
            placeholder="(ex.동네 산책 모임)"
          />
          {errors.community_name &&
          errors.community_name.type === "required" ? (
            <p className="alert">소모임 이름을 입력해주세요.</p>
          ) : (
            <p></p> // 알림이 뜨지 않았을 때 공간을 차지하는 요소
          )}
          {errors.community_name &&
          errors.community_name.type === "minLength" ? (
            <p className="alert">소모임 이름은 최소 5자 이상이어야 합니다.</p>
          ) : (
            <p className="placeholder">-</p> // 알림이 뜨지 않았을 때 공간을 차지하는 요소
          )}
          <br />
          <br />
        </label>

        <label>
          어떤 활동을 진행하는 모임인지 설명해주세요.
          <br />
          <textarea
            {...register("introduce", { required: true })}
            placeholder="주말 점심마다 모여서 산책해봐요!"
          />
          {errors.introduce ? (
            <p className="alert">소모임 설명을 입력해주세요.</p>
          ) : (
            <p className="placeholder">-</p> // 알림이 뜨지 않았을 때 공간을 차지하는 요소
          )}
          <br />
          <br />
        </label>
        <input type="submit" value="소모임 만들기" />
      </form>
    </>
  );
}
