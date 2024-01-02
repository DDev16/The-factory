import React, { useState } from 'react';
import styled from 'styled-components';
import hypnotizeEyes from './Chibi-Traits/Eyes/hypnotize eyes.png';
import originalHead from './Chibi-Traits/Head/orginal head.png';
import originalBody from './Chibi-Traits/Body/orginal body.png';
import robotBody from './Chibi-Traits/Body/robotBody.png';
import pinkGradientbg from './Chibi-Traits/Background/pinkGradientbg.png';
import greenGradientbg from './Chibi-Traits/Background/greenGradientbg.png';
import blueGradientbg from './Chibi-Traits/Background/blueGradientbg.png';
import yellowGradientbg from './Chibi-Traits/Background/yellowGradientbg.png';
import AppBackground from './AppBackground.gif';
import GreenAlienHead from './Chibi-Traits/Head/greenAlien.png';
import humanoidHead from './Chibi-Traits/Head/humanoid1.png';
import robotHead from './Chibi-Traits/Head/robot.png';    
import rainbowspiraleyes from './Chibi-Traits/Eyes/rainbowspiraleyes.png';
import alienHead from './Chibi-Traits/Head/alien.png';
import kitty from './Chibi-Traits/Hat/kitty.png';
import vampiremouth from './Chibi-Traits/Mouth/vampiremouth.png';
import doubleeyes from './Chibi-Traits/Eyes/doubleeyes.png';
import butter from './Chibi-Traits/Mouth/butter.png';
import SGBbeanie from './Chibi-Traits/Hat/SGBbeanie.png';
import toad from './Chibi-Traits/Hat/toad.png';
import spinnycap from './Chibi-Traits/Hat/spinnycap.png';
import mohawk from './Chibi-Traits/Hat/mohawk.png';
import yellowEyes from './Chibi-Traits/Eyes/yellowEyes.png';
import Samaraui from './Chibi-Traits/Hat/samaraui.png';
import greenBody from './Chibi-Traits/Body/greenbody.png';
import blackEyes from './Chibi-Traits/Eyes/blackEyes.png';
import blueEyes from './Chibi-Traits/Eyes/blueyes.png';
import goldHead from './Chibi-Traits/Head/goldHead.png';
import goldTexudo from './Chibi-Traits/Body/gold suit.png'; 
import monkey from './Chibi-Traits/Head/monkey.png';

// Styled components
const AppContainer = styled.div`
  text-align: center;
  font-family: 'Rubik Doodle Shadow', sans-serif;
  background-img: url(${AppBackground});
  background-size: cover;
  background-repeat: no-repeat;
  height: 150vh;
  border-top: 10px  dotted #ddd;

`;


const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


const Sidebar = styled.aside`
  flex: 0 0 200px;
  padding: 20px;
  border-right: 1px solid #ddd;
  height: 1024px;
  overflow-y: auto;
  background-color: #333;
  width: 50%;

  @media (max-width: 768px) {
    height: auto;
    width: 80%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;


const Header = styled.header`
  font-family: 'Rubik Doodle Shadow, sans-serif';
  font-size: 10px;
  color: white;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;



const ChibiCanvas = styled.div`
  position: relative;
  width: 1024px;
  height: 1024px;
  border: 8px solid #ccc;
  margin-bottom: 20px;
  border-radius: 16px;
  background: #ccc;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 90vw;
    height: 90vw; /* Keep the aspect ratio */
  }
`;



const TraitStyle = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 6px;
  max-width: 100%;
  height: auto;

  @media (max-width: 768px) {
    /* Adjust size and position for smaller screens */
    width: 100vw; /* Example size, adjust as needed */
    /* You may also need to adjust 'top' and 'left' properties using percentages or viewport units */
  }
`;


const TraitSelectionContainer = styled.div`
  margin: 10px;
  color: #fff;
  background-color: #333;
width: 50%;
  display: inline-block;
`;

const TraitButton = styled.button`
  margin: 5px;
  padding: 8px 15px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #eaeaea;
  }
