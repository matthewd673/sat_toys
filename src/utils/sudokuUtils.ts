import { List } from "immutable";
import { SudokuCell } from "@/components/solvers/sudokuBoard";
import { and, bool, formula, Formula, Literal, not, or, Or } from "saguaro_web";

export const getVarName = (r: number, c: number, v: number) =>
  `(${r}, ${c}, ${v})`;

const getVar = (r: number, c: number, v: number) =>
  bool(getVarName(r, c, v));

export const boardToCnf = (board: List<List<SudokuCell>>): Formula => {
  const clauseList: Or[] = [];

  const n = board.size; // Assume the board is square
  const sqrtN = Math.sqrt(n); // Assume sqrt(n) is a whole number

  // Assignments
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const v = board.get(r)!.get(c)!.value;
      clauseList.push(or([getVar(r, c, v)]));
    }
  }

  // Cell definedness
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const clause: Literal[] = [];
      for (let v = 1; v <= n; v++) {
        clause.push(getVar(r, c, v));
      }
      clauseList.push(or(clause));
    }
  }

  // Row uniqueness
  for (let r = 0; r < n; r++) {
    for (let v = 1; v <= n; v++) {
      for (let ci = 0; ci < n - 1; ci++) {
        for (let cj = ci + 1; cj < n; cj ++) {
          const clause = [
            not(getVar(r, ci, v)),
            not(getVar(r, cj, v)),
          ];
          clauseList.push(or(clause));
        }
      }
    }
  }

  // Column uniqueness
  for (let c = 0; c < n; c++) {
    for (let v = 1; v <= n; v++) {
      for (let ri = 0; ri < n - 1; ri++) {
        for (let rj = ri; rj < n; rj++) {
          const clause = [
            not(getVar(ri, c, v)),
            not(getVar(rj, c, v)),
          ];
          clauseList.push(or(clause));
        }
      }
    }
  }

  // Block uniqueness
  for (let v = 1; v <= n; v++) {
    for (let i = 0; i < sqrtN; i++) {
      for (let j = 0; j < sqrtN; j++) {
        for (let r = 0; r < sqrtN; r++) {
          for (let c = 0; c < sqrtN; c++) {
            for (let k = c + 1; k < sqrtN; k++) {
              const clause = [
                not(getVar(sqrtN * i + r, sqrtN * j + c, v)),
                not(getVar(sqrtN * i + r, sqrtN * j + k, v)),
              ];
              clauseList.push(or(clause));
            }

            for (let k = r + 1; k < sqrtN; k++) {
              for (let l = 0; l < sqrtN; l++) {
                const clause = [
                  not(getVar(sqrtN * i + r, sqrtN * j + c, v)),
                  not(getVar(sqrtN * i + k, sqrtN * j + l, v)),
                ];
                clauseList.push(or(clause));
              }
            }
          }
        }
      }
    }
  }

  return formula(and(clauseList));
}