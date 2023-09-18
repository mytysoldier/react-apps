import React from "react";

type Props = {
  columns: string[];
  datas: string[][];
};

export const CommonTable: React.FC<Props> = ({ columns, datas }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datas.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {rowData.map((cellData, cellIndex) => (
              <td
                className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                key={cellIndex}
              >
                {cellData}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommonTable;
