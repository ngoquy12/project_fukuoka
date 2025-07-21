import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { LayoutDashboard, Store, UsersRound, Warehouse } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/header";
import Cookies from "js-cookie";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link to="/dashboard">Trang chủ</Link>,
    "dashboard",
    <LayoutDashboard size={20} />
  ),
  getItem(
    <Link to="/store-manager">Quản lý cửa hàng</Link>,
    "store-manager",
    <Store size={20} />
  ),
  getItem(
    <Link to="/branch-manager">Quản lý chi nhánh</Link>,
    "branch-manager",
    <Warehouse size={20} />
  ),
  getItem(
    <Link to="/employee-manager">Quản lý nhân viên</Link>,
    "employee-manager",
    <UsersRound size={20} />
  ),
];

export default function DefaultLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={298}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        {/* Component Header */}
        <HeaderComponent />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            className="py-6"
            items={[
              {
                title: "Trang chủ",
              },
              {
                title: (
                  <Link to="/employee-manager/list">Danh sách nhân viên</Link>
                ),
              },
              {
                title: (
                  <Link to="/employee-manager/detail/1">
                    Chi tiết nhân viên
                  </Link>
                ),
              },
              {
                title: "Nguyễn Văn A",
              },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Hiển thị nội dung của các trang con */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
