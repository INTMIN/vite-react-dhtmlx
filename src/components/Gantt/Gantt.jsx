import React, { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import dayjs from "dayjs";
import "./index.less";

export default class Gantt extends Component {
  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    const { tasks } = this.props;
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  setZoom(value) {
    if (!gantt.$initialized) {
      this.initZoom();
    }
    gantt.ext.zoom.setLevel(value);
  }

  initZoom() {
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
    gantt.plugins({
      tooltip: true,
    });
    // 自定义tooltip内容
    gantt.templates.tooltip_text = function (start, end, task) {
      const t = gantt;
      const output = `<b>任务节点：</b>${task.text}<br/><b>计划开始时间：</b>${t.templates.tooltip_date_format(
        start
      )}<br/><b>计划结束时间：</b>${t.templates.tooltip_date_format(end)}`;
      return output;
    };

    gantt.config.columns = [
      {
        name: "text",
        label: "任务节点",
        width: 280,
        template: function (obj) {
          console.log("🤙🤙🤙👍👍👍👍👍 ~ Gantt ~ initZoom ~ obj:", obj)
          return `${obj.text}`; // 通过 template 回调可以指定返回内容值
        },
      },
      {
        name: "start_date",
        label: "开始时间",
        width: 380,
        template: function (obj) {
          return `${dayjs(obj.start_date).format("YYYY-MM-DD")}-${dayjs(
            obj.end_date
          ).format("YYYY-MM-DD")}`; // 通过 template 回调可以指定返回内容值
        },
      },
      {
        name: "duration",
        label: "持续时间",
        width: 280,
        align:'center',
        template: function (obj) {
          return `${obj.duration}`; // 通过 template 回调可以指定返回内容值
        },
      },
    ];
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <div
        ref={(input) => {
          this.ganttContainer = input;
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}
