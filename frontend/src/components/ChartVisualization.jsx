import React from "react";
import Plot from "react-plotly.js";

const ChartVisualization = () => {
  return (
    <div className="chart-visualization" style={{ width: "100%", height: "400px" }}>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5],
            y: [10, 15, 13, 17, 22],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
          {
            x: [1, 2, 3, 4, 5],
            y: [16, 5, 11, 9, 15],
            type: "bar",
            marker: { color: "orange" },
          },
        ]}
        layout={{
          width: "100%",
          height: 400,
          title: "Example Chart Visualization",
          xaxis: { title: "X Axis" },
          yaxis: { title: "Y Axis" },
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ChartVisualization;
