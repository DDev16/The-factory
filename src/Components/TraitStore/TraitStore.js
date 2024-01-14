import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TraitCard from '../TraitStore/TraitCard';
import styled from 'styled-components';
// Import your Chibifactory contract ABI
import ChibifactoryABI from '../../abi/abi.json'; // Replace with the actual ABI

// Import placeholder images for each trait
//HATS
import KittyImage from '../../Traits/Hat/kitty.jpg';
import BeanieImage from '../../Traits/Hat/NFT SONGBIRD BEANIE.jpg';
import ToadImage from '../../Chibi-Traits/Hat/toad.png';
import SpinnycapImage from '../../Traits/Hat/spinnycap.jpg';
import MohawkImage from '../../Traits/Hat/mohawk.jpg';
import SamuraiImage from '../../Traits/Hat/samaraui.jpg';
import Viking from '../../Traits/Hat/viking.jpg';
import UnicornHorn from '../../Traits/Hat/Unicorn Horn.jpg';
import SongBird from '../../Traits/Hat/song bird.jpg';
import Sombero from '../../Traits/Hat/sombero.jpg';
import SGBTopHat from '../../Traits/Hat/sgb top hat.jpg';
import PrincessCrown from '../../Traits/Hat/Princess Crown.jpg';
import PoliceHat from '../../Traits/Hat/police hat.jpg';
import PirateHat from '../../Traits/Hat/Pirate hat.jpg';
import NFTCap from '../../Traits/Hat/NFT cap.jpg';
import KingsCrown from '../../Traits/Hat/Kings Crown.jpg';
import HippyBucketHat from '../../Traits/Hat/Hippy bucket hat.jpg';
import Headphones from '../../Traits/Hat/headphones.jpg';
import Headdress from '../../Traits/Hat/Headdress.jpg';
import Halo from '../../Traits/Hat/halo.png';
import GreySGBBeanie from '../../Traits/Hat/grey sgb beanie.jpg';
import GoldenPoo  from '../../Traits/Hat/golden poo.jpg';
import FirefighterHelmet from '../../Traits/Hat/firefighter helmet.jpg';
import DevilHorns from '../../Traits/Hat/Devil Horns.jpg';
import ConstructionHat from '../../Traits/Hat/Construction Hat.jpg';
import Clown from '../../Traits/Hat/clown hat.jpg';
import BlackHair from '../../Traits/Hat/black hair.jpg';
import Astronuaght from '../../Traits/Hat/Astronuaght helmet.jpg';
import Antennas from '../../Traits/Hat/Alien antennes.jpg'

//Heads
import OriginalHeadImage from '../../Traits/Head/original.jpg';
import AlienHeadImage from '../../Traits/Head/alien.jpg';
import BlueSkin from '../../Traits/Head/blueskin.jpg';
import GreenSkin from '../../Traits/Head/green skin.jpg';
import RedSkin from '../../Traits/Head/red skin.jpg';
import HumanoidHeadImage from '../../Traits/Head/humanoid.jpg';
import RobotHeadImage from '../../Traits/Head/robot.jpg';
import GoldHeadImage from '../../Traits/Head/goldHead.jpg';
import MonkeyHeadImage from '../../Traits/Head/monkey.jpg';
import GreenAlienHeadImage from '../../Traits/Head/Green Alien.jpg';
import SkullHeadImage from '../../Traits/Head/Skull.jpg';
import Zombies from '../../Traits/Head/ZombieHead.jpg';

//Mouths



import VampireMouthImage from '../../Traits/Mouth/Vampire mouth.jpg';
import ButterMouthImage from '../../Traits/Mouth/butter.jpg';
import TongueOut from '../../Traits/Mouth/tongue out.jpg';
import TobaccoPipe from '../../Traits/Mouth/tobacco pipe.jpg';
import SmileyTongue from '../../Traits/Mouth/smiley tongue.jpg';
import Smile from '../../Traits/Mouth/smile.png';
import PearlyWhites from '../../Traits/Mouth/pearly whites.png';
import BigSmile from '../../Traits/Mouth/big smile.jpg';

//Eyes

