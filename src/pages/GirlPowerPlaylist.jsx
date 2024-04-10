import React from "react";
import FunFactGenerator from "../components/FunFactGenerator";
import "../styles/GirlPowerPlaylistStyle.css";
import InspiringWoman from "../components/InspiringWoman";

export default function GirlPowerPlaylist() {
  return (
    <div>
      <h1 className="girlpower-title">Groove, Explore, Empower</h1>
      <h3 className="girlpower-subtitle">
        Tune into the Rhythm of Solo Female Adventure
      </h3>

      <FunFactGenerator />
      <br />
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSNiUduOl0uo?utm_source=generator"
        width="50%"
        height="500"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <InspiringWoman />
    </div>
  );
}
