import "./DetailsTab.css";
import { useEffect, useState } from "react";

function DetailsTab(): JSX.Element {
  // 버튼 클릭시 해당버튼의 boolean 값을 바꿔 작동하게함.
  const [tab, setTab] = useState([true, false, false]);
  const [clickShow, setClickShow] = useState("");
  const handleOnClick = (index: number) => {
    const copyTab = [...tab];
    copyTab.fill(false);
    copyTab[index] = true;
    setTab(copyTab);
  };
  //
  useEffect(() => {
    setClickShow("clickShow");
  }, [tab]);

  return (
    <div className="details_tab">
      <div
        className={
          tab[0]
            ? `details_tab_productInfo ${clickShow}`
            : "details_tab_productInfo"
        }
        onClick={() => handleOnClick(0)}
      >
        상품정보
      </div>
      <div
        className={
          tab[1] ? `details_tab_review ${clickShow}` : "details_tab_review"
        }
        onClick={() => handleOnClick(1)}
      >
        리뷰
      </div>
      <div
        className={tab[2] ? `details_tab_QA ${clickShow}` : "details_tab_QA"}
        onClick={() => handleOnClick(2)}
      >
        Q&A
      </div>
    </div>
  );
}

export default DetailsTab;
