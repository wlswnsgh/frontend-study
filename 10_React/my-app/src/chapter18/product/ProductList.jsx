import { useDispatch, useSelector } from "react-redux";
import React,{ useState } from "react";
import { addToProductList, selectProductList } from "./productSlice";

function ProductList() {
  const selection = useSelector(selectProductList);
  const dispatch = useDispatch();
  const [state, setState] = useState('');

  return (
    <>
      <p>
        상품 추가:
        <input 
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button
          type="button"
          onClick={() => dispatch(addToProductList(state))}
        >
          추가
        </button>
      </p>
      
      <p>상품 목록</p>
      <ul>
        {/* 반복 렌더링 */}
        {selection.map((e) => <li>{e}</li>)}
      </ul>
    </>
  );
};

export default ProductList;