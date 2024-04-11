import React, { useState } from "react";
import "../styles/InspiringWoman.css";

const InspiringWoman = () => {
  const [womanInfo, setWomanInfo] = useState(null);

  const loadWomanInfo = () => {
    if (womanInfo) {
      // If womanInfo is already loaded, set it to null to hide the information
      setWomanInfo(null);
    } else {
      // Load the information if it's not already loaded
      const data = {
        name: "Brites de Almeida - The Baker of Aljubarrota",
        description:
          "A legendary figure in Portuguese history, Brites de Almeida, also known as the Padeira de Aljubarrota (Baker of Aljubarrota), is celebrated for her bravery during the Battle of Aljubarrota on August 14, 1385. According to folklore, she discovered Castilian soldiers hiding in her bakery after the battle. Armed with her baker’s shovel, she single-handedly defeated them, symbolizing the Portuguese spirit of resilience and independence. Her legacy is a testament to the courage and strength embodied by women throughout history.",
        imageUrl:
          "https://www.portugalnummapa.com/wp-content/uploads/2016/12/padeira-de-aljubarrota.webp",
      };
      setWomanInfo(data);
    }
  };

  return (
    <div className="inspiringWomanContainer">
      <button onClick={loadWomanInfo}>
        {womanInfo
          ? "Hide Inspiring Woman of the Month"
          : "Load Inspiring Woman of the Month"}
      </button>
      {womanInfo && (
        <div>
          <br />
          <h2 className="inspiringWomanTitle">{womanInfo.name}</h2>
          <br />
          <img
            src={womanInfo.imageUrl}
            alt={`Inspiring woman: ${womanInfo.name}`}
            className="inspiringWomanImage" // It's better to use className for styling instead of inline styles
          />
          <p className="inspiringWomanText">{womanInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default InspiringWoman;
