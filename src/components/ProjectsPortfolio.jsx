/*
HOW TO USE / EDIT
- This single React component renders your Projects page with 5 sections (All, Robotics & Automation, Perception, AI & ML, Embedded Systems).
- To add or edit projects, just modify the `projectsData` array below—no other changes needed.
- Each project supports: title, org, year, tags, category, bullets (3–4 lines), links (array of {label, href}).
- Categories allowed: "Robotics & Automation", "Perception", "AI & ML", "Embedded Systems".
- Placeholders have been added in each category—copy/paste one to add more.
- If you’d prefer storing data externally, move `projectsData` into a `projects.json` file and fetch it in a useEffect. For now, keeping it inline makes edits fastest.

INTEGRATION
- Exported as default <ProjectsPortfolio/>. Import and render inside your router/page.
- Uses Tailwind for styling and framer-motion for soft animations.
- Optional: shadcn/ui Button component can replace <button> if your stack already has it.
*/

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Link as LinkIcon, Tag } from "lucide-react";

const CATEGORIES = [
  "All",
  "Robotics & Automation",
  "Perception",
  "AI & ML",
  "Embedded Systems",
];

// === EASY-EDIT DATA SOURCE ===
const projectsData = [
  // === ROBOTICS & AUTOMATION ===
  {
    title: "Automatic Storage & Retrieval System (ASRS)",
    org: "KLE Tech / Beckhoff TwinCAT",
    year: "2021–2022",
    category: "Robotics & Automation",
    tags: ["Beckhoff", "TwinCAT", "OPC UA", "Digital Twin"],
    bullets: [
      "Built an industrial-scale ASRS with Beckhoff PLCs and VFD motors in TwinCAT.",
      "Created a MATLAB digital twin via OPC UA to optimize retrieval times.",
      "Integrated browser-based HMI for live control/monitoring; reduced simulated latency by ~30%.",
    ],
    links: [
      { label: "GitHub Profile", href: "https://github.com/Prathyush-9" }
    ],
  },
  {
    title: "3‑DOF SCARA Manipulator (300g payload)",
    org: "KLE Tech / ROS & Gazebo",
    year: "2021",
    category: "Robotics & Automation",
    tags: ["SCARA", "ROS", "Gazebo", "Kinematics"],
    bullets: [
      "Designed & simulated a pick‑and‑place arm in ROS/Gazebo with suction end‑effector.",
      "Prototyped the physical arm achieving reliable 300g handling and precise motion control.",
      "Performed FEA in SolidWorks to verify strength/durability; documented IP protection checks.",
    ],
    links: [
      { label: "GitHub Profile", href: "https://github.com/Prathyush-9" }
    ],
  },
  {
    title: "Hexapod Robot – Bio‑inspired Gaits",
    org: "University of Delaware",
    year: "2024",
    category: "Robotics & Automation",
    tags: ["Hexapod", "MATLAB", "Gait Planning", "Arduino"],
    bullets: [
      "Developed tripod and rotational gait algorithms; simulated servo angles in MATLAB.",
      "Integrated 18 servos on Arduino Mega; validated smooth walking and precise on‑spot rotation.",
      "Reduced drift/lag via timing synchronization and control refinements.",
    ],
    links: [],
  },
  {
    title: "Microrobotics – Magnetic Control",
    org: "UD Microrobotics Lab",
    year: "2024",
    category: "Robotics & Automation",
    tags: ["Python", "Helmholtz Coils", "Magnetic Control"],
    bullets: [
      "Implemented Python control to actuate microrobots with a 3D Helmholtz coil system.",
      "Built SolidWorks fixtures and maintained incubation environment for repeatable trials.",
      "Logged experiments and protocols for traceability and contamination control.",
    ],
    links: [],
  },

  // === PERCEPTION ===
  {
    title: "AMR with LiDAR & ROS Navigation",
    org: "Difacto Technologies",
    year: "2022",
    category: "Perception",
    tags: ["AMR", "LiDAR", "SLAM", "ROS"],
    bullets: [
      "Built ROS pipeline for localization/mapping with LiDAR SLAM.",
      "Fused LiDAR + odometry for obstacle avoidance and path planning.",
      "Validated navigation robustness across dynamic aisle layouts.",
    ],
    links: [],
  },
  {
    title: "AGV – Magnetic Tape Guidance",
    org: "Difacto Technologies",
    year: "2022",
    category: "Perception",
    tags: ["AGV", "PID", "Sensors"],
    bullets: [
      "Implemented PID tuning for robust tape‑based tracking under load changes.",
      "Integrated sensors for obstacle detection and feedback control.",
      "Analyzed logs to minimize lateral error and improve stability.",
    ],
    links: [],
  },
  {
    title: "Quality Control of Rexroth Beams",
    org: "Industry Project",
    year: "2021–2022",
    category: "Perception",
    tags: ["OpenCV", "Deep Learning", "Inspection"],
    bullets: [
      "Built automated inspection for detection, dimension checks, and fracture identification.",
      "Designed mechanical rig; fabricated parts via CNC & 3D printing.",
      "Reduced manual inspection dependency; improved measurement consistency.",
    ],
    links: [],
  },
  {
    title: "Lens Localization & Pick‑Place (DOBOT)",
    org: "Asemtica Robotics",
    year: "2019",
    category: "Perception",
    tags: ["OpenCV", "6‑DOF", "Calibration"],
    bullets: [
      "Localized lenses (pose/position) and mapped camera to robot coordinates.",
      "Automated pick‑place on a 6‑DOF DOBOT using calibrated transforms.",
      "Closed the loop from perception to reliable manipulation.",
    ],
    links: [],
  },

  // === AI & ML ===
  {
    title: "Energy Consumption Forecasting (LSTM)",
    org: "UD Coursework",
    year: "2024",
    category: "AI & ML",
    tags: ["LSTM", "Time Series", "XGBoost"],
    bullets: [
      "Built models (LR, DT, RF, XGBoost, LSTM) on 19k+ time‑series samples.",
      "Achieved SOTA in class: R² ≈ 0.955, RMSE ≈ 0.037 after tuning & CV.",
      "Identified temperature/humidity/time as key features for demand.",
    ],
    links: [
      { label: "GitHub Profile", href: "https://github.com/Prathyush-9" }
    ],
  },
  {
    title: "Water Potability Classification",
    org: "UD Coursework",
    year: "2024",
    category: "AI & ML",
    tags: ["Classification", "Random Forest", "GUI"],
    bullets: [
      "Pipeline with imputation, outlier handling, scaling, and class balancing.",
      "Benchmarked LR, SVM, RF, XGBoost, NN; RF reached ~68% accuracy.",
      "Built a Tkinter GUI for real‑time prediction with feature importance.",
    ],
    links: [],
  },
  {
    title: "Symptom‑to‑Disease Identification",
    org: "Personal",
    year: "2023",
    category: "AI & ML",
    tags: ["Healthcare AI", "Decision Trees"],
    bullets: [
      "Prototyped interpretable models mapping symptoms to conditions.",
      "Focused on calibration and threshold selection for safer usage.",
      "Outlined risk mitigations for false positives/negatives.",
    ],
    links: [],
  },
  {
    title: "CV Toolkit: Lane / Pose / Tracking + Pick Mapping",
    org: "Asemtica / Personal",
    year: "2019–2023",
    category: "AI & ML",
    tags: ["OpenCV", "ROS", "Object Tracking"],
    bullets: [
      "Implemented lane detection, pose estimation, object tracking pipelines.",
      "Mapped image coordinates to robot frames for pick‑place tasks.",
      "Integrated real‑time vision nodes within ROS.",
    ],
    links: [],
  },

  // === EMBEDDED SYSTEMS ===
  {
    title: "Bot‑to‑Bot Mesh Communication",
    org: "Jaia Robotics",
    year: "2024–2025",
    category: "Embedded Systems",
    tags: ["Goby3", "XBee", "Mesh Networking"],
    bullets: [
      "Designed a mesh‑style comms system supporting broadcast and P2P for ASVs.",
      "Configured XBee radios on embedded platforms for reliable packet exchange.",
      "Delivered PoC enabling swarm cooperation in navigation/decision‑making.",
    ],
    links: [],
  },
  {
    title: "Custom PCB for Signal Identification",
    org: "Lab Project",
    year: "2022",
    category: "Embedded Systems",
    tags: ["PCB", "Signal Processing", "Oscilloscope"],
    bullets: [
      "Fabricated PCB for signal conditioning/recognition with oscilloscope validation.",
      "Integrated with motor control stack for deterministic actuation.",
      "Improved noise immunity through layout and filtering tweaks.",
    ],
    links: [],
  },
  {
    title: "Schmitt Trigger Circuit",
    org: "Lab Project",
    year: "2022",
    category: "Embedded Systems",
    tags: ["Analog", "Hysteresis", "Noise Immunity"],
    bullets: [
      "Built and characterized Schmitt trigger for clean digital transitions.",
      "Boosted reliability of sensor reads under electrical noise.",
      "Documented thresholds/timing for reuse in robotics I/O.",
    ],
    links: [],
  },
  {
    title: "Fire‑Fighting Robot (with Ladder)",
    org: "Competition/Personal",
    year: "2021",
    category: "Embedded Systems",
    tags: ["Sensors", "Actuators", "Mechanisms"],
    bullets: [
      "Detected flame sources and actuated extinguisher; designed access mechanism.",
      "Closed‑loop approach control; validated in obstacle scenarios.",
      "Demonstrated reliable suppression in bench tests.",
    ],
    links: [],
  },
  {
    title: "Fastest Line Follower",
    org: "Competition/Personal",
    year: "2021",
    category: "Embedded Systems",
    tags: ["PID", "IR Sensors", "uC"],
    bullets: [
      "High‑speed PID control with tuned sampling and actuation loops.",
      "Consistent lap times across varied tracks; robust cornering.",
      "Optimized ISR design for timing determinism.",
    ],
    links: [],
  },

  // === PLACEHOLDERS ===
  {
    title: "[New Project]",
    org: "",
    year: "2025",
    category: "Robotics & Automation",
    tags: ["tag1", "tag2"],
    bullets: [
      "Impact (metric or outcome).",
      "Key tools/algorithms.",
      "Validation approach.",
    ],
    links: [],
  },
  {
    title: "[New Project]",
    org: "",
    year: "2025",
    category: "Perception",
    tags: ["tag1", "tag2"],
    bullets: [
      "Impact (metric or outcome).",
      "Key tools/algorithms.",
      "Validation approach.",
    ],
    links: [],
  },
  {
    title: "[New Project]",
    org: "",
    year: "2025",
    category: "AI & ML",
    tags: ["tag1", "tag2"],
    bullets: [
      "Impact (metric or outcome).",
      "Key tools/algorithms.",
      "Validation approach.",
    ],
    links: [],
  },
  {
    title: "[New Project]",
    org: "",
    year: "2025",
    category: "Embedded Systems",
    tags: ["tag1", "tag2"],
    bullets: [
      "Impact (metric or outcome).",
      "Key tools/algorithms.",
      "Validation approach.",
    ],
    links: [],
  },
];

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-2xl border px-3 py-1 text-xs">
      <Tag className="h-3 w-3" /> {children}
    </span>
  );
}

