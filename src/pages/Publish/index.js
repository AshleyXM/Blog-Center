import { Card, Breadcrumb, Form, Button, Input, Space, Select } from "antd";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import { useEffect, useState } from "react";
import { getChannelAPI, createArticleAPI } from "@/apis/article";

const { Option } = Select;

const Publish = () => {
  const [channelList, setChannelList] = useState([]);

  const getChannelList = async () => {
    const res = await getChannelAPI();
    setChannelList(res.data);
  };

  useEffect(() => {
    getChannelList();
  }, []);

  const onFinish = (formData) => {
    // 按照接口文档的格式处理收集到的表单数据
    const reqData = {
      ...formData,
      cover: {
        type: 0,
        images: [],
      },
    };
    createArticleAPI(reqData);
  };

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
          onFinish={onFinish}
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
              {channelList.map((item) => (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              ))}
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
