import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const HomePage = () => {
  const userRedux = useSelector((state: RootState) => state.user);
  console.log(userRedux.email)
  return (
    <div>
      {!!userRedux.email ? "Это домашняя страница" : <Navigate to="/login" />}     
    </div>
  );
};

export default HomePage;