import React from "react";
import "./SectionHeading.css";

export default function SectionHeading({ title, tagline }) {
  return (
    <div className="section-heading-container">
      <h2 className="split-heading">{title}<span>{title}</span><span>{title}</span><span>{tagline}</span></h2>
    </div>
  );
}
