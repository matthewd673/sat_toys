import styles from "./styles/cardStack.module.css";
import Card, { CardProps } from "@/components/card";

interface CardStackProps {
    cards: CardProps[],
}

export default function CardStack({ cards }: CardStackProps) {
  return (
    <div className={styles.cardStack}>
      {cards.map((card, idx) => (
        <Card
          key={idx}
          title={card.title}
          description={card.description}
          href={card.href}
        />
      ))}
    </div>
  )
}