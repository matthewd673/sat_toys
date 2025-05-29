import Button from "@/components/button";

interface SolveButtonProps {
    isLoading: boolean,
    onClick: () => void,
}

export function SolveButton({ isLoading, onClick }: SolveButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="primary"
      text={isLoading ? "Solving" : "Solve"}
    />
  );
}