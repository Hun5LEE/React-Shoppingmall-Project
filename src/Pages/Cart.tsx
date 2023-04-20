import { useEffect } from "react";
import CartTable from "../components/cart/CartTable";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct, checkedList } from "../store/store";

function CartPage(): JSX.Element {
  const dispatch = useDispatch();
  // cart 데이터 받아오기
  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/cart", {
          cancelToken: source.token,
        });
        // 같은데이터 여러개 추가되는 버그 방지.
        if (data !== null) {
          dispatch(addProduct(data));
          dispatch(checkedList(data));
        }
      } catch (err) {
        alert("실패");
        console.log(err);
      }
    })();
    return () => {
      // 랜더링시 이전요청 삭제해줌. (불필요한 요청누적 방지)
      source.cancel("랜더링시 이전요청 삭제");
    };
  }, []);

  return (
    <>
      <CartTable />
    </>
  );
}

export default CartPage;
