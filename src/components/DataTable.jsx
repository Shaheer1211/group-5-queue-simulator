import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

function Table(props) {
  // const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [tableData, setTableData] = useState(props.data)
  const [showFooter] = useState(!props.footer ? props.footer : true)
  
  const data = useMemo(() => tableData, [tableData]);

  const columns = props.columns;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      // globalFilter: filtering,
      rowSelection: rowSelection,
      sorting: sorting,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    onSortingChange: setSorting,
    // onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    setTableData(props.data)
  }, [props.data])

  return (
    <div className="relative overflow-x-auto grid place-items-end sm:rounded-sm w-full">
      {/* <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          className="block w-48 px-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
          placeholder="Search"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div> */}
      <table className="w-full text-sm text-left text-gray-500 border-t border-b table-auto">
        <thead className="text-sm text-white bg-[#2daab8] border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  scope="col"
                  className="py-2 px-1 cursor-pointer"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <span className="flex w-full gap-x-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path>
                          </svg>
                        ),
                        desc: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: "rotate(180deg)" }}
                            fill="#fff"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path>
                          </svg>
                        ),
                      }[header.column.getIsSorted() ?? null]
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {data && (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="py-4 px-1" key={cell.id}>
                    <span className="w-full flex items-center gap-x-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
        {showFooter && <tfoot className="border-t">
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  scope="col"
                  className="py-2 px-1 cursor-pointer"
                  key={header.id}
                >
                  <span className="flex w-full gap-x-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </tfoot>}
      </table>
      <div className="flex justify-between items-center w-full text-sm mt-4 pb-4 px-2">
        <div className="flex items-center gap-x-2 text-gray-400">
          <span>
            <select
              className="text-sm border-none bg-gray-200 rounded-lg"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </span>
          <span>items per page</span>
          <span>
            1-{table.getRowModel().rows.length} of {data.length} items
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-gray-400">
          <span>
            <input
              className="text-sm border-none bg-gray-200 rounded-lg w-8 text-center px-0"
              type="text"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>
          <span> of {table.getPageCount()} pages</span>
          <span className="flex">
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <svg
                className="fill-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <svg
                className="fill-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Table;