import React from "react";
import { OrderForm } from "./OrderForm/OrderForm";

export const NewOrderPage: React.FC = () => {
  return (
    <section className="newOrder">
      <div className="container">
        <div className="newOrder__inner">
          <OrderForm />
        </div>
      </div>
    </section>
  );
};
