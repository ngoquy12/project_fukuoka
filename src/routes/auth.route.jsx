import Login from "../pages/login";
import Register from "../pages/register";

// Danh sách các đường dẫn liên quan đến đăng ký, đăng nhập và phân quyền
const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default authRoutes;
