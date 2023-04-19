import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteProduct, deleteCheckList } from "../../store/store";

function CartDeleteBtn({ id }: any): JSX.Element {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      if (window.confirm("삭제하시겠습니까?"))
        await axios.delete(`http://localhost:4000/cart/${id}`);
      dispatch(deleteProduct(id));
      dispatch(deleteCheckList(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ cursor: "pointer" }}
      className="delete_button"
      onClick={() => handleDelete()}
    >
      X
    </div>
  );
}

export default CartDeleteBtn;
