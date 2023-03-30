import React from "react";
import "./App.css";
import Header from "./Components/Header";

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <img
        className="main_bg"
        src={process.env.PUBLIC_URL + "./Img/main_bg.jpg"}
        alt=""
      />
    </div>
  );
}

export default App;
