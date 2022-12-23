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
                <th scope='col' key={`thead-${idx}`}>
                  {headTitle}
                </th>
              ))}
            </tr>
          </thead>
        )}

        {rows && (
          <tbody>
            {rows.map((row, idx) => (
              <tr key={`col--${idx}`}>
                {row.map((rowColumn, jdx) => (
                  <th scope='row' key={`row-${idx}-${jdx}`}>
                    <td key={`row-col--${idx}-${jdx}`}>{rowColumn}</td>
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
