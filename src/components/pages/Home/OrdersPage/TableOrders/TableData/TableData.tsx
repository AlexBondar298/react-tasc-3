import React from "react";
import { TableBodyProps } from "../../../../../../redux/slices/tableOrders/types";
import { useNavigate } from "react-router-dom";
import { selectTable } from "../../../../../../redux/slices/tableOrders/selectorsTableOrders";
import { selectOrder } from "../../../../../../redux/slices/newOrder/selectorsNewOrder";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../../../../../redux/slices/newOrder/sliceNewOrder";

const TableData: React.FC<TableBodyProps> = ({
  date,
  name,
  id,
  type,
  customer,
  supplier,
  completed,
  status,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector(selectTable);
  const editOrder = (idOrder: string): void => {
    const {
      date,
      name,
      id,
      type,
      customer,
      supplier,
      completed,
      status,
      position,
      email,
      telephone,
      notes,
    } = tableData.tableData.filter(
      (elem: TableBodyProps) => elem.id === idOrder
    )[0];
    dispatch(
      setOrder({
        date: date,
        name: name,
        id: id,
        type: type,
        customer: customer,
        supplier: supplier,
        completed: completed,
        status: status,
        position: position,
        email: email,
        telephone: telephone,
        notes: notes,
        // edit:true,
      })
    );
    navigate("/newOrder");
  };
  return (
    <tr className="orderTable-rows">
      <td>{date}</td>
      <td>{name}</td>
      <td>{id}</td>
      <td>{type}</td>
      <td>{customer}</td>
      <td>{supplier}</td>
      <td>{completed}</td>
      <td className={`${status}`}>{status}</td>
      <td>
        <button className="orderTableBtn" onClick={() => editOrder(id)}>
          Редактировать
        </button>
      </td>
    </tr>
  );
};

export default TableData;
