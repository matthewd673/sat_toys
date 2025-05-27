import { Button, Spinner } from "react-bootstrap";

interface SolveButtonProps {
    isLoading: boolean,
    onClick: () => void,
}

export function SolveButton({ isLoading, onClick }: SolveButtonProps) {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Spinner size="sm" /> : undefined}
      <span>
        {" "}
        {isLoading ? "Solving" : "Solve"}
      </span>
    </Button>
  );
}