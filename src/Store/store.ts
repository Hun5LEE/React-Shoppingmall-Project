import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface RootState {
  cart: Cart[];
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

const cart = createSlice({
  // state이름
  name: "cart",
  initialState: [] as Cart[],
  reducers: {
    // Cart에서 addCount 파라미터로 state[i].id를 전달한다
    // -> findIndex를 사용하여 state의 id와 전달받은 id가 일치하는것을 리턴 -> 리턴받은 인덱스로 count + 1해줌
    addCount(state, action) {
      const index = state.findIndex((item) => {
        return item.id === action.payload;
      });
      state[index].count++;
    },
    addProduct(state, action) {
      // DetailsProductsInfo에서 넘겨받은 해당 obj를 state에 push 해줌.
      state.push(action.payload);
    },
  },
});

export const { addCount, addProduct } = cart.actions;

export default configureStore({
  reducer: {
    cart: cart.reducer,
  },
});

// 1. state변경하고 싶을때 createSlice안에 state 수정해주는 함수 만들기
// 2. 만든함수 export 해주기. ->
// ex) export const { 함수1, 함수2, ... } = cart.actions <- (state변경함수들이 남음)
// 3. import해서사용

// Tip : array / objectd의 경우 state.name = "~~~" 이렇게 직접수정해도 state복사본을 리턴해줌. immer.js때문에
