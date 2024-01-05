import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './signup.module.scss';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigator = useNavigate();

  const onValid = (data) => {
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_HOST}/user/signup`, {
        user_id: data.user_id,
        password: data.password,
        nickname: data.nickname,
        email: data.email,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.result) {
          alert('회원가입 성공!');
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
      <div className={styles.container}>
        <p>회원가입</p>

        <form
          onSubmit={handleSubmit(onValid, onInvalid)}
          className={styles.form}
        >
          <div className={styles.essential}>* 필수 입력 사항</div>
          <div className={styles.divisionLine}></div>

          <div className={`${styles.formGroup} ${styles.id}`}>
            <label htmlFor="user_id">
              아이디 <span className={styles.star}>*</span>
            </label>
            {errors.user_id && (
              <small role="alert" className={styles.error}>
                {errors.user_id.message}
              </small>
            )}
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="user_id"
                placeholder="아이디를 입력해주세요"
                {...register('user_id', {
                  required: '아이디는 필수로 작성해야 합니다',
                })}
              />
              <button className={styles.idButton}>중복확인</button>
            </div>
          </div>

          <div className={`${styles.formGroup} ${styles.nickname}`}>
            <label htmlFor="nickname">
              닉네임 <span className={styles.star}>*</span>
            </label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임"
              {...register('nickname', {
                required: '닉네임은 필수로 작성해야 합니다',
              })}
            />
            {errors.nickname && (
              <small role="alert" className={styles.error}>
                {errors.nickname.message}
              </small>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.email}`}>
            <label htmlFor="email">
              이메일 <span className={styles.star}>*</span>
            </label>
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력해주세요"
              {...register('email', {
                required: '이메일은 필수로 작성해야 합니다',
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
                  message: '올바른 형태의 이메일을 입력해 주세요',
                },
              })}
            />
            {errors.email && (
              <small role="alert" className={styles.error}>
                {errors.email.message}
              </small>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.pw}`}>
            <label htmlFor="password">
              비밀번호 <span className={styles.star}>*</span>
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: '비밀번호는 필수로 작성해야 합니다',
                pattern: {
                  // value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{2,12}$/,
                  message: '올바른 형태의 비밀번호를 입력해 주세요',
                },
              })}
              title="영어 소문자, 숫자로 조합된 2~12자로 입력해주세요"
            />
            {errors.password && (
              <small role="alert" className={styles.error}>
                {errors.password.message}
              </small>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.confirmPw}`}>
            <label htmlFor="confirmPassword">
              비밀번호 확인 <span className={styles.star}>*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
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
            />
            {errors.confirmPassword && (
              <small role="alert" className={styles.error}>
                {errors.confirmPassword.message}
              </small>
            )}
          </div>
          <div className={styles.divisionLine}></div>

          <div className={`${styles.formGroup} ${styles.fileBox}`}>
            반려견 사진
            <div className={styles.uploadName}>
              <div className={styles.aaa}>
                소개하고 싶은 반려견이 있다면 자랑해주세요
              </div>
              <label htmlFor="picture">파일 업로드 (클릭)</label>
              <input
                {...register('image')}
                id="picture"
                type="file"
                accept="image/*"
              />
            </div>
          </div>

          <div className={`${styles.formGroup} ${styles.intro}`}>
            <label htmlFor="introduction">반려견 소개</label>
            <textarea
              id="introduction"
              placeholder="당신의 반려견을 소개해 주세요"
              {...register('introduction')}
            />
          </div>

          <button type="submit" className={`${styles.formGroup} ${styles.btn}`}>
            가입하기
          </button>
        </form>
      </div>
    </>
  );
}
