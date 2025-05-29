import styles from "./styles/linkStack.module.css"
import Button from "@/components/button";

interface LinkDef {
    text: string,
    href: string,
}

interface LinkStackProps {
    links: LinkDef[],
}

export default function LinkStack({ links }: LinkStackProps) {
  return (
    <div className={styles.linkStack}>
      {links.map((link, idx) => (
        <Button
          key={idx}
          text={link.text}
          type="link"
          onClick={() => { window.location.href = link.href; }}
        />
      ))}
    </div>
  )
}