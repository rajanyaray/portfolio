import { useState, useEffect, useRef } from "react";
import "./About.css";
import profile from "../../assets/profile.png";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Live Clock (time.txt orange cloud style) ────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = time.getHours();
  const mins = String(time.getMinutes()).padStart(2, "0");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[time.getDay()];
  const dateStr = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  const timeStr = `${String(hours).padStart(2, "0")}:${mins}`;

  const greeting =
    hours >= 5 && hours < 12 ? "Good Morning!" :
    hours >= 12 && hours < 17 ? "Good Afternoon!" :
    hours >= 17 && hours < 21 ? "Good Evening!" :
    "Good Night!";

  const isDaytime = hours >= 5 && hours < 17;
  const isNightOrEvening = hours >= 17 || hours < 5;

  return (
    <div
      className={`card-time-cloud ${hovered ? "card-time-cloud--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rotating blobs */}
      <div className="card-time-cloud-back">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ed782a"
            d="M39.1,-11.5C46.9,11.5,47,38.1,34.9,46.6C22.8,55.1,-1.6,45.4,-16.5,32.3C-31.3,19.2,-36.8,2.8,-32.4,-15.3C-28.1,-33.4,-14.1,-53,0.8,-53.3C15.6,-53.5,31.2,-34.4,39.1,-11.5Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ed782a"
            d="M39.1,-11.5C46.9,11.5,47,38.1,34.9,46.6C22.8,55.1,-1.6,45.4,-16.5,32.3C-31.3,19.2,-36.8,2.8,-32.4,-15.3C-28.1,-33.4,-14.1,-53,0.8,-53.3C15.6,-53.5,31.2,-34.4,39.1,-11.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Grey expanding front panel */}
      <div className="card-time-cloud-front">
        <p className="ctc-greeting">{greeting}</p>
        <p className="ctc-location">📍 Kolkata, India</p>
      </div>

      {/* Day name */}
      <p className="card-time-cloud-day">{dayName}</p>
      {/* Date */}
      <p className="card-time-cloud-day-number">{dateStr}</p>
      {/* Time */}
      <p className="card-time-cloud-hour">{timeStr}</p>

      {/* Celestial icon — sun in morning/afternoon, moon in evening/night */}
      <div className={`card-time-cloud-icon ${isNightOrEvening ? "ctc-moon" : "ctc-sun"}`}>
        {isDaytime ? (
          /* Sun SVG */
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke="#ed782a" strokeWidth="1.44" />
            <path d="M12 2V3" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
            <path d="M12 21V22" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
            <path d="M22 12L21 12" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
            <path d="M3 12L2 12" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
            <path d="M19.0708 4.92969L18.678 5.32252" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
            <path d="M5.32178 5.32227L4.92894 4.92943" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
            <path d="M18.678 18.6777L19.0708 19.0706" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
            <path d="M4.92894 19.0706L5.32178 18.6777" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
          </svg>
        ) : (
          /* Moon SVG */
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              stroke="#ed782a"
              strokeWidth="1.44"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

// ── Weather Card (Kolkata real-time weather) ────────────────────────────────
function WeatherCard() {
  const [weather, setWeather] = useState({
    temp: "--°",
    desc: "Fetching...",
    humidity: "--% humidity"
  });

  useEffect(() => {
    // Open-Meteo API is free and doesn't require keys
    fetch("https://api.open-meteo.com/v1/forecast?latitude=22.5726&longitude=88.3639&current=temperature_2m,relative_humidity_2m,weather_code")
      .then(res => res.json())
      .then(data => {
        if (data && data.current) {
          const tempVal = Math.round(data.current.temperature_2m);
          const humidityVal = data.current.relative_humidity_2m;
          const code = data.current.weather_code;
          
          let descVal = "Partly Cloudy";
          if (code === 0) descVal = "Clear Sky";
          else if (code === 1 || code === 2 || code === 3) descVal = "Cloudy";
          else if (code >= 51 && code <= 55) descVal = "Light Drizzle";
          else if (code >= 61 && code <= 65) descVal = "Raining";
          else if (code >= 80 && code <= 82) descVal = "Rain Showers";
          else if (code >= 95) descVal = "Thunderstorm";

          setWeather({
            temp: `${tempVal}°`,
            desc: descVal,
            humidity: `${humidityVal}% humidity`
          });
        }
      })
      .catch(err => {
        console.error("Error fetching weather:", err);
        setWeather({
          temp: "31°",
          desc: "Cloudy",
          humidity: "62% humidity"
        });
      });
  }, []);

  return (
    <div className="weather-card">
      <h3 className="weather-card-title">Kolkata</h3>
      <div className="weather-card-body">
        <svg
          viewBox="0 0 64 64"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          className="weather-card-svg"
        >
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="28.33"
              y1="19.67"
              x2="21.5"
              x1="16.5"
              id="b"
            >
              <stop stopColor="#fbbf24" offset="0"></stop>
              <stop stopColor="#fbbf24" offset=".45"></stop>
              <stop stopColor="#f59e0b" offset="1"></stop>
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="50.8"
              y1="21.96"
              x2="39.2"
              x1="22.56"
              id="c"
            >
              <stop stopColor="#f3f7fe" offset="0"></stop>
              <stop stopColor="#f3f7fe" offset=".45"></stop>
              <stop stopColor="#deeafb" offset="1"></stop>
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="48.05"
              y1="42.95"
              x2="25.47"
              x1="22.53"
              id="a"
            >
              <stop stopColor="#4286ee" offset="0"></stop>
              <stop stopColor="#4286ee" offset=".45"></stop>
              <stop stopColor="#0950bc" offset="1"></stop>
            </linearGradient>
            <linearGradient
              xlinkHref="#a"
              y2="48.05"
              y1="42.95"
              x2="32.47"
              x1="29.53"
              id="d"
            ></linearGradient>
            <linearGradient
              xlinkHref="#a"
              y2="48.05"
              y1="42.95"
              x2="39.47"
              x1="36.53"
              id="e"
            ></linearGradient>
          </defs>
          <circle
            strokeWidth=".5"
            strokeMiterlimit="10"
            stroke="#f8af18"
            fill="url(#b)"
            r="5"
            cy="24"
            cx="19"
          ></circle>
          <path
            d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            stroke="#fbbf24"
            fill="none"
          >
            <animateTransform
              values="0 19 24; 360 19 24"
              type="rotate"
              repeatCount="indefinite"
              dur="45s"
              attributeName="transform"
            ></animateTransform>
          </path>
          <path
            d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"
            strokeWidth=".5"
            strokeMiterlimit="10"
            stroke="#e6effc"
            fill="url(#c)"
          ></path>
          <path
            d="M24.39 43.03l-.78 4.94"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            stroke="url(#a)"
            fill="none"
          >
            <animateTransform
              values="1 -5; -2 10"
              type="translate"
              repeatCount="indefinite"
              dur="0.7s"
              attributeName="transform"
            ></animateTransform>
          </path>
          <path
            d="M31.39 43.03l-.78 4.94"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            stroke="url(#d)"
            fill="none"
          >
            <animateTransform
              values="1 -5; -2 10"
              type="translate"
              repeatCount="indefinite"
              dur="0.7s"
              begin="-0.4s"
              attributeName="transform"
            ></animateTransform>
          </path>
          <path
            d="M38.39 43.03l-.78 4.94"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            stroke="url(#e)"
            fill="none"
          >
            <animateTransform
              values="1 -5; -2 10"
              type="translate"
              repeatCount="indefinite"
              dur="0.7s"
              begin="-0.2s"
              attributeName="transform"
            ></animateTransform>
          </path>
        </svg>
        <h4 className="weather-card-temp">{weather.temp}</h4>
      </div>
      <div className="weather-card-details">
        <p>Today</p>
        <p>{weather.desc}</p>
        <p>{weather.humidity}</p>
      </div>
    </div>
  );
}

// ── Stat Circle (arc 0° → 135°+ on scroll) ──────────────────────────────────
function StatCircle({ value, suffix, label, color, glyph, animate, delay }) {
  const count = useCounter(value, 1800, animate);
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  // 135deg out of 360deg = 37.5% of circumference
  const targetArc = circumference * (135 / 360);
  const dashOffset = animate ? circumference - targetArc : circumference;

  return (
    <div className="stat-circle-wrap" style={{ "--sc-color": color, animationDelay: `${delay}s` }}>
      <div className="stat-circle-outer">
        <svg className="stat-circle-svg" viewBox="0 0 100 100">
          {/* track */}
          <circle cx="50" cy="50" r="38" className="sc-track" />
          {/* animated arc: starts at 0, grows to 135deg */}
          <circle
            cx="50" cy="50" r="38"
            className="sc-fill"
            style={{
              stroke: color,
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              transition: `stroke-dashoffset 2s cubic-bezier(.4,0,.2,1) ${delay}s`,
            }}
          />
          {/* outer deco ring */}
          <circle cx="50" cy="50" r="46" className="sc-deco-ring" style={{ stroke: color }} />
        </svg>

        {/* Orbiting dot */}
        <div className="sc-orbit-dot" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />

        <div className="stat-circle-inner">
          <span className="sc-glyph">{glyph}</span>
          <span className="sc-num">{count}{suffix}</span>
        </div>
      </div>
      <span className="sc-label">{label}</span>
    </div>
  );
}

// ── About Box (compact) ─────────────────────────────────────────────────────
function AboutBox() {
  const [nameHovered, setNameHovered] = useState(false);
  const trackers = Array.from({ length: 9 });

  const tiltMap = [
    "rotateX(8deg) rotateY(-5deg)",
    "rotateX(8deg) rotateY(0deg)",
    "rotateX(8deg) rotateY(5deg)",
    "rotateX(0deg) rotateY(-5deg)",
    "rotateX(0deg) rotateY(0deg)",
    "rotateX(0deg) rotateY(5deg)",
    "rotateX(-8deg) rotateY(-5deg)",
    "rotateX(-8deg) rotateY(0deg)",
    "rotateX(-8deg) rotateY(5deg)",
  ];

  return (
    <div className="abox-wrap">
      {trackers.map((_, i) => (
        <div key={i} className={`abox-tracker abox-tr-${i}`}
          onMouseEnter={e => {
            const card = e.currentTarget.parentElement.querySelector(".abox-card");
            if (card) card.style.transform = tiltMap[i];
          }}
          onMouseLeave={e => {
            const card = e.currentTarget.parentElement.querySelector(".abox-card");
            if (card) card.style.transform = "";
          }}
        />
      ))}

      <div className="abox-card" id="abox-card">
        <div className="abox-border-anim" />
        <div className="abox-glass-panel abox-panel-1" />
        <div className="abox-glass-panel abox-panel-2" />
        <div className="abox-scan" />
        <div className="abox-corners">
          <span /><span /><span /><span />
        </div>
        <div className="abox-circuit-lines">
          <span /><span /><span /><span />
        </div>

        <div className="abox-content">
          {/* Photo column — premium portrait */}
          <div className="abox-photo-col">
            <div className="abox-photo-frame">
              <div className="abox-orbit abox-orbit-1" />
              <div className="abox-orbit abox-orbit-2" />
              <div className="abox-photo-glow" />
              <div className="abox-photo-circle">
                <div className="abox-photo-bg">
                  <img src={profile} alt="Rajanya" className="abox-photo-img" />
                </div>
              </div>
              {[0,1,2].map(i => (
                <div key={i} className={`abox-orb-dot abox-orbd-${i}`} />
              ))}
            </div>
          </div>

          {/* Bio column — elegant layout matching reference */}
          <div className="abox-bio">
            <h3 className="abox-name-line">
              This is{" "}
              <span className="abox-name"
                onMouseEnter={() => setNameHovered(true)}
                onMouseLeave={() => setNameHovered(false)}>
                Rajanya
                {nameHovered && (
                  <span className="abox-name-sparks">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className={`abox-spark abox-spark-${i}`}>✦</span>
                    ))}
                  </span>
                )}
              </span>
            </h3>

            <p className="abox-bio-text">
              I am a CSE (IoT) student currently in the 6th semester with a passion for building impactful digital experiences. I enjoy turning ideas into real-world projects that are both functional and visually engaging.
            </p>
            <p className="abox-bio-text">
              From developing modern web applications to competing in and winning national-level hackathons, I love pushing my creativity and problem-solving skills beyond the classroom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Currently Working On ───────────────────────────────────────────────────
function CurrentProject() {
  const techStack = ["React", "Flask", "MySQL", "CSS"];
  return (
    <div className="cp-card">
      <div className="cp-back">
        <div className="cp-back-ring" />
        <div className="cp-back-ring cp-back-ring-2" />
        <div className="cp-back-inner">
          <div className="cp-code-icon">&lt;/&gt;</div>
          <span className="cp-hover-label">Hover to Explore</span>
        </div>
      </div>
      <div className="cp-front">
        <div className="cp-front-shimmer" />
        <div className="cp-header">
          <span className="cp-header-label">⌨ CURRENTLY BUILDING</span>
          <span className="cp-status">
            <span className="cp-dot" />
            Active
          </span>
        </div>
        <div className="cp-divider" />
        <div className="cp-body">
          <div className="cp-icon">&lt;/&gt;</div>
          <div>
            <p className="cp-title">Online Library Management System</p>
            <p className="cp-desc">
              Web app for books, members, issue/return records and admin operations.
            </p>
          </div>
        </div>
        <div className="cp-stack">
          {techStack.map(t => <span key={t} className="cp-chip">{t}</span>)}
        </div>
        <div className="cp-corners">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  );
}

// ── Vertical Timeline Node ─────────────────────────────────────────────────
const timelineEvents = [
  { year: "2008", icon: "🎒", title: "School", sub: "St. Xavier's", color: "#a78bfa" },
  { year: "2020", icon: "📚", title: "High School", sub: "CBSE Board", color: "#38bdf8" },
  { year: "2022", icon: "🎓", title: "College", sub: "TMSL, CSE IoT", color: "#34d399" },
  { year: "2024", icon: "📄", title: "Paper", sub: "Published", color: "#fbbf24" },
  { year: "May '25", icon: "🏆", title: "SBH", sub: "4th Place", color: "#f97316" },
  { year: "Dec '25", icon: "🥇", title: "SIH", sub: "Winner", color: "#f472b6" },
  { year: "2026", icon: "🚀", title: "Technoverse", sub: "Runner-up", color: "#c084fc" },
];

function TimelineVertNode({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`tlv-item ${hovered ? "tlv-item--hovered" : ""} ${index % 2 === 0 ? "tlv-left" : "tlv-right"}`}
      style={{ "--tlv-color": item.color, "--tlv-delay": `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="tlv-card">
        <div className="tlv-card-glow" />
        <span className="tlv-year">{item.year}</span>
        <div className="tlv-title-row">
          <span className="tlv-icon">{item.icon}</span>
          <p className="tlv-title">{item.title}</p>
        </div>
        <p className="tlv-sub">{item.sub}</p>
        <div className="tlv-card-corner" />
      </div>
      <div className="tlv-connector" />
      <div className="tlv-node">
        <div className="tlv-node-ring" />
        <div className="tlv-node-core" />
        <div className={`tlv-node-arc tlv-node-arc--${index % 2 === 0 ? "right" : "left"}`} />
        {hovered && <div className="tlv-node-burst" />}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function About() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: 5, suffix: "+", label: "Hackathons", color: "#a78bfa", glyph: "🏆", delay: 0 },
    { value: 10, suffix: "+", label: "Skills", color: "#38bdf8", glyph: "⚙️", delay: 0.2 },
    { value: 10, suffix: "+", label: "Projects", color: "#34d399", glyph: "💼", delay: 0.4 },
  ];

  return (
    <section className="about-section" id="about">

      {/* ── Heading ──────────────────────────────────────────────────── */}
      <div className="about-heading-row">
        <div className="about-heading-decor">
          <span className="ahd-line" />
          <span className="ahd-diamond" />
        </div>
        <h2 className="about-heading">
          <span className="ah-who">WHO</span>
          <span className="ah-space"> </span>
          <span className="ah-am">AM</span>
          <span className="ah-space"> </span>
          <span className="ah-i">I</span>
        </h2>
        <div className="about-heading-decor ah-decor-right">
          <span className="ahd-diamond" />
          <span className="ahd-line" />
        </div>
      </div>

      {/* ── Body Layout ──────────────────────────────────────────────── */}
      <div className="about-body">

        {/* LEFT: About box + bottom row */}
        <div className="about-left-col">

          <AboutBox />

          <div className="about-bottom-row">
            <div className="about-left-bottom-stack">
              <LiveClock />
              <WeatherCard />
            </div>

            <div className="stats-trio" ref={statsRef}>
              {stats.map((s, i) => (
                <StatCircle key={i} {...s} animate={statsVisible} />
              ))}
            </div>

            <CurrentProject />
          </div>
        </div>

        {/* RIGHT: Timeline */}
        <div className="about-right-col">
          <div className="timeline-wrap">
            <div className="timeline-header-vertical">
              <span className="tlhv-label">MY JOURNEY</span>
              <div className="tlhv-line" />
            </div>
            <div className="timeline-vertical">
              {timelineEvents.map((item, i) => (
                <TimelineVertNode key={i} item={item} index={i} total={timelineEvents.length} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}