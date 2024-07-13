import React, { useEffect } from "react";
import "./scss/globals.scss";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./components/pages/Home/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import Welcome from "./components/pages/Home/WelcomePage/Welcome";
import Orders from "./components/pages/Home/OrdersPage/Orders";
import { NewOrderPage } from "./components/pages/Home/NewOrderPages/NewOrderPage";

//*********************************************************************************** */
import { useDispatch } from "react-redux";
import { fetchTableData } from "./redux/slices/tableOrders/sliceTableOrders";
//*********************************************************************************** */

function App() {
//*********************************************************************************** */
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchTableData() as any);
  //   console.log("her");
  // }, []); // -- [dispatch]
//*********************************************************************************** */
  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/newOrder" element={<NewOrderPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
