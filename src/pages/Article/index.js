import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";

import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
import { useEffect, useState } from "react";
import { getArticleListAPI } from "@/apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;

const status = {
  0: <Tag color="error">Draft</Tag>,
  1: <Tag color="warning">Being reviewed</Tag>,
  2: <Tag color="success">Published</Tag>,
};

const columns = [
  {
    title: "Cover",
    dataIndex: "cover",
    width: 120,
    render: (cover) => {
      return (
        <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      );
    },
  },
  {
    title: "Title",
    dataIndex: "title",
    width: 180,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (type) => status[type],
  },
  {
    title: "Publication Date",
    dataIndex: "pub_date",
  },
  {
    title: "Count of Views",
    dataIndex: "view_count",
  },
  {
    title: "Count of Comments",
    dataIndex: "comment_count",
  },
  {
    title: "Count of Likes",
    dataIndex: "like_count",
  },
  {
    title: "Action",
    render: (data) => {
      return (
        <Space size="middle">
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Space>
      );
    },
  },
];

const Article = () => {
  const { channelList } = useChannel();

  const [articleList, setArticleList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getArticleList() {
      const res = await getArticleListAPI();
      setArticleList(res.data.results);
      setCount(res.data.total);
    }

    getArticleList();
  }, []);

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: "My Articles" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={""}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={2}>Published</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select placeholder="Please select" style={{ width: 150 }}>
              {channelList.map((item) => (
                <Option id={item.id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`${count} Results in Total Found per the Filter Condition:`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
    </div>
  );
};

export default Article;
