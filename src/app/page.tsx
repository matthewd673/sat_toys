import styles from "./page.module.css";
import TitleBar from "@/components/titleBar";
import { Row, Col } from "react-bootstrap";
import BasicCard from "@/components/basicCard";

export default function Home() {
  const cards = [
    {
      title: "Sudoku",
      description: "Solve sudoku problems or determine if they have no solution.",
      href: "/sudoku",
    }
  ];

  return (
    <div>
      <TitleBar
        title="Saguaro SAT Toys"
      />
      <Row xs={1} md={2} className="g-4">
        {cards.map((card, idx) => (
          <Col key={idx}>
            <BasicCard title={card.title} description={card.description} href={card.href} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
