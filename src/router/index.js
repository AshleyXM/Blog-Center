// 路由配置
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";

import { createBrowserRouter } from "react-router-dom";

import AuthRoute from "@/components/AuthRoute";
import { Suspense, lazy } from "react";

// 使用lazy函数对组件进行导入（懒加载）
const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

// 配置路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="Loading...">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/article",
        element: (
          <Suspense fallback="Loading...">
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/publish",
        element: (
          <Suspense fallback="Loading...">
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
