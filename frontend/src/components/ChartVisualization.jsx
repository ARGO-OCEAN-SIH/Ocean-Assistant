import React, { useState } from "react";
import Plot from "react-plotly.js";

const chartOptions = [
  {
    name: "Line & Bar Combo",
    description: "Combined line and bar to compare ocean parameters over time",
    data: [
      {
        x: [1, 2, 3, 4, 5],
        y: [10, 15, 13, 17, 22],
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "#00bfff" },
        line: { color: "#0077be", width: 3 },
        name: "Temperature (°C)",
      },
      {
        x: [1, 2, 3, 4, 5],
        y: [16, 5, 11, 9, 15],
        type: "bar",
        marker: { color: "#ffa500" },
        name: "Salinity (PSU)",
      },
    ],
    layout: {
      title: { text: "Temperature and Salinity over Months", font: { color: "#FFFFFF", size: 24, family: "'Poppins', sans-serif" } },
      xaxis: { title: { text: "Month", font: { color: "#FFFFFF", family: "'Poppins', sans-serif" } }, tickfont: { color: "#FFFFFF" } },
      yaxis: { title: { text: "Value", font: { color: "#FFFFFF", family: "'Poppins', sans-serif" } }, tickfont: { color: "#FFFFFF" } },
      legend: { orientation: "h", y: -0.2, font: { color: "#FFFFFF" } },
      plot_bgcolor: "#001f3f",
      paper_bgcolor: "#00172d",
      font: { family: "'Poppins', sans-serif", color: "#FFFFFF" },
    },
  },
  {
    name: "Scatter 3D",
    description: "3D scatter plot for visualizing ocean depth, salinity, and temperature",
    data: [
      {
        x: [1, 2, 3, 4, 5, 6, 7],
        y: [7, 8, 9, 10, 11, 12, 13],
        z: [5, 6, 7, 8, 9, 10, 11],
        mode: "markers",
        type: "scatter3d",
        marker: {
          size: 8,
          color: [10, 15, 13, 17, 22, 19, 14],
          colorscale: "Viridis",
          colorbar: { title: "Temperature (°C)", titleside: 'right', tickfont: { color: "#FFFFFF" }, titlefont: { color: "#FFFFFF" } },
          showscale: true,
          line: { width: 1, color: '#00bfff' },
          opacity: 0.9,
        },
        name: "Floats",
      },
    ],
    layout: {
      title: { text: "3D Scatter: Depth vs Salinity vs Temperature", font: { color: "#FFFFFF", size: 24, family: "'Poppins', sans-serif" } },
      scene: {
        xaxis: { title: { text: "Depth (m)", font: { color: "#FFFFFF", family: "'Poppins', sans-serif" } }, tickfont: { color: "#FFFFFF" }, backgroundcolor: "#001f3f", gridcolor: "#004080" },
        yaxis: { title: { text: "Salinity (PSU)", font: { color: "#FFFFFF", family: "'Poppins', sans-serif" } }, tickfont: { color: "#FFFFFF" }, backgroundcolor: "#001f3f", gridcolor: "#004080" },
        zaxis: { title: { text: "Temperature (°C)", font: { color: "#FFFFFF", family: "'Poppins', sans-serif" } }, tickfont: { color: "#FFFFFF" }, backgroundcolor: "#001f3f", gridcolor: "#004080" },
        bgcolor: "#00172d"
      },
      paper_bgcolor: "#00172d",
      font: { family: "'Poppins', sans-serif", color: "#FFFFFF" },
      margin: { l: 0, r: 0, b: 0, t: 50 },
    },
  },
  {
    name: "Heatmap",
    description: "Heatmap showing temperature distribution across depths and dates",
    data: [
      {
        z: [
          [22, 21, 20, 19, 18],
          [21, 20, 19, 18, 17],
          [20, 19, 18, 17, 16],
          [19, 18, 17, 16, 15],
          [18, 17, 16, 15, 14],
        ],
        x: ["Day1", "Day2", "Day3", "Day4", "Day5"],
        y: ["0m", "10m", "20m", "30m", "40m"],
        type: "heatmap",
        colorscale: "YlOrRd",
        showscale: true,
        colorbar: { title: "Temp (°C)", titleside: "right", tickfont: { color: "#FFFFFF" }, titlefont: { color: "#FFFFFF" } },
        name: "Temperature (°C)",
      },
    ],
    layout: {
      title: { text: "Temperature Heatmap by Depth and Day", font: { color: "#FFFFFF", size: 24, family: "'Poppins', sans-serif" } },
      xaxis: { title: { text: "Date", font: { color: "#FFFFFF", family: "'Poppins', sans-serif" } }, tickfont: { color: "#FFFFFF" } },
      yaxis: { title: { text: "Depth", font: { color: "#FFFFFF", family: "'Poppins', sans-serif" } }, tickfont: { color: "#FFFFFF" } },
      paper_bgcolor: "#00172d",
      plot_bgcolor: "#00172d",
      font: { family: "'Poppins', sans-serif", color: "#FFFFFF" },
      margin: { t: 50, b: 40 },
    },
  },
  {
    name: "Pie Chart",
    description: "Distribution of float types by category",
    data: [
      {
        values: [30, 20, 25, 15, 10],
        labels: ["Type A", "Type B", "Type C", "Type D", "Type E"],
        type: "pie",
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true,
        marker: {
          colors: ["#0077be", "#00bfff", "#00527d", "#ffa500", "#ffaf40"],
          line: { color: "#00172d", width: 2 }
        },
      },
    ],
    layout: {
      title: { text: "ARGO Float Types Distribution", font: { color: "#FFFFFF", size: 24, family: "'Poppins', sans-serif" } },
      showlegend: false,
      paper_bgcolor: "#00172d",
      font: { family: "'Poppins', sans-serif", color: "#FFFFFF" },
      margin: { t: 40, b: 0, l: 10, r: 10 },
    },
  },
];
// Criteria to choose graphs:
// - Line & Bar Combo: Trend analysis of ocean parameters over months.
// - Scatter 3D: Multidimensional insight into float data (depth, salinity, temp).
// - Heatmap: Visual temperature distribution across depths/time.
// - Pie Chart: Categorical distribution of float types.
const ChartVisualization = () => {
  const [selectedChart, setSelectedChart] = useState(0);
  const handleChange = (e) => setSelectedChart(Number(e.target.value));
  return (
    <div className="max-w-full mx-auto p-4 min-h-[450px] font-sans text-white bg-gradient-to-br from-[#003366] to-[#006699] rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-300 to-blue-600 bg-clip-text text-transparent drop-shadow-md">
        Ocean Data Chart Visualization
      </h2>
      <div className="max-w-4xl mx-auto mb-8">
        <label 
          htmlFor="chart-select" 
          className="block mb-3 font-semibold text-cyan-300"
        >
          Select Chart Type:
        </label>
        <select
          id="chart-select"
          value={selectedChart}
          onChange={handleChange}
          className="w-full max-w-xs p-3 border-2 border-cyan-400 rounded-xl text-lg font-medium bg-[#004d80] focus:outline-none focus:ring-4 focus:ring-cyan-300 transition"
          aria-label="Chart type selector"
        >
          {chartOptions.map((chart, index) => (
            <option key={index} value={index} className="bg-[#004d80] text-white">
              {chart.name}
            </option>
          ))}
        </select>
        <p className="mt-4 italic text-cyan-300 max-w-xl mx-auto text-center font-semibold drop-shadow-md">
          {chartOptions[selectedChart].description}
        </p>
      </div>
      <div className="w-full max-w-5xl mx-auto" style={{ minHeight: 400 }}>
        <Plot
          data={chartOptions[selectedChart].data}
          layout={{
            ...chartOptions[selectedChart].layout,
            autosize: true,
            responsive: true,
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          config={{ displayModeBar: true, responsive: true }}
        />
      </div>
      <style jsx>{`
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image:
            linear-gradient(45deg, transparent 50%, cyan 50%),
            linear-gradient(135deg, cyan 50%, transparent 50%);
          background-position:
            calc(100% - 20px) calc(1em + 2px),
            calc(100% - 15px) calc(1em + 2px);
          background-size: 5px 5px;
          background-repeat: no-repeat;
          cursor: pointer;
          color: white;
        }
        option {
          background-color: #004d80;
          color: white;
        }
      `}</style>
    </div>
  );
};
export default ChartVisualization;
