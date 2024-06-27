// 柱状图组件
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

// 1. 把功能代码都放到这个组件中
// 2. 把可变的部分抽象成props参数
const BarChart = ({ title }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 保证dom可用，才进行图表的渲染
    // 1. 获取渲染图表的dom结点
    const chartDom = chartRef.current;
    // 2. 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom);
    // 3. 图表参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };

    // 4. 使用图表，并完成图表的渲染
    myChart.setOption(option);
  }, []);

  return <div ref={chartRef} style={{ width: "500px", height: "400px" }}></div>;
};

export default BarChart;
