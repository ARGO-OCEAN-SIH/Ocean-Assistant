import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  LineController,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  LineController,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

// ─── Data ────────────────────────────────────────────────────────────────────

const KPI_DATA = [
  { label: "Total Revenue",    value: "$84,210", delta: "+12.4%", up: true,  icon: "💰" },
  { label: "Active Users",     value: "14,839",  delta: "+8.1%",  up: true,  icon: "👥" },
  { label: "Conversion Rate",  value: "3.62%",   delta: "-0.3%",  up: false, icon: "📈" },
  { label: "Avg. Session",     value: "4m 18s",  delta: "+5.7%",  up: true,  icon: "⏱️" },
];

const CHANNELS = [
  { name: "Organic Search", pct: 38, color: "#3266ad" },
  { name: "Direct",         pct: 24, color: "#5DCAA5" },
  { name: "Paid Ads",       pct: 19, color: "#EF9F27" },
  { name: "Social",         pct: 12, color: "#D4537E" },
  { name: "Referral",       pct: 7,  color: "#888780" },
];

const WEEK_LABELS = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"];
const REV_LABELS  = ["Mar 3","Mar 10","Mar 17","Mar 24","Mar 31","Apr 7","Apr 14","Apr 21","Apr 28"];
const REV_DATA    = [52000,58000,54000,63000,70000,66000,75000,80000,84210];
const TARGET_DATA = [55000,60000,60000,65000,68000,70000,72000,76000,82000];
const NEW_USERS   = [1200,1380,1100,1550,1620,1780];
const RET_USERS   = [2100,2300,2150,2500,2600,2800];

// ─── Sub-components ──────────────────────────────────────────────────────────

function KpiCard({ label, value, delta, up, icon }) {
  return (
    <div className="col-6 col-md-3">
      <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12 }}>
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="text-muted" style={{ fontSize: 12, letterSpacing: "0.04em" }}>
              {label.toUpperCase()}
            </span>
            <span style={{ fontSize: 18 }}>{icon}</span>
          </div>
          <div className="fw-semibold mb-1" style={{ fontSize: 24, color: "#1a1a2e" }}>
            {value}
          </div>
          <span
            className={`badge rounded-pill ${up ? "bg-success" : "bg-danger"} bg-opacity-10`}
            style={{ fontSize: 11, color: up ? "#166534" : "#991b1b", fontWeight: 500 }}
          >
            {up ? "▲" : "▼"} {delta} vs last month
          </span>
        </div>
      </div>
    </div>
  );
}

