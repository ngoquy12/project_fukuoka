import NotFound from "../pages/notFound";

// Danh sách các đường dẫn không cần đăng nhập cũng vào được
const publicRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
];

export default publicRoutes;
