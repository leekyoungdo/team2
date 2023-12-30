import React from "react";
import { useForm } from "react-hook-form";
import "./MakeCommunity.scss";

export default function MakeCommunity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // 서버에 데이터를 전송하는 코드를 여기에 작성합니다.
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
            {...register("region", {
              required: true,
              pattern: /^[가-힣]*시 [가-힣]*구$/,
            })}
            placeholder="(ex.서울시 성동구)"
          />
          {errors.region ? (
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
            {...register("groupName", { required: true, minLength: 5 })}
            placeholder="(ex.동네 산책 모임)"
          />
          {errors.groupName && errors.groupName.type === "required" ? (
            <p className="alert">소모임 이름을 입력해주세요.</p>
          ) : (
            <p></p> // 알림이 뜨지 않았을 때 공간을 차지하는 요소
          )}
          {errors.groupName && errors.groupName.type === "minLength" ? (
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
            {...register("groupIntro", { required: true })}
            placeholder="주말 점심마다 모여서 산책해봐요!"
          />
          {errors.groupIntro ? (
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
