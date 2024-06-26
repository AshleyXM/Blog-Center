// 封装token相关的方法

import { TOKEN_KEY } from "@/constants";

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export { setToken, getToken, removeToken };
