import { useEffect, useRef } from "react";
import "./footer.css";

/* ── Social SVGs ── */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
  </svg>
);

/* ── Floating particles ── */
function useParticles(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cfg = [
      { l: "8%",  dur: 8,  del: 0   },
      { l: "20%", dur: 11, del: 3   },
      { l: "34%", dur: 9,  del: 6   },
      { l: "50%", dur: 13, del: 1.5 },
      { l: "66%", dur: 10, del: 8   },
      { l: "80%", dur: 7,  del: 4.5 },
      { l: "91%", dur: 12, del: 7   },
    ];
    const nodes = cfg.map(({ l, dur, del }) => {
      const p = document.createElement("span");
      p.className = "f-particle";
      p.style.cssText = `left:${l};bottom:0;animation-duration:${dur}s;animation-delay:${del}s`;
      el.appendChild(p);
      return p;
    });
    return () => nodes.forEach(p => p.remove());
  }, []);
}

/* ── Marquee tags ── */
const TAGS = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Tailwind CSS", "UI/UX Design", "Framer Motion",
  "REST APIs", "GraphQL", "PostgreSQL", "Figma", "Open to Work",
];

/* ── Component ── */
export default function Footer() {
  const particleRef = useRef(null);
  useParticles(particleRef);

  const doubled = [...TAGS, ...TAGS];

  return (
    <footer className="site-footer" role="contentinfo">

      {/* Orbs */}
      <div className="f-orb f-orb-1" aria-hidden="true" />
      <div className="f-orb f-orb-2" aria-hidden="true" />

      {/* Particles */}
      <div className="f-particles" ref={particleRef} aria-hidden="true" />

      {/* Wave divider */}
      <svg className="f-wave" viewBox="0 0 1440 56" preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height="56">
        <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28" />
      </svg>

      <div className="f-body">

        {/* Marquee */}
        <div className="f-mq-wrap" aria-hidden="true">
          <div className="f-mq-track">
            {doubled.map((tag, i) => (
              <span className="f-mq-item" key={i}>
                {tag}
                <span className="f-mq-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="f-grid">

          {/* Brand */}
          <div>
            <a href="#home" className="f-logo" aria-label="Go to top">
              Rajanya<span style={{ opacity: 0.4 }}>.</span>
            </a>
            <p className="f-tagline">
              Crafting thoughtful digital experiences where design meets
              engineering — one pixel at a time.
            </p>
            <div className="f-badge" aria-label="Available for freelance work">
              <span className="f-badge-dot" />
              Available for freelance
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Site navigation">
            <p className="f-nav-heading">Explore</p>
            <ul className="f-nav-list">
              {[
                { label: "About",        href: "#about" },
                { label: "Projects",     href: "#projects" },
                { label: "Skills",       href: "#skills" },
                { label: "Achievements", href: "#achievements" },
                { label: "Contact",      href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <nav aria-label="External links">
            <p className="f-nav-heading">Connect</p>
            <ul className="f-nav-list">
              {[
                { label: "GitHub",    href: "https://github.com/" },
                { label: "LinkedIn",  href: "https://linkedin.com/in/" },
                { label: "Twitter",   href: "https://twitter.com/" },
                { label: "Resume",    href: "/resume.pdf" },
                { label: "Say Hello", href: "mailto:hello@rajanya.dev" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        {/* Bottom bar */}
        <div className="f-bottom">
          <p className="f-copy">
            © {new Date().getFullYear()} Rajanya. Built with{" "}
            <span role="img" aria-label="love">♡</span> &amp; React.
          </p>

          <div className="f-socials" role="list" aria-label="Social media links">
            {[
              { Icon: GithubIcon,   href: "https://github.com/",         label: "GitHub"   },
              { Icon: LinkedinIcon, href: "https://linkedin.com/in/",    label: "LinkedIn" },
              { Icon: TwitterIcon,  href: "https://twitter.com/",        label: "Twitter"  },
              { Icon: MailIcon,     href: "mailto:hello@rajanya.dev",    label: "Email"    },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="f-social"
                aria-label={label}
                role="listitem"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}