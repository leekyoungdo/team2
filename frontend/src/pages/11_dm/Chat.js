import styles from './dm.module.scss';

export default function Chat({ chat }) {
  return (
    <div className={`${styles.list} ${styles[`${chat.type}-chat`]}`}>
      <div className={styles.content}>{chat.content}</div>
    </div>
  );
}