function RevenueChart() {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: REV_LABELS,
        datasets: [
          {
            label: "Revenue",
            data: REV_DATA,
            borderColor: "#3266ad",
            backgroundColor: "rgba(50,102,173,0.08)",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "#3266ad",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Target",
            data: TARGET_DATA,
            borderColor: "#5DCAA5",
            borderWidth: 1.5,
            borderDash: [5, 5],
            pointRadius: 0,
            tension: 0.4,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { color: "#888", font: { size: 11 } },
          },
          y: {
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: {
              color: "#888",
              font: { size: 11 },
              callback: (v) => "$" + (v / 1000).toFixed(0) + "k",
            },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-medium" style={{ fontSize: 14 }}>Revenue Over Time</span>
          <span className="text-muted" style={{ fontSize: 12 }}>Mar – Apr 2026</span>
        </div>
        <div className="d-flex gap-3 mb-3">
          {[["#3266ad","Revenue"],["#5DCAA5","Target"]].map(([c,l]) => (
            <span key={l} className="d-flex align-items-center gap-1" style={{ fontSize: 12, color: "#888" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />
              {l}
            </span>
          ))}
        </div>
        <div style={{ position: "relative", height: 220 }}>
          <canvas ref={ref} />
        </div>
      </div>
    </div>
  );
}

function DeviceChart() {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Desktop", "Mobile", "Tablet"],
        datasets: [{
          data: [52, 33, 15],
          backgroundColor: ["#3266ad", "#5DCAA5", "#EF9F27"],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => " " + ctx.label + ": " + ctx.parsed + "%" } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  const legendItems = [
    ["#3266ad", "Desktop", "52%"],
    ["#5DCAA5", "Mobile",  "33%"],
    ["#EF9F27", "Tablet",  "15%"],
  ];

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12 }}>
      <div className="card-body p-3">
        <div className="fw-medium mb-3" style={{ fontSize: 14 }}>Sessions by Device</div>
        <div style={{ position: "relative", height: 170 }}>
          <canvas ref={ref} />
        </div>
        <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
          {legendItems.map(([c, l, p]) => (
            <span key={l} className="d-flex align-items-center gap-1" style={{ fontSize: 12, color: "#888" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />
              {l} <strong style={{ color: "#333" }}>{p}</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserChart() {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: WEEK_LABELS,
        datasets: [
          {
            label: "New",
            data: NEW_USERS,
            backgroundColor: "#5DCAA5",
            borderRadius: 4,
            barPercentage: 0.6,
          },
          {
            label: "Returning",
            data: RET_USERS,
            backgroundColor: "#3266ad",
            borderRadius: 4,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { stacked: true, grid: { display: false }, ticks: { color: "#888", font: { size: 11 } } },
          y: {
            stacked: true,
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { color: "#888", font: { size: 11 }, callback: (v) => (v / 1000).toFixed(0) + "k" },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12 }}>
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-medium" style={{ fontSize: 14 }}>Weekly Active Users</span>
          <span className="text-muted" style={{ fontSize: 12 }}>Last 6 weeks</span>
        </div>
        <div className="d-flex gap-3 mb-2">
          {[["#5DCAA5","New"],["#3266ad","Returning"]].map(([c,l]) => (
            <span key={l} className="d-flex align-items-center gap-1" style={{ fontSize: 12, color: "#888" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />
              {l}
            </span>
          ))}
        </div>
        <div style={{ position: "relative", height: 170 }}>
          <canvas ref={ref} />
        </div>
      </div>
    </div>
  );
}

function ChannelsCard() {
  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12 }}>
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-medium" style={{ fontSize: 14 }}>Top Channels</span>
          <span className="badge bg-primary bg-opacity-10 text-primary" style={{ fontSize: 11 }}>by sessions</span>
        </div>
        <div className="d-flex flex-column gap-3">
          {CHANNELS.map(({ name, pct, color }) => (
            <div key={name}>
              <div className="d-flex justify-content-between mb-1" style={{ fontSize: 13 }}>
                <span style={{ color: "#333" }}>{name}</span>
                <span className="text-muted">{pct}%</span>
              </div>
              <div className="progress" style={{ height: 5, borderRadius: 4 }}>
                <div
                  className="progress-bar"
                  style={{ width: `${pct}%`, background: color, borderRadius: 4 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Date range filter ────────────────────────────────────────────────────────

const RANGES = ["Last 7 days", "Last 30 days", "Last 90 days", "Custom"];

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const [activeRange, setActiveRange] = useState("Last 30 days");
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      {/* Bootstrap CDN — include once in your index.html instead */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />

      <div style={{ minHeight: "100vh", background: "#f8f9fb", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Navbar ── */}
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4 py-2">
          <span className="navbar-brand fw-semibold" style={{ color: "#1a1a2e", fontSize: 17 }}>
            ◈ Analytica
          </span>
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`}>
            <ul className="navbar-nav me-auto ms-4 gap-1">
              {["Overview", "Reports", "Audiences", "Settings"].map((item) => (
                <li key={item} className="nav-item">
                  <a
                    href="#"
                    className={`nav-link px-3 py-1 rounded-pill ${item === "Overview" ? "bg-primary text-white" : "text-muted"}`}
                    style={{ fontSize: 13 }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
              <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" style={{ fontSize: 12 }}>
                Export CSV
              </button>
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
                style={{ width: 32, height: 32, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                AK
              </div>
            </div>
          </div>
        </nav>

        {/* ── Page Body ── */}
        <div className="container-fluid px-4 py-4" style={{ maxWidth: 1280 }}>

          {/* Header row */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <div>
              <h1 className="fw-semibold mb-1" style={{ fontSize: 22, color: "#1a1a2e" }}>Overview</h1>
              <p className="text-muted mb-0" style={{ fontSize: 13 }}>Welcome back — here's what's happening.</p>
            </div>

            {/* Date range pills */}
            <div className="d-flex gap-2 flex-wrap">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`btn btn-sm rounded-pill ${activeRange === r ? "btn-primary" : "btn-outline-secondary"}`}
                  style={{ fontSize: 12, padding: "4px 14px" }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Alert banner */}
          <div className="alert alert-info d-flex align-items-center gap-2 py-2 px-3 mb-4 border-0" style={{ borderRadius: 10, fontSize: 13 }}>
            <span>ℹ️</span>
            <span>
              Revenue is up <strong>12.4%</strong> this month — you're on track to hit your quarterly target.
            </span>
            <button type="button" className="btn-close ms-auto" style={{ fontSize: 11 }} />
          </div>

          {/* KPI Cards */}
          <div className="row g-3 mb-4">
            {KPI_DATA.map((k) => <KpiCard key={k.label} {...k} />)}
          </div>

          {/* Main charts */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-8">
              <RevenueChart />
            </div>
            <div className="col-12 col-lg-4">
              <DeviceChart />
            </div>
          </div>

          {/* Bottom charts */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <UserChart />
            </div>
            <div className="col-12 col-md-6">
              <ChannelsCard />
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-muted mt-2" style={{ fontSize: 12 }}>
            Data refreshed Apr 1, 2026 · Analytica v2.0
          </p>
        </div>
      </div>
    </>
  );
}
