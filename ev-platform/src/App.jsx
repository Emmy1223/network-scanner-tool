import { useState } from "react";

const roles = [
  {
    id: "frontend",
    title: "Frontend Developer",
    color: "#00E5FF",
    icon: "⬡",
    tools: [
      { name: "React + Vite", purpose: "UI framework & dev server" },
      { name: "Tailwind CSS", purpose: "Utility-first styling" },
      { name: "Mapbox GL JS", purpose: "Interactive map with charging pins" },
      { name: "Recharts", purpose: "Analytics charts & graphs" },
      { name: "Axios", purpose: "HTTP requests to backend" },
      { name: "React Query", purpose: "Data fetching & caching" },
      { name: "Framer Motion", purpose: "UI animations" },
      { name: "Vercel", purpose: "Frontend deployment" },
    ],
    steps: [
      {
        phase: "Setup",
        tasks: [
          "Run `npm create vite@latest ev-platform -- --template react` to scaffold the project",
          "Install dependencies: `npm install tailwindcss mapbox-gl recharts axios @tanstack/react-query framer-motion`",
          "Configure Tailwind with `npx tailwindcss init -p` and update tailwind.config.js",
          "Create `.env` file with VITE_MAPBOX_TOKEN and VITE_API_BASE_URL",
        ],
      },
      {
        phase: "Map View",
        tasks: [
          "Initialise Mapbox map centered on Lagos (6.5244° N, 3.3792° E) with a dark basemap style",
          "Fetch charging station list from backend `/api/stations` on mount using React Query",
          "Render each station as a custom marker — green (available), amber (busy), red (offline)",
          "On marker click, show a popup card: station name, operator, slots available, wait time, connector types",
          "Add a search bar that geocodes an address and flies the map to that location",
        ],
      },
      {
        phase: "Driver Dashboard",
        tasks: [
          "Build a sidebar panel listing stations sorted by distance from the user's GPS coordinates",
          "Add filter controls: connector type (AC/DC/CCS), operator, availability status",
          "Show estimated wait time with a visual indicator (badge or mini progress bar)",
          "Build a 'Navigate' button that opens Google Maps / Apple Maps with the station as destination",
          "Add a simple battery-level input slider — system filters stations by minimum charge speed needed",
        ],
      },
      {
        phase: "Analytics Dashboard",
        tasks: [
          "Create a separate `/analytics` route for operators and investors",
          "Build a utilisation bar chart: sessions per station per day (last 7 days) using Recharts",
          "Build a demand heatmap overlay on the map using Mapbox heatmap layer from session data",
          "Add a KPI row: total sessions today, avg wait time, busiest station, revenue estimate",
          "Create a line chart showing hourly demand trends across the network",
        ],
      },
      {
        phase: "Deploy",
        tasks: [
          "Push repo to GitHub and connect to Vercel",
          "Add environment variables in Vercel project settings",
          "Run `vercel --prod` or trigger auto-deploy from GitHub push",
          "Test all map features on mobile — ensure touch gestures work on Mapbox",
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend / API Developer",
    color: "#B2FF59",
    icon: "◈",
    tools: [
      { name: "Node.js + Express", purpose: "REST API server" },
      { name: "PostgreSQL", purpose: "Primary database (stations, sessions)" },
      { name: "Prisma ORM", purpose: "Database schema & queries" },
      { name: "Redis", purpose: "Cache real-time availability data" },
      { name: "Socket.io", purpose: "Push live station status updates" },
      { name: "JWT", purpose: "Auth for operator accounts" },
      { name: "Faker.js", purpose: "Generate mock station & session data" },
      { name: "Railway / Render", purpose: "Backend hosting" },
    ],
    steps: [
      {
        phase: "Setup",
        tasks: [
          "Initialise project: `npm init -y` then install `express prisma @prisma/client redis socket.io jsonwebtoken cors`",
          "Run `npx prisma init` to create the Prisma schema file",
          "Define models: Station (id, name, lat, lng, operator, slots, connectorTypes), Session (id, stationId, startTime, endTime, energyKwh), User",
          "Run `npx prisma migrate dev --name init` to create the PostgreSQL tables",
          "Connect to a free PostgreSQL instance on Railway or Supabase — paste connection string in `.env`",
        ],
      },
      {
        phase: "Mock Data",
        tasks: [
          "Write a seed script using Faker.js to generate 50 stations spread across Lagos, Abuja, and Port Harcourt",
          "For each station, generate 200–500 historical session records with realistic timestamps and energy values",
          "Add a `status` field that randomly cycles between 'available', 'busy', and 'offline' on a cron every 2 minutes",
          "Run `node seed.js` to populate the database before the demo",
        ],
      },
      {
        phase: "API Routes",
        tasks: [
          "GET `/api/stations` — return all stations with current status and slot availability",
          "GET `/api/stations/:id` — return single station detail + last 10 sessions",
          "GET `/api/analytics/demand` — return hourly session counts grouped by station for charting",
          "GET `/api/analytics/heatmap` — return lat/lng + weight data for the Mapbox heatmap layer",
          "POST `/api/sessions` — log a new charging session (used by the operator panel)",
          "Add Redis caching on `/api/stations` with a 30-second TTL to simulate near-real-time data",
        ],
      },
      {
        phase: "Real-time",
        tasks: [
          "Set up Socket.io on the Express server",
          "Every 2 minutes, randomly update 3–5 station statuses in the DB and emit a `station:update` event",
          "Frontend listens for `station:update` and refreshes the affected map markers without a full reload",
          "This makes the demo feel live and dynamic during the presentation",
        ],
      },
      {
        phase: "Deploy",
        tasks: [
          "Push to GitHub and connect repository to Railway or Render",
          "Set environment variables: DATABASE_URL, REDIS_URL, JWT_SECRET, PORT",
          "Enable auto-deploy on push to main branch",
          "Test all endpoints with Postman or Thunder Client before frontend integration",
        ],
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud / Infrastructure Engineer",
    color: "#FF6D00",
    icon: "⬢",
    tools: [
      { name: "AWS / GCP Console", purpose: "Cloud provider dashboard" },
      { name: "AWS S3 / GCS", purpose: "Store exported analytics reports" },
      { name: "AWS Lambda / Cloud Functions", purpose: "Serverless demand forecasting job" },
      { name: "Amazon RDS / Cloud SQL", purpose: "Managed PostgreSQL alternative" },
      { name: "CloudWatch / Cloud Monitoring", purpose: "Logs, alerts, uptime checks" },
      { name: "Terraform (optional)", purpose: "Infrastructure as code" },
      { name: "GitHub Actions", purpose: "CI/CD pipelines" },
      { name: "Postman / curl", purpose: "API integration testing" },
    ],
    steps: [
      {
        phase: "Architecture Design",
        tasks: [
          "Draw a simple architecture diagram: Frontend (Vercel) → API (Railway/Render) → DB (Supabase/RDS) → Cache (Redis) → Lambda (AI forecast)",
          "Decide which cloud provider to use — AWS is recommended given hackathon familiarity and free tier",
          "Create an AWS account or use an existing one — enable Free Tier alerts to avoid surprise charges",
          "Create an IAM user with least-privilege permissions for the team (avoid using root credentials)",
        ],
      },
      {
        phase: "Storage & Database",
        tasks: [
          "Create an S3 bucket called `ev-platform-reports` for storing CSV/PDF analytics exports",
          "Set bucket policy to private — generate pre-signed URLs from the backend when a download is requested",
          "Optionally provision RDS PostgreSQL (db.t3.micro free tier) as the production database instead of Railway",
          "Enable automated backups (7-day retention) on the RDS instance",
        ],
      },
      {
        phase: "Serverless Forecast Job",
        tasks: [
          "Create a Lambda function (Node.js 20.x runtime) called `demand-forecaster`",
          "Function queries the sessions table, groups by hour-of-day and station, and returns peak demand predictions",
          "Expose the function via API Gateway as GET `/forecast?stationId=xxx`",
          "Set a CloudWatch Events rule to run the forecast job every hour and cache results in Redis",
          "This is your AI/ML talking point — even simple statistical forecasting counts as AI for a hackathon",
        ],
      },
      {
        phase: "CI/CD Pipeline",
        tasks: [
          "Create `.github/workflows/deploy.yml` with two jobs: `test` and `deploy`",
          "Test job: install deps, run `npm test`, run a linter",
          "Deploy job: on push to `main`, trigger Vercel deploy (frontend) and Railway redeploy (backend) via webhook",
          "Add a GitHub Actions secret for each service's deploy hook URL",
          "Show the green CI badge in the GitHub README — judges notice this",
        ],
      },
      {
        phase: "Monitoring",
        tasks: [
          "Set up a CloudWatch dashboard with: API response time, Lambda invocation count, DB connection count",
          "Create an alert if API error rate exceeds 5% — send to a team Slack or email",
          "Use UptimeRobot (free) to monitor the frontend and backend URLs every 5 minutes",
          "Screenshot the monitoring dashboard — include it in your presentation as proof of production-readiness",
        ],
      },
    ],
  },
  {
    id: "ai",
    title: "AI / Data Analyst",
    color: "#E040FB",
    icon: "◉",
    tools: [
      { name: "Python 3.11+", purpose: "Core language for all data work" },
      { name: "Pandas + NumPy", purpose: "Data manipulation & aggregation" },
      { name: "Scikit-learn", purpose: "Demand forecasting model (Random Forest)" },
      { name: "Prophet (Meta)", purpose: "Time-series demand prediction" },
      { name: "Matplotlib / Seaborn", purpose: "EDA charts and validation plots" },
      { name: "FastAPI", purpose: "Serve the ML model as a REST endpoint" },
      { name: "Jupyter Notebook", purpose: "Model development & prototyping" },
      { name: "Google Colab", purpose: "Free GPU/cloud notebook environment" },
    ],
    steps: [
      {
        phase: "Data Prep",
        tasks: [
          "Export the mock session data from PostgreSQL as a CSV: `psql -c '\\COPY sessions TO sessions.csv CSV HEADER'`",
          "Load into Pandas: `df = pd.read_csv('sessions.csv')` and inspect with `df.head()`, `df.dtypes`, `df.isnull().sum()`",
          "Engineer features: hour_of_day, day_of_week, is_weekend, station_zone (Lagos Island, Mainland, etc.)",
          "Aggregate to hourly demand: `df.groupby(['station_id','hour_of_day']).size().reset_index(name='sessions')`",
        ],
      },
      {
        phase: "Forecasting Model",
        tasks: [
          "Train a Prophet model: `from prophet import Prophet; m = Prophet(); m.fit(df[['ds','y']])`",
          "Generate 7-day forecast: `future = m.make_future_dataframe(periods=168, freq='H'); forecast = m.predict(future)`",
          "Plot results with `m.plot(forecast)` and validate against held-out test data",
          "Also train a simple Random Forest classifier to predict 'will this station be busy in the next hour?' (binary classification)",
          "Evaluate with accuracy, precision, recall — include these metrics on a slide",
        ],
      },
      {
        phase: "Demand Gap Analysis",
        tasks: [
          "For each zone (group stations by lat/lng clusters using KMeans), calculate: avg sessions per station",
          "Flag zones where demand-per-station is > 1.5x the network average — these are 'underserved areas'",
          "Export these as GeoJSON points that the frontend will render as a 'demand gap' layer on the map",
          "This directly answers the policymaker question: 'where should we build next?'",
        ],
      },
      {
        phase: "API Deployment",
        tasks: [
          "Wrap the trained model in a FastAPI endpoint: POST `/predict` accepts `{station_id, hours_ahead}`, returns `{predicted_sessions, confidence}`",
          "Save the trained model with `joblib.dump(model, 'model.pkl')` and load it at FastAPI startup",
          "Deploy to Railway or Hugging Face Spaces (free) — get a public URL",
          "Backend calls this endpoint to populate the forecast chart in the analytics dashboard",
        ],
      },
      {
        phase: "Presentation Prep",
        tasks: [
          "Create 3 Jupyter notebook cells that tell a story: raw data → model training → forecast output",
          "Export key charts as PNGs for the slide deck",
          "Prepare a one-liner explanation of the model: 'We trained a time-series model on charging session history to predict demand 24 hours ahead with X% accuracy'",
          "Run a live demo in the notebook during the presentation if time allows — judges respond well to this",
        ],
      },
    ],
  },
];

const phaseColors = ["#00E5FF22", "#B2FF5922", "#FF6D0022", "#E040FB22", "#FFD60022"];
const phaseBorders = ["#00E5FF", "#B2FF59", "#FF6D00", "#E040FB", "#FFD600"];

export default function App() {
  const [activeRole, setActiveRole] = useState("frontend");
  const [expandedPhase, setExpandedPhase] = useState(null);

  const role = roles.find((r) => r.id === activeRole);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080C10",
        fontFamily: "'DM Mono', 'Courier New', monospace",
        color: "#E8EDF2",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #1A2535",
          padding: "24px 32px",
          background: "linear-gradient(180deg, #0D1520 0%, #080C10 100%)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            background: "#00E5FF",
            borderRadius: "50%",
            boxShadow: "0 0 12px #00E5FF",
          }}
        />
        <div>
          <div
            style={{
              fontSize: 11,
              color: "#4A6080",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            One-with-AI Hackathon · Problem Statement 01
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#E8EDF2",
              letterSpacing: "-0.02em",
            }}
          >
            Nigeria EV Charging Intelligence Platform
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: "#2A4060",
            letterSpacing: "0.1em",
          }}
        >
          TEAM BLUEPRINT v1.0
        </div>
      </div>

      {/* Role Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #1A2535",
          overflowX: "auto",
          background: "#080C10",
        }}
      >
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setActiveRole(r.id);
              setExpandedPhase(null);
            }}
            style={{
              padding: "14px 24px",
              background: activeRole === r.id ? "#0D1520" : "transparent",
              border: "none",
              borderBottom:
                activeRole === r.id
                  ? `2px solid ${r.color}`
                  : "2px solid transparent",
              color: activeRole === r.id ? r.color : "#4A6080",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>{r.icon}</span>
            {r.title}
          </button>
        ))}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 960, margin: "0 auto" }}>
        {/* Tools Section */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              fontSize: 10,
              color: "#4A6080",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            ▸ Required Tools & Stack
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 10,
            }}
          >
            {role.tools.map((tool, i) => (
              <div
                key={i}
                style={{
                  background: "#0D1520",
                  border: `1px solid #1A2535`,
                  borderLeft: `3px solid ${role.color}`,
                  borderRadius: 6,
                  padding: "12px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: role.color,
                    fontWeight: 600,
                    marginBottom: 3,
                  }}
                >
                  {tool.name}
                </div>
                <div style={{ fontSize: 11, color: "#4A6080", lineHeight: 1.4 }}>
                  {tool.purpose}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Section */}
        <div>
          <div
            style={{
              fontSize: 10,
              color: "#4A6080",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            ▸ Step-by-Step Execution
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {role.steps.map((step, i) => {
              const isOpen = expandedPhase === i;
              return (
                <div
                  key={i}
                  style={{
                    background: isOpen
                      ? phaseColors[i % phaseColors.length]
                      : "#0D1520",
                    border: `1px solid ${
                      isOpen ? phaseBorders[i % phaseBorders.length] + "60" : "#1A2535"
                    }`,
                    borderRadius: 8,
                    overflow: "hidden",
                    transition: "all 0.2s",
                  }}
                >
                  <button
                    onClick={() => setExpandedPhase(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background:
                          phaseBorders[i % phaseBorders.length] + "20",
                        border: `1px solid ${phaseBorders[i % phaseBorders.length]}60`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: phaseBorders[i % phaseBorders.length],
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: isOpen
                            ? phaseBorders[i % phaseBorders.length]
                            : "#C8D8E8",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        Phase {i + 1}: {step.phase}
                      </span>
                      <span style={{ fontSize: 11, color: "#2A4060", marginLeft: 12 }}>
                        {step.tasks.length} tasks
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#2A4060",
                        fontSize: 14,
                        transition: "transform 0.2s",
                        transform: isOpen ? "rotate(90deg)" : "none",
                      }}
                    >
                      ▶
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 18px 18px 18px" }}>
                      <div
                        style={{
                          borderLeft: `2px solid ${phaseBorders[i % phaseBorders.length]}30`,
                          paddingLeft: 16,
                        }}
                      >
                        {step.tasks.map((task, j) => (
                          <div
                            key={j}
                            style={{
                              display: "flex",
                              gap: 12,
                              padding: "10px 0",
                              borderBottom:
                                j < step.tasks.length - 1
                                  ? "1px solid #1A253520"
                                  : "none",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 10,
                                color: phaseBorders[i % phaseBorders.length],
                                marginTop: 2,
                                flexShrink: 0,
                                letterSpacing: "0.05em",
                              }}
                            >
                              {String(j + 1).padStart(2, "0")}.{""}
                            </div>
                            <div style={{ fontSize: 13, color: "#8AA8C8", lineHeight: 1.6 }}>
                              {task.includes("`")
                                ? task
                                    .split(/(`[^`]+`)/)
                                    .map((part, k) =>
                                      part.startsWith("`") && part.endsWith("`") ? (
                                        <code
                                          key={k}
                                          style={{
                                            background: "#1A2535",
                                            color:
                                              phaseBorders[i % phaseBorders.length],
                                            padding: "1px 6px",
                                            borderRadius: 3,
                                            fontSize: 12,
                                            fontFamily: "inherit",
                                          }}
                                        >
                                          {part.slice(1, -1)}
                                        </code>
                                      ) : (
                                        part
                                      )
                                    )
                                : task}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: 36,
            padding: "14px 18px",
            background: "#0D1520",
            border: "1px solid #1A2535",
            borderRadius: 6,
            fontSize: 11,
            color: "#2A4060",
            lineHeight: 1.8,
          }}
        >
          <span style={{ color: "#00E5FF" }}>NOTE</span> — All four roles work in parallel
          from Day 1. Backend and Frontend sync via a shared Postman collection. Cloud
          engineer provisions infra on Day 1 so the team has live URLs by Day 2. AI
          analyst works in Colab independently and integrates the FastAPI endpoint on Day 2.
        </div>
      </div>
    </div>
  );
}

