'use client'

import styles from "./page.module.css";
import TitleBar from "@/components/titleBar";
import CardStack from "@/components/cardStack";
import LinkStack from "@/components/linkStack";

export default function Home() {
  const links = [
    {
      text: "Saguaro on GitHub",
      href: "https://github.com/matthewd673/saguaro",
    },
    {
      text: "These demos on GitHub",
      href: "https://github.com/matthewd673/sat_toys",
    },
    {
      text: "Saguaro Wasm bindings on NPM",
      href: "https://www.npmjs.com/package/saguaro_web",
    }
  ];

  const cards = [
    {
      title: "Sudoku Solver",
      description: "Solve sudoku puzzles or determine if they have no solution.",
      href: "/sudoku",
    },
    {
      title: "More to come...",
      description: "More demos will be added as I improve Saguaro.",
    },
  ];

  return (
    <div className={styles.page}>
      <TitleBar
        title="Saguaro SAT Toys"
        isHome
      />
      <LinkStack links={links} />
      <br/>
      <CardStack cards={cards} />
      <br />
      <a href="http://mattdaly.xyz">mattdaly.xyz</a>
    </div>
  );
}
