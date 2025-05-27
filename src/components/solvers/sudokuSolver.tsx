'use client'

import { useState } from "react";
import { List } from "immutable";
import SudokuBoard, { SudokuCell } from "@/components/solvers/sudokuBoard";
import { Alert, Button } from "react-bootstrap";
import { boardToCnf, getVarName } from "@/utils/sudokuUtils";
import { solve } from "saguaro_web";
import { SolveButton } from "@/components/solveButton";

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

    const n = rows.size;
    let workingRows = rows;

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        for (let v = 1; v <= n; v++) {
          const varName = getVarName(r, c, v);
          const assignment = solution.assignments.get(varName);
          const currentVal = rows.get(r)!.get(c)!.value;
          const isCellAssigned = currentVal > 0;
          if (assignment) {
            workingRows =
              workingRows.set(r, workingRows.get(r)!.set(c, {
                value: v,
                user: isCellAssigned,
              }));
            break;
          }
        }
      }
    }

    setRows(workingRows);
  }

  const onSolve = async () => {
    // TODO: Animation doesn't update
    setIsSolveLoading(true);
    runSolve();
    setIsSolveLoading(false);
  }

  return (
    <div>
      { isUnsat
        ? <Alert variant="danger">
            The puzzle has no solution.
        </Alert>
        : undefined
      }
      <SudokuBoard
        rows={rows}
        onRowsChange={(newRows) => { setRows(newRows); }}
      />
      <SolveButton isLoading={isSolveLoading} onClick={() => onSolve()} />
    </div>
  );
}