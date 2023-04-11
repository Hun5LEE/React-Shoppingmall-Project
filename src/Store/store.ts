import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface RootState {
  cart: Cart[];
  cartCheckedList: CartCheckedList[];
}

interface Cart {
  id: number;
  title: string;
  content: string;
  price: number;
  img: string;
  count: number;
  stocks: number;
}

// 장바구니 관리
const cart = createSlice({
  // state이름
  name: "cart",
  initialState: [] as Cart[],
  reducers: {
    // Cart에서 addCount 파라미터로 state[i].id를 전달한다
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
      const existingProductIndex = state.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (existingProductIndex === -1) {
        state.push(action.payload);
      } else {
        // 주문하기 버튼 누를시 count + 1 이지만  stocks보다 초과못하게함.
        state[existingProductIndex].count <
          state[existingProductIndex].stocks &&
          state[existingProductIndex].count++;
        // DetailsProductsInfo에서 넘겨받은 해당 obj를 state에 push 해줌.
      }
    },
    deleteProduct(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

// 장바구니 체크리스트 관리
interface CartCheckedList {
  id: number;
  switch: boolean;
}

const cartCheckedList = createSlice({
  name: "cartCheckedList",
  initialState: [] as CartCheckedList[],
  reducers: {
    checkedList(state, action) {
      // 중복추가 못하게하기
      const existingProductIndex = state.findIndex((item) => {
        return item.id === action.payload;
      });
      if (existingProductIndex === -1) {
        state.push({
          id: action.payload,
          switch: false,
        });
      }
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
    deleteCheckList(state, action) {
      state.splice(action.payload, 1);
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
