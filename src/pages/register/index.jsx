import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../apis/auth.api";
import { HttpStatusCode } from "axios";

export default function Register() {
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm quản lý trạng thái disable hoặc enable của Button submit
  const handleChangeDisable = () => {
    setIsDisable((prev) => !prev);
  };

  const onFinish = async (values) => {
    delete values.confirmPassword;

    try {
      // Mở loading
      setIsLoading(true);

      const response = await register(values);

      if (response.status === HttpStatusCode.Created) {
        // Hiển thị thông báo đăng ký thành công
        message.success({
          content: "Đăng ký thành công",
        });

        // Chuyển hướng về trang đăng nhập
        navigate("/login");
      }
    } catch (error) {
      const statusCode = error?.response?.data?.error?.code;
      const errorMessage = error?.response?.data?.error?.details;

      // Chuyển đổi object thành 1 mảng
      const errorArray = Object.values(errorMessage);

      switch (statusCode) {
        case 400:
          // Hiển thị ra các thông báo liên quan đến dữ liệu nhập vào từ người dùng
          message.error({
            content: errorArray[0],
          });
          break;

        case 500:
          // Hiển thị lỗi liên quan đến server
          message.error({
            content: "Đã có lỗi xảy ra. Xin vui lòng thử lại sau",
          });
          break;

        default:
          // Hiển thị lỗi liên quan đến server
          message.error({
            content: "Đã có lỗi xảy ra. Xin vui lòng thử lại sau",
          });
          break;
      }
    } finally {
      // Tắt hiệu ứng loading
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
            Đăng ký tài khoản
          </h3>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="grid grid-cols-2 gap-5">
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Họ và đệm không được để trống" },
                ]}
              >
                <Input
                  className="h-12 bg-[#F5F5F5]"
                  placeholder="Họ và tên đệm của bạn"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Tên không được để trống" }]}
              >
                <Input
                  className="h-12 bg-[#F5F5F5]"
                  placeholder="Tên của bạn"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Tên đăng nhập không được để trống",
                },
              ]}
            >
              <Input
                className="h-12 bg-[#F5F5F5]"
                placeholder="Tên đăng nhập"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống",
                },
              ]}
            >
              <Input
                className="h-12 bg-[#F5F5F5]"
                placeholder="Số điện thoại"
              />
            </Form.Item>
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
                // {
                //   min: 6,
                //   message: "Mật khẩu tối thiểu 6 ký tự",
                // },
              ]}
            >
              <Input.Password
                className="h-12 bg-[#F5F5F5]"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Mật khẩu không được để trống" },
                // {
                //   min: 6,
                //   message: "Mật khẩu tối thiểu 6 ký tự",
                // },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu không khớp");
                  },
                }),
              ]}
            >
              <Input.Password
                className="h-12 bg-[#F5F5F5]"
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>

            <Form.Item label={null}>
              <Checkbox
                checked={isDisable}
                onChange={handleChangeDisable}
                className="font-medium text-[16px]"
              >
                <span>
                  Bạn có đồng ý với{" "}
                  <Link className="text-[#CC5002]">
                    Chính sách và điều khoản
                  </Link>{" "}
                  <span> của chúng tôi</span>
                </span>
              </Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button
                loading={isLoading}
                disabled={!isDisable}
                className="w-full h-[44px]"
                type="primary"
                htmlType="submit"
              >
                Đăng ký
              </Button>
            </Form.Item>
            <Form.Item label={null} className="mb-0">
              <div className="flex justify-center gap-2 text-[16px] font-medium">
                <p className="text-[#989898]">Đã có tài khoản? </p>
                <Link className="text-[#CC5002]" to="/login">
                  Đăng nhập
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
