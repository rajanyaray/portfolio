import { useEffect, useState } from "react";

const useActiveSection = (sections) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = "";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const offsetTop = el.offsetTop - 150; // navbar offset
        const height = el.offsetHeight;

        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll(); // ✅ run once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return active;
};

export default useActiveSection;