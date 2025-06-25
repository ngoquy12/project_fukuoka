import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./public.route";
import privateRoutes from "./private.route";
import authRoutes from "./auth.route";

// Gộp danh sách các route của ứng dụng lại
const routes = [...publicRoutes, ...privateRoutes, ...authRoutes];

const routers = createBrowserRouter(routes);

export default routers;
