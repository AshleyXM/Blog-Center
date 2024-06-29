import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Popconfirm,
} from "antd";

import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
import { useEffect, useState } from "react";
import { deleteArticleAPI, getArticleListAPI } from "@/apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;

const STATUS = {
  0: "Draft",
  1: "In Review",
  2: "Published",
};

const STATUS_TAGS = {
  0: <Tag color="error">{STATUS[0]}</Tag>,
  1: <Tag color="warning">{STATUS[1]}</Tag>,
  2: <Tag color="success">{STATUS[2]}</Tag>,
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
    render: (type) => STATUS_TAGS[type],
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
];

const Article = () => {
  const TABLE_COLUMNS = [
    ...columns,
    {
      title: "Action",
      render: (row) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Popconfirm
              title="Confirm to delete this article?"
              onConfirm={() => handleArticleDelete(row.id)}
              okText="Yes"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const { channelList } = useChannel();

  const [articleList, setArticleList] = useState([]);
  const [count, setCount] = useState(0);

  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    start_pubdate: "",
    end_pubdate: "",
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    async function getArticleList() {
      const res = await getArticleListAPI(reqData);
      setArticleList(res.data.results);
      setCount(res.data.total);
    }

    getArticleList();
  }, [reqData]);

  const onFinish = (formData) => {
    setReqData({
      ...reqData,
      status: formData.status,
      channel_id: formData.channel_id,
      start_pubdate: formData.date[0].format("YYYY-MM-DD"),
      end_pubdate: formData.date[1].format("YYYY-MM-DD"),
    });
  };

  const onPageChange = (page) => {
    setReqData({
      ...reqData,
      page,
    });
  };

  const handleArticleDelete = async (id) => {
    await deleteArticleAPI(id);
    setReqData({
      ...reqData,
    }); // 注意这里不能写成setReqData(reqData)，因为这样写引用没有更新，不会触发re-render
  };

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
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={""}>All</Radio>
              <Radio value={0}>{STATUS[0]}</Radio>
              <Radio value={1}>{STATUS[1]}</Radio>
              <Radio value={2}>{STATUS[2]}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[
              {
                required: true,
                message: "Please select channel",
              },
            ]}
          >
            <Select placeholder="Please select" style={{ width: 150 }}>
              {channelList.map((item) => (
                <Option id={item.id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please pick date range",
              },
            ]}
          >
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`${count} results in total found per the filter condition:`}>
        <Table
          columns={TABLE_COLUMNS}
          dataSource={articleList}
          pagination={{
            total: count,
            pageSize: reqData.pageSize,
            onChange: onPageChange,
            showSizeChanger: false,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
