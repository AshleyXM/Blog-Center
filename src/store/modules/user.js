// 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";

import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";

import { TOKEN_KEY } from "@/constants";

const userSlice = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken(TOKEN_KEY) || "",
    userInfo: {},
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // 存到localStorage
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

// 解构出actionCreator
const { setToken, setUserInfo } = userSlice.actions;

// 获取reducer函数
const reducer = userSlice.reducer;

// 异步方法，完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送异步请求
    const res = await request.post("/login", loginForm);
    // 提交同步action进行token的存入
    dispatch(setToken(res.data.token));
  };
};

// 获取个人信息异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get("/user/profile");
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo };

export default reducer;
