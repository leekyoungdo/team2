import styles from './write.module.scss'; // CSS 모듈 파일을 import합니다.
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Write() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    // 전송할 데이터 객체
    const postData = {
      category: data.category,
      title: data.title,
      content: data.content,
      image: data.image[0], // 사진은 배열로 전달되므로 첫 번째 요소 사용
    };

    console.log(postData, data);

    axios
      .post(`${process.env.REACT_APP_HOST}/board/boardsubmit`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h2>글작성</h2>
      <br />
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          게시판
          <div
            className={styles['board-type-container']}
            {...register('category')}
          >
            <select className={styles['board-type-select']}>
              <option>자유게시판</option>
              <option>일상게시판</option>
              <option>질문게시판</option>
            </select>
          </div>
          <br />
          제목
          <div className={styles['title-container']}>
            <br />
            <input
              type="text"
              className={styles['title-text']}
              placeholder="  제목을 입력해주세요"
              {...register('title', {
                required: '제목은 필수로 입력해야 합니다',
              })}
            />
            {errors.title && (
              <small role="alert" className={styles.error}>
                {errors.title.message}
              </small>
            )}
          </div>
          <br />
          <div className={styles['contents']}>
            내용
            <br />
            <textarea
              className={styles['contents-text']}
              {...register('content', {
                required: '내용은 필수로 입력해야 합니다',
              })}
            ></textarea>
            {errors.content && (
              <small role="alert" className={styles.error}>
                {errors.content.message}
              </small>
            )}
          </div>
          <br />
          <br />
          <label
            className={styles['upload-button']}
            htmlFor="picture"
            {...register('image')}
          >
            사진 업로드
            <input
              {...register('image')}
              id="picture"
              type="file"
              className={styles['hidden']}
              accept="image/*"
              style={{ display: 'none' }}
              // onChange={props.savePreViewFile}
              // ref={props.imgRef}
            />
          </label>{' '}
          <button type="submit" className={styles['submit-button']}>
            등록
          </button>
        </div>
      </form>
    </>
  );
}
