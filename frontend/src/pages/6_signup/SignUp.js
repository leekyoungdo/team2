import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.scss';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // input값을 가져오는 함수
  } = useForm();

  const navigator = useNavigate();

  const onValid = (data) => {
    console.log(data);
    axios
      .post('http://localhost:8000/user/signup', {
        user_id: data.user_id,
        password: data.password,
        nickname: data.nickname,
        email: data.email,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.result) {
          alert('로그인 성공!');
          navigator('/'); // home으로 이동
        } else {
          alert('회원가입에 실패하였습니다.');
        }
      })
      .catch((err) => alert('error!'));
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
          {...register('user_id', {
            required: '아이디는 필수로 입력해야 합니다',
          })}
        />
        <br />
        <br />
        닉네임{' '}
        <input
          type="text"
          placeholder="닉네임"
          {...register('nickname', {
            required: '닉네임은 필수로 입력해야 합니다',
          })}
        />
        <br />
        <br />
        이메일{' '}
        <input
          type="text"
          placeholder="이메일을 입력해주세요"
          {...register('email', {
            required: '이메일은 필수로 작성해야 합니다',
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
              message: '올바른 형태의 이메일을 입력해 주세요', // 오류 메세지
            },
          })}
        />
        <br />
        <br />
        비밀번호{' '}
        <input
          type="password"
          {...register('password', {
            required: '비밀번호는 필수로 작성해야 합니다',
            pattern: {
              // value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{2,12}$/,
              message: '올바른 형태의 비밀번호를 입력해 주세요',
            },
          })}
          title="영어 소문자, 숫자로 조합된 2~12자로 입력해주세요"
        />{' '}
        {errors.password && (
          <small role="alert" style={{ color: 'red' }}>
            {errors.password.message}
          </small>
        )}
        <br />
        <br />
        비밀번호 확인{' '}
        <input
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          {...register('confirmPassword', {
            required: '비밀번호 확인은 필수로 작성해야 합니다',
            validate: {
              check: (val) => {
                if (getValues('password') !== val) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              },
            },
          })}
        />{' '}
        {errors.confirmPassword && (
          <small role="alert" style={{ color: 'red' }}>
            {errors.confirmPassword.message}
          </small>
        )}
        <br />
        <br />
        반려견 유무
        {/* {...register } 해야 함 */}
        <br /> 유<input type="radio" name="dog" />
        무<input type="radio" name="dog" />
        <br />
        <br />
        반려견 사진 <br />
        <input
          {...register('image')}
          id="picture"
          type="file"
          className="hidden"
          accept="image/*"
          // onChange={props.savePreViewFile}
          // ref={props.imgRef}
        />
        <br />
        <br />
        반려견 소개
        <br />
        <textarea
          placeholder="당신의 반려견을 소개해 주세요"
          name="introduction"
        />
        <br />
        <br />
        <button type="submit">가입하기</button>
      </form>
    </>
  );
}
