import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Product } from "../pages/products";

export interface RootState {
  cart: Cart[];
  cartCheckedList: CartCheckedList[];
}

// 장바구니 체크리스트 관리
interface CartCheckedList {
  id: number;
  switch: boolean;
}

interface Cart {
  id: number;
  title: string;
  content: string;
  price: number;
  imgUrl: string;
  count: number;
  stocks: number;
}

// 장바구니 관리
const cart = createSlice({
  // state이름
  name: "cart",
  initialState: [] as Cart[],
  reducers: {
    // -> findIndex를 사용하여 state의 id와 전달받은 id가 일치하는것을 리턴 -> 리턴받은 인덱스로 count + 1해줌
    addCount(state, action) {
      const addIndex = state.findIndex((item) => {
        return item.id === action.payload;
      });
      // 재고 이상으로 설정 못하게함.
      if (state[addIndex].count < state[addIndex].stocks) {
        state[addIndex].count++;
      }
    },
    minusCount(state, action) {
      const minusIndex = state.findIndex((item) => {
        return item.id === action.payload;
      });
      // 수량을 1개 이하로는 설정 못하게함.
      if (state[minusIndex].count > 1) {
        state[minusIndex].count--;
      }
    },
    addProduct(state, action) {
      // 주문하기 눌렀을때 만약 배열에 해당 상품이 있다 -> 그러면 count만 + 1 없으면 push
      // 해당하는 상품의 인덱스를 담는다 없으면 -1
      // splice메소드를 이용하여 기존 배열의 요소를 초기화 하고 push 해주기. (버그 방지)
      state.splice(0, state.length);
      state.push(...action.payload);
    },
    deleteProduct(state, action) {
      // 넘겨받은 id와 일치하는 index를 찾고 splice 메소드를 이용하여 해당 요소 삭제.
      const existingProductIndex = state.findIndex((product) => {
        return product.id === action.payload;
      });
      state.splice(existingProductIndex, 1);
    },
  },
});

const cartCheckedList = createSlice({
  name: "cartCheckedList",
  initialState: [] as CartCheckedList[],
  reducers: {
    checkedList(state, action) {
      // 기존배열 남아있으면 삭제
      state.splice(0, state.length);
      action.payload.forEach((item: Product) => {
        state.push({
          id: item.id,
          switch: false,
        });
      });
    },
    deleteCheckList(state, action) {
      // id를 파라미터로 넘겨받고 id와 일치하는 해당인덱스를 찾아 해당 인덱스요소 삭제
      const existingProductIndex = state.findIndex((item) => {
        return item.id === action.payload;
      });
      state.splice(existingProductIndex, 1);
    },
    onCheck(state, action) {
      // index를 파라미터로 받아옴 -> 해당 아이디의 switch 값을 true로 변경
      state[action.payload].switch = true;
    },
    offCheck(state, action) {
      state[action.payload].switch = false;
    },
    allOnCheck(state) {
      state.forEach((item) => {
        item.switch = true;
      });
    },
    allOffCheck(state) {
      state.forEach((item) => {
        item.switch = false;
      });
    },
  },
});

export const { addCount, minusCount, addProduct, deleteProduct } = cart.actions;
export const {
  checkedList,
  onCheck,
  offCheck,
  allOnCheck,
  allOffCheck,
  deleteCheckList,
} = cartCheckedList.actions;

export default configureStore({
  reducer: {
    cart: cart.reducer,
    cartCheckedList: cartCheckedList.reducer,
  },
});

// 1. state변경하고 싶을때 createSlice안에 state 수정해주는 함수 만들기
// 2. 만든함수 export 해주기. ->
// ex) export const { 함수1, 함수2, ... } = cart.actions <- (state변경함수들이 남음)
// 3. import해서사용

// Tip : array / objectd의 경우 state.name = "~~~" 이렇게 직접수정해도 state복사본을 리턴해줌. immer.js때문에
