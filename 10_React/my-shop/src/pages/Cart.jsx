import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCount, increaseCount, selectCartList } from "../features/cart/cartSlice";

function Cart() {
  const cartList = useSelector(selectCartList);
  const formatter = new Intl.NumberFormat('ko-kr');
  const dispatch = useDispatch();
  console.log(cartList);


  return (
    <>
      {/* 표 레이아웃 만들기 */}
      <Table striped bordered hover>
        <thead>
            <tr>
              <th>No</th>
              <th>상품명</th>
              <th>수량</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
          {/* <tr>
            <td>1</td>
            <td>라켓</td>
            <td>2</td>
            <td>199,000원</td>
          </tr> */}

          {/* Quiz: cartList: 반복 렌더링 및 렌더링 및 데이터 바인딩 */}
          {cartList.map((state, index) => {
            return <tr key={state.id}>
            <td>{index + 1}</td>
            <td>{state.title}</td>
            <td>
              <button
                type="button"
                onClick={() => dispatch(decreaseCount(state.id))}
              >
                -
              </button>
              {state.count}
              <button
                type="button"
                onClick={() => dispatch(increaseCount(state.id))}
              >
                +
              </button>
            </td>
            <td>{formatter.format(state.price)}원</td>
          </tr>;
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Cart;