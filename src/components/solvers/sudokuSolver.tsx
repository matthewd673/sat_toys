'use client'

import styles from "./styles/sudokuSolver.module.css";
import { useState } from "react";
import { List } from "immutable";
import SudokuBoard, { SudokuCell } from "@/components/solvers/sudokuBoard";
import { boardToCnf, parseVarName, VarEncoding } from "@/utils/sudokuUtils";
import { solve } from "saguaro_web";
import { SolveButton } from "@/components/solveButton";
import Alert from "@/components/alert";
import Button from "@/components/button";

const ZERO = {
  value: 0,
  user: true,
}

const DEFAULT_ROWS: List<List<SudokuCell>> = List.of(
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
  List.of(ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO),
);

export default function SudokuSolver() {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [isSolveLoading, setIsSolveLoading] = useState(false);
  const [isUnsat, setIsUnsat] = useState(false);

  const runSolve = () => {
    const formula = boardToCnf(rows);
    const solution: any = solve(formula);

    if (!solution.sat) {
      setIsUnsat(true);
      return;
    }

    setIsUnsat(false);

    let workingRows = rows;
    solution.assignments
      .map(parseVarName)
      .forEach(({ row, column, value }: VarEncoding) => {
        const currentVal = rows.get(row)!.get(column)!.value;
        const isCellAssigned = currentVal > 0;

        workingRows =
            workingRows.set(row, workingRows.get(row)!.set(column, {
              value,
              user: isCellAssigned,
            }));
      });

    setRows(workingRows);
  }

  const onSolve = async () => {
    // TODO: Animation doesn't update
    setIsSolveLoading(true);
    runSolve();
    setIsSolveLoading(false);
  }

  return (
    <div className={styles.boardContainer}>
      { isUnsat
        ? <Alert
          header="No solution"
          body="There is no satisfying assignment for this puzzle."
        />
        : undefined
      }
      <SudokuBoard
        rows={rows}
        onRowsChange={(newRows) => { setRows(newRows); }}
      />
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => { setRows(DEFAULT_ROWS)}}
          text="Clear"
        />
        <SolveButton isLoading={isSolveLoading} onClick={() => onSolve()} />
      </div>
    </div>
  );
}