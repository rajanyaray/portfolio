import { useState, useEffect } from "react";
import "./Skills.css";

const skills = [
  {
    name: "React",
    category: "frontend",
    description: "Building dynamic UI systems",
    projects: ["Portfolio", "Dashboard"],
    connections: ["JavaScript", "Node"],
    x: 20,
    y: 40,
  },
  {
    name: "Node",
    category: "backend",
    description: "Backend APIs & server logic",
    projects: ["API Server"],
    connections: ["React"],
    x: 60,
    y: 30,
  },
  {
    name: "MongoDB",
    category: "backend",
    description: "Database design",
    projects: ["Blog App"],
    connections: ["Node"],
    x: 75,
    y: 60,
  },
  {
    name: "Python",
    category: "ai",
    description: "AI/ML experimentation",
    projects: ["ML Model"],
    connections: [],
    x: 30,
    y: 70,
  },
  {
    name: "Git",
    category: "tools",
    description: "Version control",
    projects: ["All Projects"],
    connections: [],
    x: 50,
    y: 80,
  },
];

export default function Skills() {
  const [active, setActive] = useState(null);
  const [category, setCategory] = useState("all");
  const [hovered, setHovered] = useState(null);

  // tilt effect
  const handleMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    document.querySelector(".skills-grid").style.transform =
      `rotateX(${ -y }deg) rotateY(${ x }deg)`;
  };

  return (
    <section id="skills" onMouseMove={handleMove}>
      
      {/* CATEGORY FILTER */}
      <div className="category-bar">
        {["all", "frontend", "backend", "ai", "tools"].map((c) => (
          <button
            key={c}
            className={category === c ? "active" : ""}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="skills-grid">

        {/* CORE NODE */}
        <div className="core-node">
          RAJANYA.exe
        </div>

        {/* CONNECTION LINES */}
        <svg className="connections">
          {skills.map((s, i) =>
            s.connections.map((c, j) => {
              const target = skills.find((t) => t.name === c);
              if (!target) return null;
              return (
                <line
                  key={i + j}
                  x1={s.x + "%"}
                  y1={s.y + "%"}
                  x2={target.x + "%"}
                  y2={target.y + "%"}
                />
              );
            })
          )}
        </svg>

        {/* SKILL NODES */}
        {skills.map((skill, index) => {
          const faded =
            category !== "all" && skill.category !== category;

          return (
            <div
              key={index}
              className={`node ${skill.category} ${faded ? "fade" : ""}`}
              style={{
                top: skill.y + "%",
                left: skill.x + "%",
              }}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(skill)}
            >
              <div className="node-inner">
                {skill.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* POPUP PANEL */}
      {active && (
        <div className="panel" onClick={() => setActive(null)}>
          <div className="panel-content" onClick={(e) => e.stopPropagation()}>
            <h2>{active.name}</h2>
            <p>{active.description}</p>

            <h4>Projects</h4>
            <ul>
              {active.projects.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}