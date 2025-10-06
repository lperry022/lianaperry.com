"use client";
import { useEffect } from "react";

export default function LinkedInEmbed() {
  useEffect(() => {
    // Load LinkedIn's embed script only once
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="badge-base LI-profile-badge"
      data-locale="en_US"
      data-size="medium"
      data-theme="dark"
      data-type="VERTICAL"
      data-vanity="liana-perry-b5aa2717b" 
      data-version="v1"
    >
      <a
        className="badge-base__link LI-simple-link"
        href="https://www.linkedin.com/in/liana-perry-b5aa2717b"
        target="_blank"
      >
        View LinkedIn Profile
      </a>
    </div>
  );
}
