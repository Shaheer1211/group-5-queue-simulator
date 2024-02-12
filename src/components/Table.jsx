import React from "react";

function Table({simulationData}) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {simulationData.length > 0 &&
            Object.keys(simulationData[0]).map((col, index) => (
              <th key={index} className="px-6 py-3">
                {col}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {simulationData.length > 0 &&
          simulationData.map((data, dataIndex) => (
            <tr key={dataIndex} className="bg-white border-b">
              {Object.keys(data).map((row, rowIndex) => (
                <td
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  key={rowIndex}
                >
                  {data[row]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
