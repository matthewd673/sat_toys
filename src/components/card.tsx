'use client'

import styles from "./styles/card.module.css";
import Button from "@/components/button";
import { redirect } from "next/navigation";

export interface CardProps {
    title: string,
    description: string,
    href?: string,
}

export default function Card({ title, description, href }: CardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      { href !== undefined
        ?
        (<Button
          text="Try it!"
          type="primary"
          onClick={() => { redirect(href); } }
        />)
        : undefined
      }
    </div>
  );
}