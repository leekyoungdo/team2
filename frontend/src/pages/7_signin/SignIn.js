import { Link } from 'react-router-dom';
import './signin.scss';

export default function SignIn() {
  return (
    <>
      <h2>로그인</h2>
      <hr />
      <input type="text" placeholder="아이디를 입력해주세요" />
      <br />
      <br />
      <input type="password" placeholder="비밀번호를 입력해주세요" />
      <br />
      <br />
      <button>로그인</button>
      <br />
      <br />
      <Link to="/user/signup">
        <button>회원가입</button>
      </Link>
    </>
  );
}
