import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { Link, useSearchParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import { useEffect, useState } from "react";
import { createArticleAPI, getArticleDetailAPI } from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // get channel list via useChannel hook
  const { channelList } = useChannel();

  const [form] = Form.useForm();

  const onFinish = (formData) => {
    if (imageList.length !== imageType) {
      return message.warning(
        "The number of uploaded images does not match with the selected mode!"
      );
    }
    // 按照接口文档的格式处理收集到的表单数据
    const reqData = {
      ...formData,
      cover: {
        type: imageType,
        images: imageList.map((item) => item.response.data.url),
      },
    };
    createArticleAPI(reqData);
  };

  const [imageType, setImageType] = useState(0);

  const onTypeChange = (e) => {
    setImageType(e.target.value);
  };

  const [imageList, setImageList] = useState([]);

  const handleUpload = (value) => {
    setImageList(value.fileList);
  };

  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");

  useEffect(() => {
    async function getArticleDetail(articleId) {
      const res = await getArticleDetailAPI(articleId);
      form.setFieldsValue(res.data);
    }

    getArticleDetail(articleId);
  }, [articleId, form]);

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
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
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
          <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>One cover</Radio>
                <Radio value={3}>Three covers</Radio>
                <Radio value={0}>No cover</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                name="image"
                action="https://mock.apipark.cn/m1/4720333-4372679-default/upload"
                onChange={handleUpload}
                maxCount={imageType}
              >
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            )}
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
