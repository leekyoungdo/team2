import { useState } from 'react';
import './signup.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <>
      <h2>회원가입</h2>
      <hr />
      아이디{' '}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="4~10자의 영문, 숫자를 입력해주세요"
      />
      <br />
      <br />
      이메일{' '}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      비밀번호{' '}
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="4~10자의 영문, 숫자를 입력해주세요"
      />
      <br />
      <br />
      비밀번호 확인{' '}
      <input
        type="text"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="비밀번호를 한 번 더 입력해주세요"
      />
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
      <input type="submit" value={'가입하기'} />
    </>
  );
}
