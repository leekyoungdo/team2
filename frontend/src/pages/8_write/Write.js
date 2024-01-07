import styles from './write.module.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Write() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigator = useNavigate();

  const onValid = (data) => {
    // 파일 인풋 요소에서 선택된 파일 가져오기
    const fileInput = document.querySelector("#picture");
    const file = fileInput.files[0];

    // FormData 객체 생성
    const formData = new FormData();

    // 전송할 데이터 객체
    formData.append("image", file);
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("content", data.content);

    // 전송할 데이터 객체
    // const postData = {
    //   category: data.category,
    //   title: data.title,
    //   content: data.content,
    //   image: formData,
    // };

    // console.log(postData, data);

    axios
      .post(`${process.env.REACT_APP_HOST}/board/boardsubmit`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.result) {
          alert("게시물이 등록되었습니다.");
          navigator("/board");
        } else {
          alert("게시물이 등록되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.container}>
          <h2>글작성</h2>
          <form onSubmit={handleSubmit(onValid)}>
            <div className={styles.innerContainer}>
              <div className={styles.innerContainerText}>게시판</div>
              <div
                className={styles.boardTypeContainer}
                {...register('category')}
              >
                <select className={styles.boardTypeSelect}>
                  <option>자유게시판</option>
                  <option>일상게시판</option>
                  <option>질문게시판</option>
                </select>
              </div>
              <div className={styles.innerContainerText}>제목</div>
              <div className={styles.titleContainer}>
                <input
                  type="text"
                  className={styles.titleText}
                  placeholder="제목을 입력해주세요"
                  {...register('title', {
                    required: '제목은 필수로 입력해야 합니다',
                  })}
                />
                <br />
                {errors.title && (
                  <small role="alert" className={styles.error}>
                    {errors.title.message}
                  </small>
                )}
              </div>
              <div className={styles.contents}>
                <div className={styles.innerContainerText}>내용</div>
                <textarea
                  className={styles.contentsText}
                  placeholder="내용을 입력해주세요"
                  {...register('content', {
                    required: '내용은 필수로 입력해야 합니다',
                  })}
                ></textarea>
                <br />
                {errors.content && (
                  <small role="alert" className={styles.error}>
                    {errors.content.message}
                  </small>
                )}
              </div>
              <div className={styles.btnContainer}>
                <label
                  className={`${styles.btn} ${styles.uploadBtn}`}
                  htmlFor="picture"
                >
                  사진 업로드
                  <input
                    {...register('image')}
                    id="picture"
                    type="file"
                    className={styles.hidden}
                    accept="image/*"
                    style={{ display: 'none' }}
                    // formData()로 파일을 업로드할 때 encType 속성을 아래와 같이 명시해주어야 한다
                    encType="multipart/form-data"
                  />
                </label>{' '}
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.submitBtn}`}
                >
                  등록
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
