import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  ProductOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet } from "react-router-dom";

const { Header, Sider } = Layout;

const items = [
  {
    label: "Home",
    key: "1",
    icon: <HomeOutlined />,
  },
  {
    label: "My Articles",
    key: "2",
    icon: <ProductOutlined />,
  },
  {
    label: "Post a New Article",
    key: "3",
    icon: <FileAddOutlined />,
  },
];

const GeekLayout = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">Ashley</span>
          <span className="user-logout">
            <Popconfirm
              title="Confirm to exit?"
              okText="Exit"
              cancelText="Cancel"
            >
              <LogoutOutlined /> Exit
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
