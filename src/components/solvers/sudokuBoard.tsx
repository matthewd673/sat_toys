import styles from "./styles/sudokuBoard.module.css";
import { List } from "immutable";
import { ChangeEvent } from "react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400"
});

export type SudokuCell = {
  value: number,
  user: boolean,
}

interface SudokuBoardProps {
  rows: List<List<SudokuCell>>,
  onRowsChange: (_rows: List<List<SudokuCell>>) => void,
}

export default function SudokuBoard({ rows, onRowsChange }: SudokuBoardProps) {
  const updateCellValue = (
    { target }: ChangeEvent<HTMLInputElement>,
    rowIdx: number,
    colIdx: number
  ) => {
    let num = Number(target.value);
    if (isNaN(num) || num < 0) {
      num = 0;
    }
    else if (num > 9) {
      num = num % 10;
    }

    const cell = {
      value: num,
      user: true,
    };

    onRowsChange(rows.set(rowIdx, rows.get(rowIdx)!.set(colIdx, cell)));
  }

  const formatCellValue = (value: number) =>
    value === 0 ? "" : value.toString();

  return (
    <div>
      <table className={styles.board}>
        <tbody>
          {rows.map((cols, rowIdx) => (
            <tr key={rowIdx} className={styles.row}>
              {cols.map((cell, colIdx) => (
                <td key={colIdx} className={styles.cell}>
                  <input
                    type="text"
                    className={`${spaceMono.className} ${styles.cellInput} ${cell.user ? styles.userCell : styles.solvedCell}`}
                    value={formatCellValue(cell.value)}
                    onChange={(e) => { updateCellValue(e, rowIdx, colIdx); }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}