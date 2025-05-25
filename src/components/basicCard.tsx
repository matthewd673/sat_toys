import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";

interface BasicCardProps {
    title: string,
    description: string,
    href: string,
}

export default function BasicCard({ title, description, href }: BasicCardProps) {
  return (
    <Card>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
      <Button href={href}>Try it</Button>
    </Card>
  );
}