import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import "./MakeCommunity.scss";
import AxiosMockAdapter from "axios-mock-adapter";

export default function MakeCommunity() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  //가짜 api
  // axios 인스턴스 생성
  const axios_fake = axios.create();
  const mock = new AxiosMockAdapter(axios_fake);

  mock.onPost("/user/signin").reply(200, {
    user_id: "로그인한 유저testUser",
    // ... 기타 필요한 필드들
  });

  const communityList = [];
  // "/communityboard/makecommunity" 요청에 대한 가짜 응답
  mock.onPost("/communityboard/makecommunity").reply((config) => {
    const newCommunity = JSON.parse(config.data); // 요청 본문을 파싱
    communityList.push(newCommunity); // 파싱한 데이터를 배열에 추가
    return [200, { message: "커뮤니티 생성에 성공했습니다." }]; // 응답을 반환
  });

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios_fake.post("/user/signin");
        setLoggedInUserId(response.data.user_id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // 서버에 데이터를 전송하는 코드를 여기에 작성합니다.
    const payload = {
      manager_user_id: loggedInUserId,
      region: data.region,
      groupName: data.groupName,
      groupIntro: data.groupIntro,
    };
    try {
      const response = await axios_fake.post(
        "/communityboard/makecommunity",
        payload
      );
      console.log(response.data); // <-- 서버로부터의 응답을 콘솔에 출력
    } catch (error) {
      console.error(error); // 에러 처리
    }
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