import HypnotizeEyesImage from '../../Traits/Eyes/hypnotize eyes.jpg';
import RainbowSpiralEyesImage from '../../Traits/Eyes/rainbowspiraleyes.jpg';
import DoubleEyesImage from '../../Traits/Eyes/double eyes.jpg';
import YellowEyesImage from '../../Traits/Eyes/yellowEyes.jpg';
import BlackEyesImage from '../../Traits/Eyes/blackEyes.jpg';
import BlueEyesImage from '../../Traits/Eyes/blue spirals.jpg';
import GoldenEyes from '../../Traits/Eyes/goldeyes.jpg';
import GreenSpirals from '../../Traits/Eyes/green spirals.jpg';
import WhiteEyes from '../../Traits/Eyes/White Eyes.jpg';
import YellowSpiral   from '../../Traits/Eyes/yellow spirals.jpg';
//Body

import RobotBodyImage from '../../Traits/Body/robotBody.jpg';
import OriginalBodyImage from '../../Traits/Body/Birthday suit.jpg';
import GreenBodyImage from '../../Traits/Body/greenbody.jpg';
import GoldTuxedoImage from '../../Traits/Body/gold suit.jpg';
import Old from '../../Traits/Body/1800s.jpg';
import AlienHoodie from '../../Traits/Body/Alien hoodie.jpg';
import BlueBody from '../../Traits/Body/Blue body.jpg';
import ChefsCoat from '../../Traits/Body/chefs coat.jpg';
import ClownBody from '../../Traits/Body/Clown.jpg';
import Contruction from '../../Traits/Body/construction.jpg';
import Firefighter from '../../Traits/Body/Fire fighter.jpg';
import GreyBody from '../../Traits/Body/Grey body.jpg';
import MonkeyTorso from '../../Traits/Body/monkey torso.jpg';
import Native from '../../Traits/Body/Native.jpg';
import PeaceSignArmyGuy from '../../Traits/Body/Peace sign army guy.jpg';
import Princess from '../../Traits/Body/princess dress.jpg';
import PrisonJumpsuit from '../../Traits/Body/prison jumpsuit.jpg';
import PsychoChibi from '../../Traits/Body/Psycho Chibi.jpg';
import Raincoat from '../../Traits/Body/RainCoat.jpg';
import RedBody from '../../Traits/Body/red body.jpg';
import Robe from '../../Traits/Body/Robe.jpg';
import SamuraiBody from '../../Traits/Body/Samaraui.jpg';
import SGBHoodie from '../../Traits/Body/SGB hoodie.jpg';
import Skeleton from '../../Traits/Body/Skeleton.jpg';
import SpaceSuit from '../../Traits/Body/Space suit.jpg';
import UnicornOnsie from '../../Traits/Body/unicorn onsie.jpg';
import WhiteTuxedo from '../../Traits/Body/white tux.jpg';
import Wounded from '../../Traits/Body/wounded.jpg';

//Backgrounds
import PinkGradientImage from '../../Chibi-Traits/Background/pinkGradientbg.png';
import GreenGradientImage from '../../Chibi-Traits/Background/greenGradientbg.png';
import BlueGradientImage from '../../Chibi-Traits/Background/blueGradientbg.png';
import YellowGradientImage from '../../Chibi-Traits/Background/yellowGradientbg.png';
import Holo from '../../Chibi-Traits/Background/holo.png';  
import Illusion from '../../Chibi-Traits/Background/illusions.png';
import Spiral from '../../Chibi-Traits/Background/Spiral effect.png';
import DottedIllusion from '../../Chibi-Traits/Background/dotted illusion.png';
import WavesOfIllusion from '../../Chibi-Traits/Background/waves of illusion.png';
import Orange from '../../Traits/Background/orange.jpg';
import SuperFoily from '../../Traits/Background/Super foily.jpg';


import ERC20ABI from '../../abi/ERC20Abi.json'; // Replace with the actual ABI

