import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import FirstProducts from "./Pages/FirstProducts";
import Details from "./Pages/Details";

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <img
                className="main_bg"
                src={process.env.PUBLIC_URL + "./Img/bg.png"}
                alt=""
              />
              <ProductList />
            </>
          }
        />
        <Route
          path="/products1"
          element={
            <>
              <Header />
              <img
                className="main_bg"
                src={process.env.PUBLIC_URL + "./Img/bg.png"}
                alt=""
              />
              <FirstProducts />
            </>
          }
        />
        <Route
          path="/products1/details"
          element={
            <>
              <Header />
              <Details />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
