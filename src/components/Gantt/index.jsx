import React, { Component, useEffect, useState } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
// import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js";
import "dhtmlx-gantt/codebase/locale/locale_cn.js";
import * as styles from "./index.less";
import "./index.less";

const Gantt = (props) => {
  const containRef = React.useRef();
  console.log("🤙🤙🤙👍👍👍👍👍 ~ Gantt ~ containRef:", containRef);
  const { tasks } = props;
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    // gantt.init(containRef.current);
    // gantt.parse(tasks);
    if (containRef.current) {
      gantt.config.date_format = "%Y-%m-%d %H:%i";

      generateGantt(tasks);

      // setZoom(0.2)
    }
  }, [tasks]);

  useEffect(()=>{
    console.log("🤙🤙🤙👍👍👍👍👍 ~ useEffect ~ gantt:", gantt)
    gantt.render()
  },[gantt])

  async function generateGantt(data) {
    if (isMount) {
      // 若不加判断，首次使用会报错
      gantt.clearAll(); // 移除所有任务，否则更新时任务会叠加
    }
    console.log("🤙🤙🤙👍👍👍👍👍 ~ generateGantt ~ gantt:", gantt);
    setConfig(); // 添加配置
    gantt.init(containRef.current); // 初始化 dhtmlxGantt 到 ganttContainer 容器中
    gantt.parse(data); // 将数据注入到甘特图
  }

 const setZoom=(value)=> {
   console.log("🤙🤙🤙👍👍👍👍👍 ~ setZoom ~ gantt:", gantt)
    if(!gantt.$initialized){
        initZoom();
    }
    gantt.ext.zoom.setLevel(value);
}

  const initZoom =()=>{
    gantt.ext.zoom.init({
      levels: [
        {
          name: "Hours",
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: "day", step: 1, format: "%d %M" },
            { unit: "hour", step: 1, format: "%H" },
          ],
        },
        {
          name: "Days",
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "week", step: 1, format: "Week #%W" },
            { unit: "day", step: 1, format: "%d %M" },
          ],
        },
        {
          name: "Months",
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: "%F" },
            { unit: "week", step: 1, format: "#%W" },
          ],
        },
      ],
    });
  }

  const setConfig = () => {
    gantt.config.columns = [
      {
        name: "text",
        label: "里程碑节点",
        width: 280,
        template: function (obj) {
          return `节点：${obj.text}`; // 通过 template 回调可以指定返回内容值
        },
      },
    ];
    (gantt.templates.tooltip_text = function (start, end, task) {
      const t = gantt;
      const output = `<b>里程碑：</b>${task.text}<br/><b>计划开始时间：</b>${t.templates.tooltip_date_format(
        start
      )}<br/><b>计划结束时间：</b>${t.templates.tooltip_date_format(end)}`;
      return output;
    })
      // 添加tooltip
      // gantt.attachEvent("onGanttReady", function () {
      //   var tooltips = gantt.ext.tooltips;
      //   tooltips.tooltip.setViewport(gantt.$task_data);
      // });
  };

  return (
    <>
      {/* <div className={styles.zoomBar}>
        <Toolbar zoom={currentZoom} onZoomChange={this.handleZoomChange} />
      </div> */}
      <div className={styles.gantt}>
        <div
          ref={(input) => {
            containRef.current = input;
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default Gantt;
