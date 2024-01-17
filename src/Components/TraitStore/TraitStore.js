import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TraitCard from '../TraitStore/TraitCard';
import styled from 'styled-components';
// Import your Chibifactory contract ABI
import ChibifactoryABI from '../../abi/abi.json'; // Replace with the actual ABI

// Import placeholder images for each trait
//HATS
import KittyImage from '../../Traits/Hat/kitty.png';
import BeanieImage from '../../Traits/Hat/NFT-SONGBIRD-BEANIE.png';
import ToadImage from '../../Chibi-Traits/Hat/toad.png';
import SpinnycapImage from '../../Traits/Hat/spinnycap.png';
import MohawkImage from '../../Traits/Hat/mohawk.png';
import SamuraiImage from '../../Traits/Hat/samaraui.png';

//Heads
import OriginalHeadImage from '../../Traits/Head/original.png';
import AlienHeadImage from '../../Traits/Head/alien.png';

import HumanoidHeadImage from '../../Traits/Head/humanoid.png';
import RobotHeadImage from '../../Traits/Head/robot.png';
import GoldHeadImage from '../../Traits/Head/goldHead.png';
import MonkeyHeadImage from '../../Traits/Head/monkey.png';
import GreenAlienHeadImage from '../../Traits/Head/Green-Alien.png';


//Mouths



import VampireMouthImage from '../../Traits/Mouth/Vampire-mouth.png';
import ButterMouthImage from '../../Traits/Mouth/butter.png';


//Eyes

import HypnotizeEyesImage from '../../Traits/Eyes/hypnotize-eyes.png';
import RainbowSpiralEyesImage from '../../Traits/Eyes/rainbowspiraleyes.png';
import DoubleEyesImage from '../../Traits/Eyes/double-eyes.png';
import YellowEyesImage from '../../Traits/Eyes/yellowEyes.png';
import BlackEyesImage from '../../Traits/Eyes/blackEyes.png';
import BlueEyesImage from '../../Traits/Eyes/blue-spirals.png';
import GoldenEyes from '../../Traits/Eyes/goldeyes.png';

//Body

import RobotBodyImage from '../../Chibi-Traits/Body/robotBody.png';
import OriginalBodyImage from '../../Chibi-Traits/Body/orginalbody.png';
import GreenBodyImage from '../../Chibi-Traits/Body/greenbody.png';
import GoldTuxedoImage from '../../Chibi-Traits/Body/goldTuxedo.png';

import PinkGradientImage from '../../Chibi-Traits/Background/pinkGradientbg.png';
import GreenGradientImage from '../../Chibi-Traits/Background/greenGradientbg.png';
import BlueGradientImage from '../../Chibi-Traits/Background/blueGradientbg.png';
import YellowGradientImage from '../../Chibi-Traits/Background/yellowGradientbg.png';
import ERC20ABI from '../../abi/ERC20Abi.json'; // Replace with the actual ABI

import Holo from '../../Chibi-Traits/Background/holo.png';  
import Illusion from '../../Chibi-Traits/Background/illusions.png';
import Spiral from '../../Chibi-Traits/Background/Spiral effect.png';
import DottedIllusion from '../../Chibi-Traits/Background/dotted illusion.png';
import WavesOfIllusion from '../../Chibi-Traits/Background/waves of illusion.png';
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
    GoldenEyes: 6,
   

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
    Holo: 4,
    Illusion: 5,
    Spiral: 6,
    DottedIllusion: 7,
    WavesOfIllusion: 8,


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
    hatOptions: [KittyImage, BeanieImage, ToadImage, SpinnycapImage, MohawkImage, SamuraiImage ],
    headOptions: [OriginalHeadImage, GreenAlienHeadImage, HumanoidHeadImage, RobotHeadImage, AlienHeadImage, GoldHeadImage, MonkeyHeadImage],
    mouthOptions: [VampireMouthImage, ButterMouthImage],
    eyeColorOptions: [HypnotizeEyesImage, RainbowSpiralEyesImage, DoubleEyesImage, YellowEyesImage, BlackEyesImage, BlueEyesImage, GoldenEyes],
    bodyOptions: [RobotBodyImage, OriginalBodyImage, GreenBodyImage, GoldTuxedoImage],
    backgroundOptions: [PinkGradientImage, GreenGradientImage, BlueGradientImage, YellowGradientImage, Holo, Illusion, Spiral, DottedIllusion, WavesOfIllusion],
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
  padding: 20px;
  border-radius: 10px;
  max-width: 100%;
  margin: 0 auto;
    margin-top: 40px;
`;

const Heading1 = styled.h1`
  font-size: 36px;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 10px 10px rgba(0, 0, 0, 0.9);

`;

const Paragraph = styled.p`
  font-size: 18px;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 0 10px 10px rgba(0, 0, 0, 0.9);
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



      const approveTraitPurchase = async (spender, amount) => {
        try {
          setLoading(true);
    
          // Replace 'yourERC20ContractAddress' with the actual address of your ERC20 contract
          const erc20ContractAddress = '0xa27bC320252d51EEAA24BCCF6cc003979E485860';
          
          // Use the web3 instance to create a contract object for the ERC20 contract
          const erc20Contract = new web3.eth.Contract(ERC20ABI, erc20ContractAddress);
    
          // Call the 'approve' method on the ERC20 contract to approve the spender
          await erc20Contract.methods.approve(spender, amount).send({ from: account });
    
          console.log('Successfully approved trait purchase!');
        } catch (error) {
          console.error('Error approving trait purchase:', error.message);
        } finally {
          setLoading(false);
        }
      };
    
      const purchaseTrait = async (traitType, selectedTrait) => {
        try {
          setLoading(true);
    
          // Map trait names to enum values
          const traitEnumValue = traitOptions[traitType][selectedTrait];
          const traitPrice = traitPrices[traitType][selectedTrait];
    
          // Replace 'ChibifactoryContractAddress' with the actual address of your Chibifactory contract
          const chibifactoryContractAddress = '0xc53C20b3CAE68A9ECfF933935CAB2F8C854ff46f';
    
          // Call the approveTraitPurchase function before proceeding with trait purchase
          await approveTraitPurchase(chibifactoryContractAddress, traitPrice);
    
          // Proceed with the trait purchase after approval
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