import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import EmailInput from "./FormTypes/EmailInput";
import TextInput from "./FormTypes/TextInput";
import TelInput from "./FormTypes/TelInput";
import SelectInput from "./FormTypes/SelectInput";
import DateInput from "./FormTypes/DateInput";
import TextAreaInput from "./FormTypes/TextAreaInput";

import { TableBodyProps } from "../../../../../redux/slices/tableOrders/types";

import { useDispatch, useSelector } from "react-redux";
import { addEditOrder } from "../../../../../redux/slices/tableOrders/sliceTableOrders";
import { selectTable } from "../../../../../redux/slices/tableOrders/selectorsTableOrders";
import { selectOrder } from "../../../../../redux/slices/newOrder/selectorsNewOrder";
import { selectUser } from "../../../../../redux/slices/user/selectorsUser";

import { useNavigate } from "react-router-dom";

//************************************************************ */
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../../redux/store";
//************************************************************ */

type Stooge = "larry" | "moe" | "curly";
interface Values {
  employed: boolean;
  stooge: Stooge;
  email: string;
  firstName: string;
  lastName: string;
  telephone: number;
  position: string;
  type: string;
  supplier: string;
  id: string;
  completed: string;
  notes: string;
}

export const OrderForm: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, unknown, any> = useDispatch(); // не понятно дописал GPT4
  const selectedTable = useSelector(selectTable);
  const editTableOrder = useSelector(selectOrder);
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const [valueID, setValueID] = useState<string>("");
  useEffect(() => {
    setValueID(`p-${(Date.now() + "").slice(-8)}`);
  }, []);

  const onSubmit = async (values: Values) => {
    const newOrder: TableBodyProps = {
      date: "23.11.23",
      name: user.email,
      id: values.id,
      type: values.type,
      customer: `${values.lastName} ${values.firstName}`,
      supplier: values.supplier,
      completed: values.completed,
      status: "New",
      position: values.position,
      email: values.email,
      telephone: values.telephone,
      notes: values.notes,
      edit: editTableOrder.edit,
    };

    const resultAction = await dispatch(
      addEditOrder({ data: newOrder, table: selectedTable })
    );

    if (addEditOrder.fulfilled.match(resultAction)) {
      console.log("Order added successfully:", resultAction.payload);
      navigate("/orders");
    } else {
      console.error("Failed to add order:", resultAction.payload);
    }
  };

  return (
    <div className="orderForm">
      <Form
        onSubmit={onSubmit}
        initialValues={{ stooge: "larry", employed: false }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="formSection">
              <h4 className="formSectionTitle">Заказчик</h4>
              <div className="formData required">
                <label>Email</label>
                <Field<string>
                  name="email"
                  component={EmailInput}
                  placeholder="Ваш email"
                  initialValue={editTableOrder.email}
                />
              </div>
              <div className="formData required">
                <label>Имя</label>
                <Field<string>
                  name="firstName"
                  component={TextInput}
                  placeholder="Ваше имя"
                  initialValue={editTableOrder.customer.split(" ")[0]}
                />
              </div>
              <div className="formData required">
                <label>Фамилия</label>
                <Field<string>
                  name="lastName"
                  component={TextInput}
                  placeholder="Ваша фамилия"
                  initialValue={editTableOrder.customer.split(" ")[1]}
                />
              </div>
              <div className="formData required">
                <label>Телефон</label>
                <Field<number | string>
                  name="telephone"
                  component={TelInput}
                  placeholder="Ваш телефон"
                  initialValue={editTableOrder.telephone}
                />
              </div>
            </div>
            <div className="formSection">
              <h4 className="formSectionTitle">Заказ</h4>
              <div className="formData required">
                <label>Позиция</label>
                <Field<string>
                  name="position"
                  component={TextInput}
                  placeholder="Шариковые ручки"
                  initialValue={editTableOrder.position}
                />
              </div>
              <div className="formData">
                <label>Тип</label>
                <Field<string>
                  name="type"
                  component={SelectInput}
                  initialValue={editTableOrder.type}
                  // initialValue="Retail"
                >
                  <option value="Retail">Розница</option>
                  <option value="Wholesale">Опт</option>
                </Field>
              </div>
              <div className="formData">
                <label>Поставщик</label>
                <Field<string>
                  name="supplier"
                  component={SelectInput}
                  initialValue={editTableOrder.supplier}
                >
                  <option value="Supplier_1">🧀 Поставщик 1 </option>
                  <option value="Supplier_2">🐷 Поставщик 2 </option>
                  <option value="Supplier_3">🍄 Поставщик 3 </option>
                </Field>
              </div>
            </div>
            <div className="formData">
              <label>Ваш ID заказа</label>
              <Field<string>
                name="id"
                component={TextInput}
                initialValue={editTableOrder.id ? editTableOrder.id : valueID}
              />
            </div>
            <div className="formData required">
              <label>Дата выполнения заказа</label>
              <Field<string>
                name="completed"
                component={DateInput}
                initialValue={editTableOrder.completed}
              />
            </div>
            <div className="formData">
              <label>Комментарий</label>
              <Field
                name="notes"
                component={TextAreaInput}
                initialValue={editTableOrder.notes}
                placeholder="Оставьте комментарий..."
              />
            </div>
            <div className="orderFormBtn">
              <button type="submit" disabled={submitting || pristine}>
                {editTableOrder.edit ? "Сохранить" : "Отправить"}
              </button>
              <button
                type="button"
                onClick={() => form.reset()}
                disabled={submitting || pristine}
              >
                Сброс
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};
