'use client'

import { useState } from "react";
import { List } from "immutable";
import SudokuBoard, { SudokuCell } from "@/components/solvers/sudokuBoard";
import { and, bool, formula, not, or, solve } from "saguaro_web";
import { Button } from "react-bootstrap";

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

  const runSolve = () => {
    const solution = solve(formula(and([or([bool("a"), bool("b")]), or([bool("c"), not(bool("a"))])])));
    console.log(solution);
  }

  return (
    <div>
      <SudokuBoard
        rows={rows}
        onRowsChange={(newRows) => { setRows(newRows); }}
      />
      <Button
        variant="primary"
        onClick={() => { runSolve(); }}
      >
          Solve
      </Button>
    </div>
  );
}