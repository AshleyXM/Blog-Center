// 封装获取频道列表的逻辑
import { useState, useEffect } from "react";
import { getChannelAPI } from "@/apis/article";

function useChannel() {
  // 1. 获取频道列表的逻辑
  const [channelList, setChannelList] = useState([]);

  const getChannelList = async () => {
    const res = await getChannelAPI();
    setChannelList(res.data);
  };

  useEffect(() => {
    getChannelList();
  }, []);
  // 2. 把组件中要用到的数据return出去
  return {
    channelList,
  };
}

export { useChannel };
