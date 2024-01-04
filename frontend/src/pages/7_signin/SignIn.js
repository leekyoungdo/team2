import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signin.module.scss';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigator = useNavigate();

  const onValid = (data) => {
    console.log(process.env.REACT_APP_HOST, data);
    axios
      .post(
        `${process.env.REACT_APP_HOST}/user/signin`,
        {
          user_id: data.user_id,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.result) {
          alert('로그인 성공ㅎ');
          navigator('/'); // home으로 이동
        } else {
          alert('로그인에 실패하였습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('error!');
      });
  };

  const onInvalid = (err) => {
    console.log('로그인 실패', err);
  };

  return (
    <>
      <h2>로그인</h2>
      <hr />

      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          {...register('user_id', {
            required: '아이디는 필수로 입력해야 합니다',
          })}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register('password', {
            required: '비밀번호는 필수로 입력해야 합니다',
          })}
        />
        {errors.password && <span>비밀번호를 입력해주세요.</span>}
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
      <br />
      <br />
      <button onClick={() => navigator('/user/signup')}>회원가입</button>
    </>
  );
}
