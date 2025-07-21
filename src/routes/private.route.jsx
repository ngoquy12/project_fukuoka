import { Navigate } from "react-router-dom";
import EmployeeManager from "../pages/employeeManager";
import EmployeeDetail from "../pages/employeeManager/employeeDetail";
import EmployeeList from "../pages/employeeManager/employeeList";
import FormEmployee from "../pages/employeeManager/formEmployee";
import Dashboard from "../pages/dashboard";
import BranchManager from "../pages/branchManager";
import StoreManager from "../pages/storeManager";
import DefaultLayout from "../layouts/defaultLayout";

// Danh sách các đường dẫn cần phải đăng nhập thì mới vào được
const privateRoutes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "branch-manager",
        element: <BranchManager />,
      },
      {
        path: "store-manager",
        element: <StoreManager />,
      },
      {
        path: "employee-manager",
        element: <EmployeeManager />,
        children: [
          {
            index: true,
            element: <Navigate to="list" />,
          },
          {
            path: "list",
            element: <EmployeeList />,
          },

          {
            path: "detail/:id",
            element: <EmployeeDetail />,
          },
          {
            path: "create",
            element: <FormEmployee mode={"create"} />,
          },
          {
            path: "edit/:id",
            element: <FormEmployee mode={"edit"} />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;
