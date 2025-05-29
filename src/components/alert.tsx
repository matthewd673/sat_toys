import styles from "./styles/alert.module.css";

interface AlertProps {
    header: string,
    body: string,
}

export default function Alert({ header, body }: AlertProps) {
  return (
    <div className={styles.alert}>
      <h2 className={styles.header}>{header}</h2>
      <p className={styles.body}>{body}</p>
    </div>
  )
}