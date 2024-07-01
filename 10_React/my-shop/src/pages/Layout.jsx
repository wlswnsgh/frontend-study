import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutSuccess, selectUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
      headers: {
        Authorization: token
      }
    });
    console.log(result);
    
    // 전역 상태 초기화
    dispatch(logoutSuccess());
    // 로컬 스트리지 초기화
    localStorage.removeItem('user');
    
    navigate('/');
  };

  return (
    <>
      {/* 헤더 */}
      <header>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#">주노샵</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/')}>홈</Nav.Link>
              <Nav.Link onClick={() => navigate('/cart')}>장바구니</Nav.Link>
            </Nav>
              {user ? (
                <>
                  <Link to="/profile">{user.nickname}</Link>
                  <Button variant="outline-success" onClick={handleLogout}></Button>
                </>
              ) :  <Button variant="outline-success" onClick={() => navigate('/login')}>로그인</Button>}
          </Container>
        </Navbar>
      </header>

      {/* 자식 컴포넌트가 렌더링 될 위치 */}
      <Outlet />

      <footer>
        <p className="py-5 mb-0 bg-dark text-white" >
          &copy; jjh junho jin. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Layout;