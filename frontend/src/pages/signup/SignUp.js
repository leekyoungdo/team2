import { useForm } from 'react-hook-form';
import './signup.scss';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    console.log('성공', data);
  };

  const onInvalid = (err) => {
    console.log('실패', err);
  };

  return (
    <>
      <h2>회원가입</h2>
      <hr />

      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        아이디{' '}
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          {...register('ID', {
            required: '아이디는 필수로 작성해야 합니다',
          })}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="닉네임"
          {...register('username', {
            required: '이름은 필수로 작성해야 합니다',
            // minLength: 2, // 2글자 이상 입력해야 함
            minLength: {
              // minLength는 객체로도 넘길 수 있다
              value: 2, // 최소값 지정
              message: '이름은 두 글자 이상 입력해야 합니다', // 최소값을 만족하지 못 했을 때, 발생시키는 오류 메시지
            },
          })}
        />
        <br />
        <br />
        이메일 <input type="text" placeholder="이메일을 입력해주세요" />
        <br />
        <br />
        비밀번호{' '}
        <input
          type="password"
          pattern="^(?=.*[a-z])(?=.*\d)[a-z\d]{4,10}$"
          title="영어 소문자, 숫자로 조합된 4~10자로 입력해주세요"
        />
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
        <textarea placeholder="당신의 반려견을 소개해 주세요" />
        <br />
        <br />
        <button type="submit">가입하기</button>
      </form>
    </>
  );
}
