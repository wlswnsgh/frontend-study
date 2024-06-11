import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  selectProduct: null
}

// 상품 정보를 담을 slice 만들기
const productslice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      console.log(action.payload);
      state.productList =  action.payload;
    },
    getSelectedProduct: (state, action) => {
      console.log(action.payload);
      state.productList = action.payload;
    }
  }
});

// 액션 생성 함수
export const { getAllProducts, getSelectedProduct } = productslice.actions;

// 선택자 함수
export const selectProductList = (state) => state.product.productList;

// 리듀서 함수들
export default productslice.reducer;