import { Spinner } from "react-bootstrap";

export default function InitSpinner() {
  return (
    <div>
      <Spinner animation="grow"/>
      <p>Loading Saguaro</p>
    </div>
  );
}