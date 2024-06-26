import "./index.scss";
import { Card, Form, Input, Button, Select, message } from "antd";
import logo from "@/assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";

import { useNavigate } from "react-router-dom";

const { Option } = Select;

const phonePrefixSelector = (
  <Form.Item noStyle>
    <Select
      style={{
        width: 70,
      }}
      defaultValue="1"
      disabled
    >
      <Option value="1">+1</Option>
    </Select>
  </Form.Item>
);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // 触发异步action
    await dispatch(fetchLogin(values));

    // 跳转到首页
    navigate("/");
    // 提示用户
    message.success("Login successfully!");
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* Login Form */}
        <Form onFinish={onFinish}>
          <Form.Item
            name="phone"
            // Check the rules from top to bottom when there exist multiple rules
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/,
                message: "Please make sure your phone number is correct",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter phone number"
              addonBefore={phonePrefixSelector}
            />
          </Form.Item>
          <Form.Item
            name="vericode"
            rules={[
              {
                required: true,
                message: "Please input the verification code!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
