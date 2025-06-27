import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Cần kiêm tra xem người dùng đã đăng nhập chưa. Nếu đã đăng nhập rồi thì không được phép quay về trang đăng nhập
  const isLogin = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      // Chuyển hướng về trang dashboard
      navigate("/dashboard");
    }
  }, [isLogin]);
  return <div>Login</div>;
}
