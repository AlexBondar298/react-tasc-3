import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
// import { Routes, Route } from "react-router-dom";

//***************************************** */
// import Header from "../../Header/Header";
// import Welcome from "./WelcomePage.tsx/Welcome";
// import Orders from "./OrdersPage.tsx/Orders";

const HomePage = () => {
  const userRedux = useSelector((state: RootState) => state.user);
  console.log(userRedux.email);
  return (
    <div className="body">
      {!!userRedux.email ? (
        <Navigate to="/welcome" />
      ) : (
        <Navigate to="/login" />
      )}
      {/* <Header />
      <Navigate to="/welcome" />
       */}
    </div>
  );
};

export default HomePage;
