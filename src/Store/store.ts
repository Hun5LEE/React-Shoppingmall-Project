import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface RootState {
  cart: Cart[];
}

interface Cart {
  id: number;
  name: string;
  count: number;
}

const cart = createSlice({
  // state이름
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 1 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ] as Cart[],
  reducers: {
    // changeCount(state) {
    //   return state[1].count + 1;
    // },
  },
});

// export const { changeCount } = cart.actions;

export default configureStore({
  reducer: {
    cart: cart.reducer,
  },
});

// 1. state변경하고 싶을때 createSlice안에 state 수정해주는 함수 만들기
// 2. 만든함수 export 해주기. ->
// ex) export const { 함수1, 함수2, ... } = cart.actions <- (state변경함수들이 남음)
// 3. import해서사용