`;

const hatOptions = {
  [kitty]: 'Kitty',
  [SGBbeanie]: 'SGB Beanie',
  [toad]: 'Toad',
  [spinnycap]: 'Spiny Cap',
  [mohawk]: 'Mohawk',
  [Samaraui]: 'Samaraui',

};


const headOptions = {
  [originalHead]: 'Original Head',
  [GreenAlienHead]: 'Green Alien Head',
  [humanoidHead]: 'Humanoid Head',
  [robotHead]: 'Robot Head',
  [alienHead]: 'Alien Head',
  [goldHead]: 'Gold Head',
  [monkey]: 'Monkey',
  
};

const mouthOptions = {
  [vampiremouth]: 'Vampire Mouth',
  [butter]: 'Butter',
};


const eyeColorOptions = {
  [hypnotizeEyes]: 'Hypnotize Eyes',
  [rainbowspiraleyes]: 'Rainbow Spiral Eyes',
  [doubleeyes]: 'Double Eyes',
  [yellowEyes]: 'Yellow Eyes',
  [blackEyes]: 'Black Eyes',
  [blueEyes]: 'Blue Eyes',
};

const bodyOptions = {
  [robotBody]: 'Robot Body',
  [originalBody]: 'Original Body',
  [greenBody]: 'Green Body',
  [goldTexudo]: 'Gold Texudo',
  
};

const backgroundOptions = {
  [pinkGradientbg]: 'Pink Gradient',
  [greenGradientbg]: 'Green Gradient',
  [blueGradientbg]: 'Blue Gradient',
  [yellowGradientbg]: 'Yellow Gradient',
  // Add other background options here
};

function App() {
  const [chibiTraits, setChibiTraits] = useState({
    hat: [],
    head: [],
    mouth: [],
    eyeColor: [],
    body: [],
    background: [],
  });
  
  const updateTrait = (traitType, value) => {
    setChibiTraits(prevTraits => {
      // Check if the trait is already selected
      if (prevTraits[traitType].includes(value)) {
        // Remove the trait if it is already selected
        return {
          ...prevTraits,
          [traitType]: prevTraits[traitType].filter(trait => trait !== value),
        };
      } else {
        // Add the trait if it is not already selected
        return {
          ...prevTraits,
          [traitType]: [...prevTraits[traitType], value],
        };
      }
    });
  };
  

  return (
    <AppContainer style= {{ backgroundImage: `url(${AppBackground})` }}>
      <Header>
        <h1 style={{ fontFamily: 'Rubik Doodle Shadow, sans-serif', fontSize:'80px', Letter:'30px', color: 'white' }}>Chibi Factory</h1>
      </Header>
      <MainLayout>
        <Sidebar>
        <TraitSelection traitType="hat" options={Object.keys(hatOptions)} updateTrait={updateTrait} label="Hat" />
        <TraitSelection traitType="head" options={Object.keys(headOptions)} updateTrait={updateTrait} label="Head" />
        <TraitSelection traitType="mouth" options={Object.keys(mouthOptions)} updateTrait={updateTrait} label="Mouth" />
<TraitSelection traitType="eyeColor" options={Object.keys(eyeColorOptions)} updateTrait={updateTrait} label="Eyes" />
<TraitSelection traitType="body" options={Object.keys(bodyOptions)} updateTrait={updateTrait} label="Body" />
<TraitSelection traitType="background" options={Object.keys(backgroundOptions)} updateTrait={updateTrait} label="Background" />

</Sidebar>
        <ChibiDisplay traits={chibiTraits} />
      </MainLayout>
    </AppContainer>
  );
}

function ChibiDisplay({ traits }) {
  return (
    <ChibiCanvas>
      {traits.background.map((backgroundTrait, index) => (
        <TraitStyle key={index} src={backgroundTrait} alt="Chibi Background" />
      ))}
      {traits.body.map((bodyTrait, index) => (
        <TraitStyle key={index} src={bodyTrait} alt="Chibi Body" />
      ))}
      {traits.eyeColor.map((eyeColorTrait, index) => (
        <TraitStyle key={index} src={eyeColorTrait} alt="Chibi Eyes" />
      ))}
      {traits.head.map((headTrait, index) => (
        <TraitStyle key={index} src={headTrait} alt="Chibi Head" />
      ))}
      {traits.mouth.map((mouthTrait, index) => (
        <TraitStyle key={index} src={mouthTrait} alt="Chibi Mouth" />
      ))}
      {traits.hat.map((hatTrait, index) => (
        <TraitStyle key={index} src={hatTrait} alt="Chibi Hat" />
      ))}
      
    </ChibiCanvas>
  );
}

function TraitSelection({ traitType, options, updateTrait, label }) {
  let optionNames;
  switch (traitType) {
    case 'hat':
      optionNames = hatOptions;
      break;
    case 'head':
      optionNames = headOptions;
      break;
    case 'mouth':
      optionNames = mouthOptions;
      break;
    case 'eyeColor':
      optionNames = eyeColorOptions;
      break;
    case 'body':
      optionNames = bodyOptions;
      break;
    case 'background':
      optionNames = backgroundOptions;
      break;
    default:
      optionNames = {};
  }

 
  
    return (
      <TraitSelectionContainer>
        <h3>{label}</h3>
        {options.map((option, index) => (
          <TraitButton key={index} onClick={() => updateTrait(traitType, option)}>
            {option === '' ? `Remove ${label}` : optionNames[option]}
          </TraitButton>
        ))}
      </TraitSelectionContainer>
    );
  }
  

  export default App;