const HatOptions = {
    Kitty: 0,
    SGBBeanie: 1,
    Toad: 2,
    Spinnycap: 3,
    Mohawk: 4,
    Samurai: 5,
    Viking: 6,
    UnicornHorn: 7,
    SongBird: 8,
    Sombero: 9,
    SGBTopHat: 10,
    PrincessCrown: 11,
    PoliceHat: 12,
    PirateHat: 13,
    NFTCap: 14,
    KingsCrown: 15,
    HippyBucketHat: 16,
    Headphones: 17,
    Headdress: 18,
    Halo: 19,
    GreySGBBeanie: 20,
    GoldenPoo: 21,
    FirefighterHelmet: 22,
    DevilHorns: 23,
    ConstructionHat: 24,
    Clown: 25,
    BlackHair: 26,
    Astronuaght: 27,
    Antennas: 28,

  };

    const HeadOptions = {
    OriginalHead: 0,
    GreenAlienHead: 1,
    HumanoidHead: 2,
    RobotHead: 3,
    AlienHead: 4,
    GoldHead: 5,
    Monkey: 6,
    Skull: 7,
    Zombies: 8,
    BlueSkin: 9,
    GreenSkin: 10,
    RedSkin: 11,
    
    };

    const MouthOptions = {
    VampireMouth: 0,
    Butter: 1,
    TongueOut: 2,
    TobaccoPipe: 3,
    SmileyTongue: 4,
    Smile: 5,
    PearlyWhites: 6,
    BigSmile: 7,
      
    };

    const EyeColorOptions = {
    HypnotizeEyes: 0,
    RainbowSpiralEyes: 1,
    DoubleEyes: 2,
    YellowEyes: 3,
    BlackEyes: 4,
    BlueEyes: 5,
    GoldenEyes: 6,
    GreenSpirals: 7,
    WhiteEyes: 8,
    YellowSpiral: 9,

    };

    const BodyOptions = {
    RobotBody: 0,
    OriginalBody: 1,
    GreenBody: 2,
    GoldTuxedo: 3,
    Old: 4,
    AlienHoodie: 5,
    BlueBody: 6,
    ChefsCoat: 7,
    ClownBody: 8,
    Contruction: 9,
    Firefighter: 10,
    GreyBody: 11,
    MonkeyTorso: 12,
    Native: 13,
    PeaceSignArmyGuy: 14, 
    Princess: 15,
    PrisonJumpsuit: 16,
    PsychoChibi: 17,
    Raincoat: 18,
    RedBody: 19,
    Robe: 20,
    SamuraiBody: 21,
    SGBHoodie: 22,
    Skeleton: 23,
    SpaceSuit: 24,
    UnicornOnsie: 25,
    WhiteTuxedo: 26,
    Wounded: 27,
      
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
    Orange: 9,
    SuperFoily: 10,



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
    hatOptions: [KittyImage, BeanieImage, ToadImage, SpinnycapImage, MohawkImage, SamuraiImage, Viking, UnicornHorn, SongBird, Sombero, SGBTopHat, PrincessCrown, PoliceHat, PirateHat, NFTCap, KingsCrown, HippyBucketHat, Headphones, Headdress, Halo, GreySGBBeanie, GoldenPoo, FirefighterHelmet, DevilHorns, ConstructionHat, Clown, BlackHair, Astronuaght, Antennas],
    headOptions: [OriginalHeadImage, GreenAlienHeadImage, HumanoidHeadImage, RobotHeadImage, AlienHeadImage, GoldHeadImage, MonkeyHeadImage, SkullHeadImage, Zombies, BlueSkin, GreenSkin, RedSkin],
    mouthOptions: [VampireMouthImage, ButterMouthImage, TongueOut, TobaccoPipe, SmileyTongue, Smile, PearlyWhites, BigSmile],
    eyeColorOptions: [HypnotizeEyesImage, RainbowSpiralEyesImage, DoubleEyesImage, YellowEyesImage, BlackEyesImage, BlueEyesImage, GoldenEyes, GreenSpirals, WhiteEyes, YellowSpiral],
    bodyOptions: [RobotBodyImage, OriginalBodyImage, GreenBodyImage, GoldTuxedoImage, Old, AlienHoodie, BlueBody, ChefsCoat, ClownBody, Contruction, Firefighter, GreyBody, MonkeyTorso, Native, PeaceSignArmyGuy, Princess, PrisonJumpsuit, PsychoChibi, Raincoat, RedBody, Robe, SamuraiBody, SGBHoodie, Skeleton, SpaceSuit, UnicornOnsie, WhiteTuxedo, Wounded],
    backgroundOptions: [PinkGradientImage, GreenGradientImage, BlueGradientImage, YellowGradientImage, Holo, Illusion, Spiral, DottedIllusion, WavesOfIllusion, Orange, SuperFoily],
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