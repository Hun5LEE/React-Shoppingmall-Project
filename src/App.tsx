import React from "react";
import { Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import FirstProducts from "./Pages/FirstProducts";
import Details from "./Pages/Details";
import data from "./Data/Data";

function App(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const productsData: Data[] = data;
  const [products, setProducts] = useState<Data[]>([]);
  //
  useEffect(() => {
    return () => {
      fetch("/Products/ShoeProducts.json")
        .then((data) => data.json())
        .then((result) => {
          let copy: any = [...products, result];
          setProducts(copy);
        });
    };
  }, []);

  return (
    <div className="App">
      <Header navigate={navigate} />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
              <img
                className="main_bg"
                src={process.env.PUBLIC_URL + "./Img/bg.png"}
                alt=""
              />
              <FirstProducts navigate={navigate} productsData={productsData} />
            </>
          }
        ></Route>
        <Route
          path="/products1/details/:id"
          element={
            <>
              <Details productsData={productsData} products={products} />
            </>
          }
        />
        <Route path="*" element={<h1>404 Pages</h1>} />
      </Routes>
    </div>
  );
}

export default App;

export interface Data {
  id: number;
  title: string;
  content: string;
  price: number;
  img: string;
}

// 비슷한 페이지 만들시 nested routes 사용.
// 페이지 여러개 만들때 URL파라미터 유용.
