import React from "react";
import styled from "styled-components";
import alexandrapic from "../assets/alexandrapic.jpg";
import caropic from "../assets/caropic.jpg";
import marianapic from "../assets/marianapic.jpg";

const AboutContainer = styled.div`
  text-align: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  color: #2a9d8f;
`;

const Highlight = styled.span`
  background-color: #ffeadb; 
  color: #e76f51; 
  padding: 0 4px; 
  border-radius: 4px; 
  font-weight: bold; 
`;

const Subtitle = styled.h3`
  color: #264653;
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  color: #e76f51;
  margin-top: 40px;
`;

const Image = styled.img`
  width: 250px; 
  height: 250px; 
  margin: 20px;
  border-radius: 50%; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover; 
`;


export default function AboutUs() {
  return (
    <AboutContainer>
      <Title>About us</Title>
      <Subtitle>
        Welcome to <Highlight>WanderHer</Highlight>, your go-to companion for
        globe-trotting solo with a sprinkle of sass and a whole lot of
        empowerment. Created by and for women with itchy feet and fierce hearts,{" "}
        <Highlight>WanderHer</Highlight> is here to revolutionize the way women
        travel—solo, but never alone. Why <Highlight>WanderHer</Highlight>?
        Because we've been there—navigating the thrills and spills of solo
        adventures, wishing for a sisterhood to share the highs and decode the
        lows. So, we built it. A place where accommodations whisper, “You’re
        safe here,” and activities scream, “You’ve got this, girl!” At the heart
        of <Highlight>WanderHer</Highlight> is a cocktail of seasoned travelers,
        digital nomads, and women who laugh in the face of the word
        "impossible." We're your scouts, your guides, your cheerleaders, shaking
        up the solo travel scene, one empowering experience at a time.{" "}
        <Highlight>WanderHer</Highlight> isn’t just about places to stay and
        things to do. It’s a community with guts, curated to connect, inspire,
        and embolden women to conquer the world on their own terms. Quirky local
        haunts? Check. Safe havens? Double-check. A platform buzzing with
        stories, tips, and maybe a few too many pictures of exotic food? Triple
        check. So, slap on that backpack, lace up those adventure shoes, and
        let’s make the world your playground. With{" "}
        <Highlight>WanderHer</Highlight>, solo travel is about to get a whole
        lot more fabulous. Welcome to <Highlight>WanderHer</Highlight>. Let's
        start this journey together.
      </Subtitle>
      <br />
      <SectionTitle>The Faces Behind WanderHer</SectionTitle>
      <Image src={alexandrapic} alt="Alexandra" />
      <Image src={caropic} alt="Caro" />
      <Image src={marianapic} alt="Mariana" />
    </AboutContainer>
  );
}
