import React, { useEffect, useContext, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css'
import { Outlet, Navigate } from "react-router-dom";
// PAGES
import Navbars from "./component/Navbars";
import AddProduct from './page/admin/AddProduct';
import AddTopping from './page/admin/AddTopping';
import HomePage from "./page/Home";
import Profile from "./page/user/Profile";
import ProductPage from './page/user/DetailProduct';
import Cart from './page/user/Cart'
import transaction from './page/admin/transaction'

import { UserContext } from "./Contexts/userContext";
import { API, setAuthToken } from "./config/api";


function App() {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext)

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    //Redirect Auth
    if (state.isLogin === false  && !isLoading) {
      navigate("/"); //nampilkan modal Login
    }
  }, [state]);

  const checkUser = async() => {
    try {
     
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      console.log("Response Check auth", response)
      //Get User Data
      let payload = response.data.data;
      // Get token from localstorage
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      })
      console.log("ini data state", state)
      setIsLoading(false)
    }catch (err){
      console.log(err)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const PrivateRoute = () => {
    return state.user.role === "user" ? <Outlet /> : <Navigate to="/" />
  };

  const AdminRoute = () => {
    return state.user.role === "admin" ? <Outlet /> : <Navigate to="/" />
  };

  return (
    <>
    {isLoading ? (
      <></>
    ) : (
      <>
      <Navbars/>
      <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/" element={<AdminRoute />} >
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/AddTopping" element={<AddTopping />} />
          </Route>

          
          <Route path="/" element={<PrivateRoute />} >
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/profile" element={<Profile />} />
          </Route>
      </Routes>
      </>
    )}
    </>
  );
}

export default App;