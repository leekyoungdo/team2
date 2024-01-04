import './write.scss';
import { useForm } from 'react-hook-form';

export default function Write() {
  const { register, handleSubmit } = useForm();

  const onValid = (data) => {
    console.log(data);
    console.log('[테스트] 정상적으로 작동함');
  };

  return (
    <>
      <h2>글작성</h2>
      <br />
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          게시판
          <div className="board-type-container">
            <select className="board-type-select">
              <option>자유게시판</option>
              <option>일상게시판</option>
              <option>질문게시판</option>
            </select>
          </div>
          <br />
          제목
          <div className="title-container">
            <br />
            <input
              type="text"
              className="title-text"
              placeholder="  제목을 입력해주세요"
            />
          </div>
          <br />
          <div className="contents">
            내용
            <br />
            <textarea className="contents-text"></textarea>
          </div>
          <br />
          <br />
          <label className="upload-button" for="picture">
            사진 업로드
            <input
              {...register('image')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
              style={{ display: 'none' }}
              // onChange={props.savePreViewFile}
              // ref={props.imgRef}
            />
          </label>{' '}
          <button type="submit" className="submit-button">
            등록
          </button>
        </div>
      </form>
    </>
  );
}
