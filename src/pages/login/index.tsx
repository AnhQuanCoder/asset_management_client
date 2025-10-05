import React from "react";
import { EyeInvisibleOutlined, EyeOutlined, IdcardOutlined, LaptopOutlined, LockOutlined, MailOutlined, PhoneOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { App } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "styles/index.css";
import { loginAPI } from "@/services/auth.service";
import { login } from "@/redux/auth/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await loginAPI({ username, password });
    if (res.data) {
      message.success("Đăng nhập thành công!");
      dispatch(login({ user: res.data.user }));
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/");
    } else {
      message.error(res.message);
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Logo and description */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 logo-bg text-white">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-8">
            <img
              src="https://utt.edu.vn/uploads/file-manager/images/Logo%20UTT_logo-40x60-xanh.png"
              alt="Logo UTT"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">HỆ THỐNG QUẢN LÝ TÀI SẢN</h1>
          <h2 className="text-xl font-semibold mb-6 text-[#F59221]">
            TRƯỜNG ĐẠI HỌC CÔNG NGHỆ GTVT
          </h2>
          <p className="text-gray-200 mb-8">
            Hệ thống quản lý tài sản toàn diện giúp theo dõi, bảo trì và quản lý
            tất cả tài sản của trường đại học một cách hiệu quả.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-[#F59221] p-3 rounded-full w-[50px] h-[50px]">
              <LaptopOutlined />
            </div>
            <div className="bg-[#F59221] p-3 rounded-full w-[50px] h-[50px]">
              <IdcardOutlined />
            </div>
            <div className="bg-[#F59221] p-3 rounded-full w-[50px] h-[50px]">
              <ReadOutlined />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#25255F] mb-2">
              ĐĂNG NHẬP
            </h2>
            <p className="text-gray-600">Vui lòng nhập thông tin tài khoản của bạn</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserOutlined />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59221] focus:border-transparent transition duration-200"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockOutlined />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59221] focus:border-transparent transition duration-200"
                  placeholder="Nhập mật khẩu"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-[#F59221]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#F59221] focus:ring-[#F59221] border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#F59221] hover:text-orange-600"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#F59221] hover:bg-[#252560] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59221] transition duration-200 cursor-pointer"
              >
                Đăng nhập
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc liên hệ hỗ trợ
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <PhoneOutlined /> Hotline
                  </div>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <MailOutlined /> Email
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              © 2025 Hệ thống Quản lý Tài sản Trường Đại học. Bản quyền thuộc về{" "}
              <span className="text-[#F59221] font-medium cursor-pointer">
                Phòng Công tác Quản trị
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
