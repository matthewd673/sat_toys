import styles from "./styles/button.module.css";
import Spinner from "@/components/spinner";

type ButtonType = "normal" | "primary" | "link";

interface ButtonProps {
    text: string,
    onClick?: () => void,
    loading?: boolean,
    disabled?: boolean,
    type?: ButtonType,
}

export default function Button({ text, onClick, loading, disabled, type = "normal" }: ButtonProps) {
  const getClassNameFromType = (type: ButtonType) => {
    switch (type) {
    case "normal":
      return styles.normal;
    case "primary":
      return styles.primary;
    case "link":
      return styles.link;
    default:
      return styles.normal;
    }
  }
  return (
    <button
      className={`${styles.button} ${getClassNameFromType(type)}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading
        ? <Spinner />
        : undefined
      }
      {text}
    </button>
  )
}