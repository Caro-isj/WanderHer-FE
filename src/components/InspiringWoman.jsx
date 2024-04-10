import React, { useState } from "react";

const InspiringWoman = () => {
  const [womanInfo, setWomanInfo] = useState(null);

  const loadWomanInfo = () => {
    const data = {
      name: "Brites de Almeida - The Baker of Aljubarrota",
      description:
        "A legendary figure in Portuguese history, Brites de Almeida, also known as the Padeira de Aljubarrota (Baker of Aljubarrota), is celebrated for her bravery during the Battle of Aljubarrota on August 14, 1385. According to folklore, she discovered Castilian soldiers hiding in her bakery after the battle. Armed with her baker’s shovel, she single-handedly defeated them, symbolizing the Portuguese spirit of resilience and independence. Her legacy is a testament to the courage and strength embodied by women throughout history.",
      imageUrl: "path_to_brites_de_almeida_image.jpg",
    };
    setWomanInfo(data);
  };

  return (
    <div>
      <button onClick={loadWomanInfo}>Load Inspiring Woman of the Month</button>
      {womanInfo && (
        <div>
          <h2>{womanInfo.name}</h2>
          <img
            src={womanInfo.imageUrl}
            alt={`Inspiring woman: ${womanInfo.name}`}
            style={{ width: "100%", maxWidth: "300px", height: "auto" }}
          />
          <p>{womanInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default InspiringWoman;
