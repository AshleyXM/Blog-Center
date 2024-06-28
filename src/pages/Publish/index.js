import { Card, Breadcrumb, Form, Button, Input, Space, Select } from "antd";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./index.scss";

const { Option } = Select;

const Publish = () => {
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: "Post a New Article" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter your article title" },
            ]}
          >
            <Input
              placeholder="Please enter your article title"
              style={{ width: 400 }}
            />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[
              { required: true, message: "Please select your article channel" },
            ]}
          >
            <Select
              placeholder="Please select your article channel"
              style={{ width: 400 }}
            >
              <Option value={0}>Art</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[
              { required: true, message: "Please enter your article content" },
            ]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please enter your article content"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Publish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
