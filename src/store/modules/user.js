// 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: "",
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// 解构出actionCreator
const { setToken } = userSlice.actions;

// 获取reducer函数
const reducer = userSlice.reducer;

export { setToken };

export default reducer;
