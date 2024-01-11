import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TraitCard from '../TraitStore/TraitCard';
import styled from 'styled-components';
// Import your Chibifactory contract ABI
import ChibifactoryABI from '../../abi/abi.json'; // Replace with the actual ABI

// Import placeholder images for each trait
import KittyImage from '../../Chibi-Traits/Hat/kitty.png';
import BeanieImage from '../../Chibi-Traits/Hat/SGBbeanie.png';
import ToadImage from '../../Chibi-Traits/Hat/toad.png';
import SpinnycapImage from '../../Chibi-Traits/Hat/spinnycap.png';
import MohawkImage from '../../Chibi-Traits/Hat/mohawk.png';
import SamuraiImage from '../../Chibi-Traits/Hat/samaraui.png';

import OriginalHeadImage from '../../Chibi-Traits/Head/orginal head.png';
import AlienHeadImage from '../../Chibi-Traits/Head/alien.png';
import HumanoidHeadImage from '../../Chibi-Traits/Head/humanoid1.png';
import RobotHeadImage from '../../Chibi-Traits/Head/robot.png';
import GoldHeadImage from '../../Chibi-Traits/Head/goldHead.png';
import MonkeyHeadImage from '../../Chibi-Traits/Head/monkey.png';

import VampireMouthImage from '../../Chibi-Traits/Mouth/vampiremouth.png';
import ButterMouthImage from '../../Chibi-Traits/Mouth/butter.png';

import HypnotizeEyesImage from '../../Chibi-Traits/Eyes/hypnotize eyes.png';
import RainbowSpiralEyesImage from '../../Chibi-Traits/Eyes/rainbowspiraleyes.png';
import DoubleEyesImage from '../../Chibi-Traits/Eyes/doubleeyes.png';
import YellowEyesImage from '../../Chibi-Traits/Eyes/yellowEyes.png';
import BlackEyesImage from '../../Chibi-Traits/Eyes/blackEyes.png';
import BlueEyesImage from '../../Chibi-Traits/Eyes/blueyes.png';

import RobotBodyImage from '../../Chibi-Traits/Body/robotBody.png';
import OriginalBodyImage from '../../Chibi-Traits/Body/orginalbody.png';
import GreenBodyImage from '../../Chibi-Traits/Body/greenbody.png';
import GoldTuxedoImage from '../../Chibi-Traits/Body/goldTuxedo.png';

import PinkGradientImage from '../../Chibi-Traits/Background/pinkGradientbg.png';
import GreenGradientImage from '../../Chibi-Traits/Background/greenGradientbg.png';
import BlueGradientImage from '../../Chibi-Traits/Background/blueGradientbg.png';
import YellowGradientImage from '../../Chibi-Traits/Background/yellowGradientbg.png';

const HatOptions = {
    Kitty: 0,
    SGBBeanie: 1,
    Toad: 2,
    Spinnycap: 3,
    Mohawk: 4,
    Samurai: 5,
  };

    const HeadOptions = {
    OriginalHead: 0,
    GreenAlienHead: 1,
    HumanoidHead: 2,
    RobotHead: 3,
    AlienHead: 4,
    GoldHead: 5,
    Monkey: 6,
    };

    const MouthOptions = {
    VampireMouth: 0,
    Butter: 1,
    };

    const EyeColorOptions = {
    HypnotizeEyes: 0,
    RainbowSpiralEyes: 1,
    DoubleEyes: 2,
    YellowEyes: 3,
    BlackEyes: 4,
    BlueEyes: 5,
    };

    const BodyOptions = {
    RobotBody: 0,
    OriginalBody: 1,
    GreenBody: 2,
    GoldTuxedo: 3,
    };

    const BackgroundOptions = {
    PinkGradient: 0,
    GreenGradient: 1,
    BlueGradient: 2,
    YellowGradient: 3,
    };

    // Create a traitOptions object
const traitOptions = {
    hatOptions: Object.values(HatOptions),
    headOptions: Object.values(HeadOptions),
    mouthOptions: Object.values(MouthOptions),
    eyeColorOptions: Object.values(EyeColorOptions),
    bodyOptions: Object.values(BodyOptions),
    backgroundOptions: Object.values(BackgroundOptions),
  };

  const traitImages = {
    hatOptions: [KittyImage, BeanieImage, ToadImage, SpinnycapImage, MohawkImage, SamuraiImage],
    headOptions: [OriginalHeadImage, AlienHeadImage, HumanoidHeadImage, RobotHeadImage, GoldHeadImage, MonkeyHeadImage],
    mouthOptions: [VampireMouthImage, ButterMouthImage],
    eyeColorOptions: [HypnotizeEyesImage, RainbowSpiralEyesImage, DoubleEyesImage, YellowEyesImage, BlackEyesImage, BlueEyesImage],
    bodyOptions: [RobotBodyImage, OriginalBodyImage, GreenBodyImage, GoldTuxedoImage],
    backgroundOptions: [PinkGradientImage, GreenGradientImage, BlueGradientImage, YellowGradientImage],
  };

  const traitNames = {
    hatOptions: Object.keys(HatOptions),
    headOptions: Object.keys(HeadOptions),
    mouthOptions: Object.keys(MouthOptions),
    eyeColorOptions: Object.keys(EyeColorOptions),
    bodyOptions: Object.keys(BodyOptions),
    backgroundOptions: Object.keys(BackgroundOptions),
    };


