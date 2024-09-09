import { Radio, Space } from "antd";
import React, { useState } from "react";

const options = [
  { label: "小时", value: "Hours" },
  { label: "天", value: "Days" },
  { label: "月", value: "Months" },
];

const Toolbar = (props) => {
  const [values, setValue] = useState("Hours");

  const onChange = ({ target: { value } }) => {
    setValue(value);
    if (props.onZoomChange) {
      props.onZoomChange(value);
    }
  };
  return (
    <div style={{height:50}}>
      <Space>
        <div>维度：</div>
        <Radio.Group
          options={options}
          onChange={onChange}
          value={values}
          optionType="button"
          buttonStyle="solid"
        />
      </Space>
    </div>
  );
};

export default Toolbar;
