import React from "react";
import "./RecentlyWatched.css";
import { Data } from "../../App";
import { useNavigate } from "react-router-dom";

function RecentlyWatched(): JSX.Element {
  const navigate = useNavigate();
  const recentlyWatched = JSON.parse(
    sessionStorage.getItem("watched") as string
  );
  return (
    <div className="recently_watched_wrapper">
      <div className="recently_watched_cart">watched</div>
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
                      navigate(`./categories/products/${recentlyWatched[i].id}`)
                    }
                  >
                    <img src={recentlyWatched[i].imgUrl} alt="" />
                  </div>
                );
              })}
      </div>
      <div className="recently_watched_topBtn">TOP▲</div>
    </div>
  );
}

export default RecentlyWatched;
