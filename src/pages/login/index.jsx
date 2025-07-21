import { Button, Checkbox, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apis/auth.api";
import { HttpStatusCode } from "axios";
import Cookies from "js-cookie";
import { parseJwt } from "../../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    // Giải mã token để lấy ra thông tin người dùng
    const decodedToken = parseJwt(accessToken);

    // Lấy ra thời gian hiện tại được tính bằng giây
    const currentTime = Date.now() / 1000;

    // Kiểm tra xem token đã hết hạn chưa
    if (decodedToken?.exp && currentTime < decodedToken.exp) {
      // Token chưa hết hạn -> quay về trang trước đó
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Hàm quản lý trạng thái disable hoặc enable của Button submit
  const handleChangeDisable = () => {
    setIsDisable((prev) => !prev);
  };

  const onFinish = async (values) => {
    try {
      // Hiển thị loading
      setIsLoading(true);

      const response = await login(values);

      // Nếu như đúng tài khoản thì thực hiện các công việc sau:
      // 1. Lưu trữ thông tin người dùng vào trong localStorage
      const userLoginedInfo = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
      };

      localStorage.setItem("userLogined", JSON.stringify(userLoginedInfo));

      // 2. Lưu accessToken và refreshToken vào Cookie của trình duyệt
      const { accessToken, refreshToken } = response.data;

      Cookies.set("access_token", accessToken, {
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("refresh_token", refreshToken, {
        secure: true,
        sameSite: "strict",
      });

      // 3. Hiển thị thông báo đăng nhập thành công
      message.success({
        content: "Đăng nhập thành công",
      });

      // 4. Chuyển hướng về trang dashboard
      navigate("/dashboard");
    } catch (error) {
      const statusCode = error?.status;

      if (statusCode === HttpStatusCode.BadRequest) {
        message.error({
          content: error?.response?.data,
        });
      }
    } finally {
      // Tắt loading
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#00B4DB] w-full h-screen flex items-center justify-center">
        <div className="bg-white w-[539px]  rounded-lg px-6 py-5">
          <div className="flex justify-center">
            <img src="/logo_rikkeiedu.png" alt="Logo Rikkei Education" />
          </div>
          <h3 className="text-[#144C65] text-[36px] font-semibold text-center my-6">
            Đăng nhập tài khoản
          </h3>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email không được để trống" },
                {
                  type: "email",
                  message: "Email không đúng địng dạng",
                },
              ]}
            >
              <Input className="h-12 bg-[#F5F5F5]" placeholder="Email" />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="password"
              rules={[
                { required: true, message: "Mật khẩu không được để trống" },
                {
                  min: 6,
                  message: "Mật khẩu tối thiểu 6 ký tự",
                },
              ]}
            >
              <Input.Password
                className="h-12 bg-[#F5F5F5]"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item label={null}>
              <div className="flex items-center justify-between">
                <Checkbox
                  checked={isDisable}
                  onChange={handleChangeDisable}
                  className="font-medium text-[16px]"
                >
                  Ghi nhớ đăng nhập
                </Checkbox>
                <Link className="text-[#CC5002] text-[16px] font-medium">
                  Quên mật khẩu
                </Link>
              </div>
            </Form.Item>

            <Form.Item label={null}>
              <Button
                loading={isLoading}
                disabled={!isDisable}
                className="w-full h-[44px]"
                type="primary"
                htmlType="submit"
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item label={null} className="mb-0">
              <div className="flex justify-center gap-2 text-[16px] font-medium">
                <p className="text-[#989898]">Bạn chưa có tài khoản? </p>
                <Link className="text-[#CC5002]" to="/register">
                  Đăng ký
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
