// 统一中转工具模块函数，使得在其他路径使用不需要从具体文件导入
// import {request} from "@/utils"

import { request } from "./request";
import { setToken, getToken, removeToken } from "./token";

export { request, setToken, getToken, removeToken };
