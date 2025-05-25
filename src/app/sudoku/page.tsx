import TitleBar from "@/components/titleBar";
import SolverWrapper from "@/components/solverWrapper";
import SudokuSolver from "@/components/solvers/sudokuSolver";

export default function Sudoku() {
  return (
    <div>
      <TitleBar title="Sudoku Solver" />
      <SolverWrapper>
        <SudokuSolver />
      </SolverWrapper>
    </div>
  );
}