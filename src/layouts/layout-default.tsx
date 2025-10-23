import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import "styles/index.css";
import LogoSider from "assets/logo-sider.png";
import LogoSiderWrap from "assets/logo-sider-wrap.png";
import { Layout, Menu, type MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { FormOutlined, LockOutlined, LogoutOutlined, PayCircleOutlined, TagsOutlined, ToolOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { logoutAPI } from "services/auth.service";
import { logout } from "redux/auth/authSlice";

const { Sider, Content } = Layout;
const HeaderComponent = React.lazy(() => import("layouts/header-component"));
const ProfilePage = React.lazy(() => import("pages/profile"));
const ChangePassword = React.lazy(() => import("pages/change-password"));

type MenuItem = Required<MenuProps>['items'][number];


const LayoutDefault = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [openProfile, setOpenProfile] = React.useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = React.useState<boolean>(false);

  const handleLogout = React.useCallback(async () => {
    const res = await logoutAPI();
    if (res.data) {
      localStorage.removeItem("access_token");
      dispatch(logout());
      navigate("/login");
    }
  }, [])

  const menuItem: MenuItem[] = React.useMemo(() => [
    {
      key: 'categories',
      label: <Link to="/categories">Kiểu tài sản</Link>,
      icon: <TagsOutlined />
    },
    {
      key: 'assets',
      label: <Link to="/assets">Tài sản</Link>,
      icon: <PayCircleOutlined />
    },
    {
      key: 'suppliers',
      label: <Link to="/suppliers">Nhà cung cấp</Link>,
      icon: <UsergroupAddOutlined />
    },
    {
      key: 'borrow-and-pay',
      label: <Link to="/borrow-and-pay">Quản lý mượn trả</Link>,
      icon: <FormOutlined />
    },
    {
      key: 'services',
      label: <Link to="/services">Quản lý sửa chữa</Link>,
      icon: <ToolOutlined />
    },
    {
      type: 'divider',
    },
    {
      key: 'profile',
      label: <p onClick={() => setOpenProfile(true)}>Hồ sơ cá nhân</p>,
      icon: <UserOutlined />
    },
    {
      key: 'change-password',
      label: <p onClick={() => setOpenChangePassword(true)}>Đổi mật khẩu</p>,
      icon: <LockOutlined />
    },
    {
      key: 'logout',
      label: <p onClick={handleLogout}>Đăng xuất</p>,
      icon: <LogoutOutlined />
    },
  ], [])

  const selectedKey = React.useMemo(() => {
    let current = menuItem.find(item => {
      if (item && "label" in item && React.isValidElement(item.label)) {
        // @ts-ignore
        const to = item.label.props.to as string | undefined;
        return to === location.pathname;
      }
      return false;
    })?.key;

    if (!current) {
      current = menuItem.find(item => {
        if (item && "label" in item && React.isValidElement(item.label)) {
          // @ts-ignore
          const to = item.label.props.to as string | undefined;
          return to !== "/" && location.pathname.startsWith(to!);
        }
        return false;
      })?.key;
    }

    return current;
  }, [location.pathname, menuItem]);

  return (
    <>
      <Layout>
        <Sider
          width={collapsed ? 80 : 280}
          style={{ height: '100vh', background: "white" }}
          collapsed={collapsed}
        >
          <div className="h-65px flex justify-center border-b border-b-[#edf2f9] cursor-pointer border-r border-r-[#edf2f9]">
            <Link to="/categories">
              <img src={collapsed ? LogoSiderWrap : LogoSider} className="object-contain " />
            </Link>
          </div>
          <Menu
            selectedKeys={selectedKey ? [selectedKey as string] : []}
            style={collapsed ? { width: 80 } : { width: 280 }}
            defaultSelectedKeys={['dashboard']}
            mode="inline"
            items={menuItem}
          />
        </Sider>
        <Layout>
          <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            className="p-[10px] h-[200px] overflow-y-auto"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout >

      <ProfilePage
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
      />

      <ChangePassword
        openChangePassword={openChangePassword}
        setOpenChangePassword={setOpenChangePassword}
      />
    </>
  )
}

export default React.memo(LayoutDefault);