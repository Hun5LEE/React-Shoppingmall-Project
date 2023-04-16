import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import CategoryList from "./components/homeComponents/category/CategoryList";
import { Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import { data } from "./Data/Data";
import axios from "axios";
import ProductsPage from "./pages/products";

function App(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  // const productsData: Data[] = data;
  const [categoryData, setCategoryData] = useState([]);

  // 첫페이지 mount할때 useEffect로 비동기처리 즉시 호출하여 데이터 받아오기. -> Destructuring 하여 변수에 할당
  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/categories", {
          cancelToken: source.token,
        });
        //category 데이터
        setCategoryData(data);
      } catch (error) {
        alert("실패");
        console.log(error);
      }
    })();
    return () => {
      // 랜더링시 이전요청 삭제해줌. (불필요한 요청누적 방지)
      source.cancel("랜더링시 이전요청 삭제");
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header navigate={navigate} />
              <img
                className="main_bg"
                src={process.env.PUBLIC_URL + "./Img/main_bg.avif"}
                alt=""
              />
              <CategoryList data={categoryData} />
            </>
          }
        />
        <Route
          path="categories/products/:id"
          element={
            <>
              <Header navigate={navigate} />
              {/* <img
                className="main_bg"
                src={process.env.PUBLIC_URL + "./Img/main_bg.avif"}
                alt=""
              /> */}
              <ProductsPage />
            </>
          }
        />
        {/* <Route
          path="/products1/details/:id"
          element={
            <>
              <Header navigate={navigate} />
              <Details productsData={productsData} />
            </>
          }
        />
        <Route
          path="/Login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header navigate={navigate} />
              <Cart />
            </>
          }
        />
        // <Route path="*" element={<h1>404 Pages</h1>} /> */}
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
  count: number;
  stocks: number;
}

// 비슷한 페이지 만들시 nested routes 사용.
// 페이지 여러개 만들때 URL파라미터 유용.
// useMemo , useEffect는 비슷한 기능을 하지만 실행시점에 차이가 있다.
// useMemo는 렌더링될때(HTML이 읽힐때같이 읽힘), useEffect는 HTML읽히고 난후
