import { ReactNode } from "react";
// import styles from "./table.module.css";

interface TableType {
  headTitles: string[];
  rows: ReactNode[][];
}
function Table({ headTitles = [], rows = [] }: TableType) {
  return (
    <>
      <table role='grid'>
        {headTitles && (
          <thead>
            <tr>
              {headTitles.map((headTitle, idx) => (
                <th scope='col' key={idx}>
                  {headTitle}
                </th>
              ))}
            </tr>
          </thead>
        )}

        {rows && (
          <tbody>
            {rows.map((row, idx) => (
              <tr>
                {row.map((rowColumn) => (
                  <th scope='row' key={`row-${idx}`}>
                    <td key={`row-col-${idx}`}>{rowColumn}</td>
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}

export default Table;
