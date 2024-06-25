import "./index.scss";
import { Card, Form, Input, Button, Select } from "antd";
import logo from "@/assets/logo.png";

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
  const onFinish = (values) => {
    console.log(
      "%c [ values ] - row 23: ",
      "background-color: #3756d4; padding: 4px 8px; border-radius: 2px; font-size: 14px; color: #fff; font-weight: 700;",
      values
    );
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
