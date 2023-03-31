import React from "react";
import "./App.css";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <img
        className="main_bg"
        src={process.env.PUBLIC_URL + "./Img/main_bg.jpg"}
        alt=""
      />
      <ProductList />
    </div>
  );
}

export default App;
