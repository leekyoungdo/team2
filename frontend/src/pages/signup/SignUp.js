import { useForm } from 'react-hook-form';
import './signup.scss';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <h2>회원가입</h2>
      <hr />
      아이디 <input type="text" placeholder="아이디를 입력해 주세요" />
      <br />
      <br />
      이메일 <input type="text" placeholder="이메일을 입력해 주세요" />
      <br />
      <br />
      비밀번호{' '}
      <input type="password" placeholder="4~10자의 영문, 숫자를 입력해주세요" />
      <br />
      <br />
      비밀번호 확인{' '}
      <input type="password" placeholder="비밀번호를 한 번 더 입력해주세요" />
      <br />
      <br />
      반려견 유무
      <br /> 유<input type="radio" name="dog" />
      무<input type="radio" name="dog" />
      <br />
      <br />
      반려견 사진
      <br />
      <br />
      반려견 소개
      <br />
      <textarea>당신의 반려견을 소개해 주세요</textarea>
      <br />
      <br />
      <button type="submit">가입하기</button>
    </>
  );
}
