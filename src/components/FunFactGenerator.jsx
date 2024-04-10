import React, { useState } from "react";

const funFacts = [
  "In 1960, Sirimavo Bandaranaike of Sri Lanka became the world's first female prime minister.",
  "New Zealand was the first country to grant women the right to vote in 1893.",
  "58 women have been awarded the Nobel Prize between 1901 and 2021.",
  "Valentina Tereshkova, a Soviet cosmonaut, became the first woman to travel into space in 1963.",
  "In 2007, India became the first country to deploy an all-women contingent to a United Nations peacekeeping mission.",
  "The 2019 FIFA Women's World Cup was watched by over 1 billion people.",
  "Over 70 countries have had their first female head of state or government as of 2021.",
  "In 2016, the largest all-female expedition made it to Antarctica to promote women's leadership in science.",
  "Women have invented numerous everyday items, including windshield wipers, disposable diapers, and the circular saw.",
  "Rwanda has the highest number of women parliamentarians worldwide, with women holding more than 60% of the seats in its lower house.",
  " First Book Written by a Woman: 'The Tale of Genji,' written by Murasaki Shikibu in the 11th century in Japan, is considered the first novel ever written by a woman.",
  "In 1967, Kathrine Switzer became the first woman to run the Boston Marathon as a numbered entry.",
  "Women control over $20 trillion in worldwide spending.",
  "In 2018, Saudi Arabia lifted its ban on women driving, a significant milestone for women's rights in the kingdom.",
  "In 2021, a record number of 41 women were leading Fortune 500 companies.",
  "Wonder Woman, one of the first female superheroes, made her debut in 1941 and has since become an icon of strength and justice.",
  "Peggy Whitson was the first female astronaut to command the International Space Station in 2008.",
  "Malala Yousafzai, a Pakistani activist for female education, became the youngest Nobel Prize laureate in 2014, symbolizing the global fight for girls' education.",
  "Over the last decade, 131 countries have passed laws to support gender equality and women's empowerment.",
  "Kamala Harris became the first female Vice President of the United States in 2021, breaking a significant glass ceiling in American politics.",
];

export default function FunFactGenerator() {
  const [fact, setFact] = useState();

  const generateRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    setFact(funFacts[randomIndex]);
  };

  return (
    <div>
      <h2>Women's Empowerment Fun Fact</h2>
      <p>{fact}</p>
      <button onClick={generateRandomFact}>Inspire Me</button>
    </div>
  );
}
