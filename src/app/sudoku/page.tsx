import styles from "./page.module.css";
import TitleBar from "@/components/titleBar";
import SolverWrapper from "@/components/solverWrapper";
import SudokuSolver from "@/components/solvers/sudokuSolver";

export default function Sudoku() {
  return (
    <div className={styles.page}>
      <TitleBar title="Sudoku Solver" />
      <p>
          Enter a Sudoku puzzle on the board below, then press &#34;Solve&#34;.
          If the puzzle has a satisfying solution, one of the possible satisfying assignments will appear on the board in red.
          If the puzzle has no solution, the solver will tell you so.</p>
      <SolverWrapper>
        <SudokuSolver />
      </SolverWrapper>
    </div>
  );
}