import React from "react";
import "./RecentlyWatched.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { NavigateFunction } from "react-router-dom";
import { Data } from "../../App";

function RecentlyWatched({
  navigate,
}: {
  navigate: NavigateFunction;
}): JSX.Element {
  const recentlyWatched = JSON.parse(
    sessionStorage.getItem("cartItems") as string
  );
  const state = useSelector((state: RootState) => state.cart);
  return (
    <div className="recently_watched_wrapper">
      <div className="recently_watched_cart">CART({state.length})</div>
      <div className="recently_watched_products">
        <h4>최근본상품</h4>
        {recentlyWatched === null
          ? ""
          : recentlyWatched
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((item: Data, i: number) => {
                return (
                  <div
                    key={i}
                    onClick={() =>
                      navigate(`./products1/details/${recentlyWatched[i].id}`)
                    }
                  >
                    <img
                      src={process.env.PUBLIC_URL + `${recentlyWatched[i].img}`}
                      alt=""
                    />
                  </div>
                );
              })}
      </div>
      <div className="recently_watched_topBtn">TOP▲</div>
    </div>
  );
}

export default RecentlyWatched;
