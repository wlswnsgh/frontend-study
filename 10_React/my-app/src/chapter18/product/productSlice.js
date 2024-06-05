import { createSlice } from "@reduxjs/toolkit";


const init = {
    productList: [],
};

const productslice = createSlice({
  name: 'product',
  initialState: init,
  reducers: {
    addToProductList: (ex1, ex2) => {
      // ex1.value = ex2.payload;
      ex1.productList.push(ex2.payload);
    }
  }
});

export const { addToProductList } =  productslice.actions;

export const selectProductList = (state) => state.product.productList;

export default productslice.reducer;