function ProjectCard({ p }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="text-sm text-gray-500">{p.org} • {p.year}</p>
        </div>
        <div className="flex gap-2">
          {p.links?.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-gray-50"
            >
              <LinkIcon className="h-3 w-3" /> {l.label}
            </a>
          ))}
        </div>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        {p.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tags.map((t, i) => (
          <Pill key={i}>{t}</Pill>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPortfolio() {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return projectsData.filter((p) => {
      const matchCategory = active === "All" || p.category === active;
      const hay = [p.title, p.org, p.category, ...(p.tags || []), ...(p.bullets || [])]
        .join(" ")
        .toLowerCase();
      const matchQuery = hay.includes(q.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [active, q]);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-sm text-gray-600">Filter by category or search. Edit the data at the top to add new projects.</p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-2xl border px-3 py-1 text-sm ${
              active === c ? "bg-gray-900 text-white" : "hover:bg-gray-50"
            }`}
          >
            {c}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 rounded-2xl border px-3 py-1">
          <Filter className="h-4 w-4" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, tags, tech…"
            className="w-48 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((p, i) => (
            <ProjectCard key={`${p.title}-${i}`} p={p} />
          ))}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="rounded-2xl border p-8 text-center text-sm text-gray-500">
          No results. Try another category or clear the search.
        </div>
      )}

      <div className="mt-8 text-xs text-gray-500">
        Tip: To add a project, duplicate any object in <code>projectsData</code> and update the fields. Keep 3–4 bullets focused on impact and tools.
      </div>
    </div>
  );
}
