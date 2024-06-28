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

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
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
      width: 220,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) => <Tag color="green">Published</Tag>,
    },
    {
      title: "Publication Date",
      dataIndex: "pubdate",
    },
    {
      title: "Count of Views",
      dataIndex: "read_count",
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

  const data = [
    {
      id: "8218",
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: "2019-03-11 09:00:00",
      read_count: 2,
      status: 2,
      title: "wkwebview offline loading h5 sesource solution",
    },
  ];
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
            <Select
              placeholder="Please select article channel"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
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
      <Card title={`{count} Results in Total Found per the Filter Condition:`}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Article;
