import React, { useEffect, useState } from "react";
// import { ref, get, child } from "firebase/database";
// import { database } from "../../../../firebase"; // Импортируй базу данных

/** loading посмотреть в кроссовках может переделать */
/* [New, Waiting, Expired, Failed, Finished],*/

import TableOrders from "./TableOrders/TableOrders";

const Orders: React.FC = () => {
  return (
    <section className="order">
      <div className="container">
        <div className="order__inner">
          <TableOrders />
        </div>
      </div>
    </section>
  );
};

export default Orders;
