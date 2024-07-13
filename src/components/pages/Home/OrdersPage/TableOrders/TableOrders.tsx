import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TableHeadProps,
  TableBodyProps,
} from "../../../../../redux/slices/tableOrders/types";

import { selectTable } from "../../../../../redux/slices/tableOrders/selectorsTableOrders";
import {
  fetchTableData,
  sortDataTable,
} from "../../../../../redux/slices/tableOrders/sliceTableOrders";

import TableData from "./TableData/TableData";
import { Pagination } from "./Pagination/Pagination";

const TableOrders: React.FC = () => {
  const dispatch = useDispatch();
  const { tableData, status } = useSelector(selectTable);
  const [dataSort, setDataSort] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchTableData() as any);
  }, []); // -- [dispatch]

  const tableColsItems: TableHeadProps = {
    date: "Дата",
    name: "Имя",
    id: "ID",
    type: "Тип",
    customer: "Заказчик",
    supplier: "Поставщик",
    completed: "Выполнен",
    status: "Статус",
    edit: "Редактировать",
  };
  const sortirovka = (parametr: keyof TableBodyProps) => {
    dispatch(sortDataTable(parametr));
    setDataSort((prev) => !prev);
  };
  // ---------- Pagination ---------- //
  const [arrayPagination, setArrayPagination] =
    useState<TableBodyProps[]>(tableData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tableLengthPage, setTableLengthPage] = useState<number>(15);
  const lastTablePage: number = currentPage * tableLengthPage;
  const firstTablePage: number = lastTablePage - tableLengthPage;
  const totalTableLength: number = arrayPagination.length;

  useEffect(() => {
    setArrayPagination(tableData);
  }, [tableData]);

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (way: string): void => {
    if (way === "moveOn") {
      setCurrentPage((prev) => (prev < 95 ? prev + 3 : (prev = 95)));
    }
    if (way === "backUp") {
      setCurrentPage((prev) => (prev > 4 ? prev - 3 : (prev = 1)));
    }
  };
  // ---------- End of Pagination ---------- //

  return (
    <>
      {status === "success" ? (
        <>
          <table className="orderTable">
            <caption className="orderTable-caption">Таблица заказов</caption>
            <thead>
              <tr className="orderTable-head">
                <th>
                  {tableColsItems.date}{" "}
                  <img
                    src="assets/img/icons/sort_icon.svg"
                    onClick={() => sortirovka("date")}
                    alt="sort"
                  />
                </th>
                <th>
                  {tableColsItems.name}
                  <img
                    src="assets/img/icons/sort_icon.svg"
                    onClick={() => sortirovka("name")}
                    alt="sort"
                  />
                </th>
                <th>
                  {tableColsItems.id}
                  <img
                    src="assets/img/icons/sort_icon.svg"
                    onClick={() => sortirovka("id")}
                    alt="sort"
                  />
                </th>
                <th>
                  {tableColsItems.type}
                  <img
                    src="assets/img/icons/sort_icon.svg"
                    onClick={() => sortirovka("type")}
                    alt="sort"
                  />
                </th>
                <th>
                  {tableColsItems.customer}
                  <img
                    src="assets/img/icons/sort_icon.svg"
                    onClick={() => sortirovka("customer")}
                    alt="sort"
                  />
                </th>
                <th>
                  {tableColsItems.supplier}
                  <img
                    src="assets/img/icons/sort_icon.svg"
                    onClick={() => sortirovka("supplier")}
                    alt="sort"
                  />
                </th>
                <th>
                  {tableColsItems.completed}
                  <img
                    src="assets/img/icons/sort_icon.svg"
                    onClick={() => sortirovka("completed")}
                    alt="sort"
                  />
                </th>
                <th>
                  {tableColsItems.status}
                  <img
                    src="assets/img/icons/sort_icon.svg"
                    onClick={() => sortirovka("status")}
                    alt="sort"
                  />
                </th>
                <th>{tableColsItems.edit}</th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .slice(firstTablePage, lastTablePage)
                .map((elem: TableBodyProps) => (
                  <TableData key={elem.id} {...elem} />
                ))}
            </tbody>
          </table>
          <div className="paginationTable">
            <Pagination
              tableLengthPage={tableLengthPage}
              totalTableLength={totalTableLength}
              paginate={paginate}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};

export default TableOrders;