const Container = styled.div`
  text-align: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin: 0 auto;
    margin-top: 40px;
`;

const Heading1 = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
`;

const TraitCategory = styled.div`
  margin-top: 30px;
`;

const TraitStoreWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const TraitStore = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [traitPrices, setTraitPrices] = useState({
    hatOptions: [],
    headOptions: [],
    mouthOptions: [],
    eyeColorOptions: [],
    bodyOptions: [],
    backgroundOptions: [],
  });


  useEffect(() => {
    // Connect to Web3
    const connectToWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const chibifactoryContract = new web3Instance.eth.Contract(
          ChibifactoryABI,
          '0xc53C20b3CAE68A9ECfF933935CAB2F8C854ff46f'
        );

        const accounts = await web3Instance.eth.getAccounts();
        const userAddress = accounts[0];

        setWeb3(web3Instance);
        setContract(chibifactoryContract);
        setAccount(userAddress);
      }
    };

    connectToWeb3();
  }, []);

 
    useEffect(() => {
        // Fetch trait prices from the blockchain
        const fetchTraitPrices = async () => {
          const hatPrices = await Promise.all(traitOptions.hatOptions.map((option) => contract.methods.getHatPrice(option).call()));
          const headPrices = await Promise.all(traitOptions.headOptions.map((option) => contract.methods.getHeadPrice(option).call()));
          const mouthPrices = await Promise.all(traitOptions.mouthOptions.map((option) => contract.methods.getMouthPrice(option).call()));
          const eyeColorPrices = await Promise.all(traitOptions.eyeColorOptions.map((option) => contract.methods.getEyeColorPrice(option).call()));
          const bodyPrices = await Promise.all(traitOptions.bodyOptions.map((option) => contract.methods.getBodyPrice(option).call()));
          const backgroundPrices = await Promise.all(traitOptions.backgroundOptions.map((option) => contract.methods.getBackgroundPrice(option).call()));
      console.log(hatPrices, headPrices, mouthPrices, eyeColorPrices, bodyPrices, backgroundPrices);
          setTraitPrices({
            hatOptions: hatPrices,
            headOptions: headPrices,
            mouthOptions: mouthPrices,
            eyeColorOptions: eyeColorPrices,
            bodyOptions: bodyPrices,
            backgroundOptions: backgroundPrices,
          });
        };
      
        if (contract) {
          fetchTraitPrices();
        }
      }, [contract]);



  const purchaseTrait = async (traitType, selectedTrait) => {
  try {
    setLoading(true);

    // Map trait names to enum values
    const traitEnumValue = traitOptions[traitType][selectedTrait];

    switch (traitType) {
      case 'hatOptions':
        await contract.methods.purchaseHatTrait(traitEnumValue).send({ from: account });
        break;
      case 'headOptions':
        await contract.methods.purchaseHeadTrait(traitEnumValue).send({ from: account });
        break;
      case 'mouthOptions':
        await contract.methods.purchaseMouthTrait(traitEnumValue).send({ from: account });
        break;
      case 'eyeColorOptions':
        await contract.methods.purchaseEyeColorTrait(traitEnumValue).send({ from: account });
        break;
      case 'bodyOptions':
        await contract.methods.purchaseBodyTrait(traitEnumValue).send({ from: account });
        break;
      case 'backgroundOptions':
        await contract.methods.purchaseBackgroundTrait(traitEnumValue).send({ from: account });
        break;
      default:
        console.error('Invalid trait type');
    }

    console.log(`Successfully purchased ${selectedTrait} trait!`);
  } catch (error) {
    console.error('Error purchasing trait:', error.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <Container>
      <Heading1>Trait Store</Heading1>
      <Paragraph>Connected Account: {account}</Paragraph>

      {/* Display cards for each trait category */}
       {Object.keys(traitOptions).map((traitType) => (
    <TraitCategory key={traitType}>
      <Heading1>{traitType}</Heading1>
      <TraitStoreWrapper>
        {traitOptions[traitType].map((trait, index) => (
          <TraitCard
            key={traitNames[traitType][index]}
            traitName={traitNames[traitType][index]}
            traitImage={traitImages[traitType][index]} // Add this line to pass the image to TraitCard
            purchaseTrait={() => purchaseTrait(traitType, trait)}
            loading={loading}
            traitPrice={traitPrices[traitType][index]}
          />
        ))}
      </TraitStoreWrapper>
    </TraitCategory>
  ))}
    </Container>
  );
};

export default TraitStore;