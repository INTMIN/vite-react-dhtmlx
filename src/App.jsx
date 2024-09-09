import React, { Component } from "react";
import Gantt from "./components/Gantt/Gantt";
import Toolbar from "./components/Toolbar";
import "./App.css";

const data = {
  data: [
    {
      id: 1,
      text: "第一个任务 #1",
      start_date: "2024-09-09",
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      text: "第二个任务 #2",
      start_date: "2024-09-18",
      duration: 3,
      progress: 0.4,
    },
  ],
  links: [{ id: 1, source: 1, target: 2, type: "0" }],
};

class App extends Component {
  state = {
    currentZoom: "Days",
  };

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom,
    });
  };
  render() {
    const {currentZoom}= this.state
    return (
      <div>
        <Toolbar zoom={currentZoom} onZoomChange={this.handleZoomChange} />
        <Gantt tasks={data} zoom={currentZoom} />
      </div>
    );
  }
}
export default App;
