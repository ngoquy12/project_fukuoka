import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/index.route";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN"; // Ngôn ngữ Tiếng Việt

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00B4DB",
        },
      }}
      locale={viVN} // Thiết lập ngôn ngữ Tiếng Việt
    >
      <RouterProvider router={routers} />
    </ConfigProvider>
  </StrictMode>
);
