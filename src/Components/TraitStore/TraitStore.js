import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TraitCard from '../TraitStore/TraitCard';
import styled from 'styled-components';
// Import your Chibifactory contract ABI
import ChibifactoryABI from '../../abi/abi.json'; // Replace with the actual ABI
import ERC20ABI from '../../abi/ERC20Abi.json'; // Replace with the actual ABI

//Hat Traits
import KittyImage from '../../Traits/Hat/kitty.png';
import SGBbeanieImage from '../../Chibi-Traits/Hat/SGBbeanie.png';
import spinnycapImage from '../../Traits/Hat/spinnycap.png';
import mohawkImage from '../../Traits/Hat/mohawk.png';
import SamarauiImage from '../../Traits/Hat/samaraui.png';
import toadImage from '../../Chibi-Traits/Hat/toad.png';
import AlienAntennaasImage from '../../Traits/Hat/Alien-antennes.png';
import AstronuaghtHelmetImage from '../../Traits/Hat/Astronuaght-helmet.png';
import BlackHairImage from '../../Traits/Hat/black-hair.png';
import ClownHatImage from '../../Traits/Hat/clown-hat.png';
import ConstructionHatImage from '../../Traits/Hat/Construction-Hat.png';
import DevilHornsImage from '../../Traits/Hat/Devil-Horns.png';
import FirefighterHelmetImage from '../../Traits/Hat/firefighter-helmet.png';
import GoldenPooImage from '../../Traits/Hat/golden poo.png';
import GreySGBBeanieImage from '../../Traits/Hat/grey-sgb-beanie.png';
import HaloImage from '../../Traits/Hat/halo.png';
import HeadderessImage from '../../Traits/Hat/Headdress.png';
import HeadphonesImage from '../../Traits/Hat/headphones.png';
import HippyBucketHatImage from '../../Traits/Hat/Hippy-bucket-hat.png';
import KingsCrownImage from '../../Traits/Hat/Kings-Crown.png';
import NFTCapImage from '../../Traits/Hat/NFT-cap.png';
import NFTSongbirdBeanieImage from '../../Traits/Hat/NFT-SONGBIRD-BEANIE.png';
import PirateHatImage from '../../Traits/Hat/Pirate-hat.png';
import PoliceHatImage from '../../Traits/Hat/police-hat.png';
import PrincessCrownImage from '../../Traits/Hat/Princess-Crown.png';
import SGBTopHatImage from '../../Traits/Hat/sgb-top-hat.png';
import SomberoImage from '../../Traits/Hat/sombero.png';
import SongBirdImage from '../../Traits/Hat/song bird.png';
import UnicornHornImage from '../../Traits/Hat/Unicorn-Horn.png';
import VikingHelmetImage from '../../Traits/Hat/viking.png';

//Accessories
import BandanaImage from '../../Traits/Accessories/bandana.png';
import EyePatchImage from '../../Traits/Accessories/Eye-Patch.png';
import FlareTattooImage  from '../../Traits/Accessories/Flare-Tattoo.png';
import LolliPopImage from '../../Traits/Accessories/lolli-pop.png';
import PyschoFlowerImage from '../../Traits/Accessories/Psycho-Flower.png';
import PsychoGemStaffImage from '../../Traits/Accessories/Psycho-Gem-Staff.png';
import PyschoGemImage from '../../Traits/Accessories/Psycho-Gem.png';

//Head Options
import originalHeadImage from '../../Traits/Head/original.png';
import GreenAlienHeadImage from '../../Traits/Head/Green-Alien.png';
import humanoidHeadImage from '../../Traits/Head/humanoid.png';
import robotHeadImage from '../../Traits/Head/robot.png';  
import alienHeadImage from '../../Traits/Head/alien.png';
import monkeyImage from '../../Traits/Head/monkey.png';
import goldHeadImage from '../../Traits/Head/goldHead.png';
import BlueHeadImage from '../../Traits/Head/blueskin.png';
import GreenHeadImage from '../../Traits/Head/green-skin.png';
import RedHeadImage from '../../Traits/Head/red-skin.png';
import SkullImage from '../../Traits/Head/Skull.png';
import ZombieHeadImage from '../../Traits/Head/ZombieHead.png';

//Mouth Options
import vampiremouthImage from '../../Traits/Mouth/Vampire-mouth.png';
import butterImage from '../../Traits/Mouth/butter.png';
import BigSmileImage from '../../Traits/Mouth/big-smile.png';
import HappyImage from '../../Traits/Mouth/happy.png';
import PearlyTeethImage from '../../Traits/Mouth/pearly-teeth.png';
import SmileImage from '../../Traits/Mouth/smile.png';
import SmileyTongueImage from '../../Traits/Mouth/smiley-tongue.png';
import TobaccoPipeImage from '../../Traits/Mouth/tobacco-pipe.png';
import TongueOutImage from '../../Traits/Mouth/tongue-out.png';

//Eye Options
import hypnotizeEyesImage from '../../Traits/Eyes/hypnotize-eyes.png';
import rainbowspiraleyesImage from '../../Traits/Eyes/rainbowspiraleyes.png';
import doubleeyesImage from '../../Traits/Eyes/double-eyes.png';
import yellowEyesImage from '../../Traits/Eyes/yellowEyes.png';
import blackEyesImage from '../../Traits/Eyes/blackEyes.png';
import blueEyesImage from '../../Traits/Eyes/blue-spirals.png';
import GoldEyesImage from '../../Traits/Eyes/goldeyes.png';
import GreenSpiralsImage from '../../Traits/Eyes/green-spirals.png';
import WhiteEyesImage from '../../Traits/Eyes/White-Eyes.png';
import YellowSpiralsImage from '../../Traits/Eyes/yellow-spirals.png';

//Body Options
import robotBodyImage from '../../Traits/Body/robotBody.png';
import originalBodyImage from '../../Traits/Body/Birthday-suit.png';
import greenBodyImage from '../../Traits/Body/greenbody.png';
import goldTuxedoImage from '../../Traits/Body/gold-suit.png';
import old1800sOutfitImage from '../../Traits/Body/1800s.png';
import AlienHoodieImage from '../../Traits/Body/Alien-hoodie.png';
import BlueBodyImage from '../../Traits/Body/Blue-body.png';
import ChefsCoatImage from '../../Traits/Body/chefs-coat.png';
import ClownOutfitImage from '../../Traits/Body/Clown.png';
import ConstructionOutfitImage from '../../Traits/Body/construction.png';
import FireFighterImage from '../../Traits/Body/Fire-fighter.png';
import GreenBodyImage from '../../Traits/Body/greenbody.png';
import GreyBodyImage from '../../Traits/Body/Grey-body.png';
import MonkeyTorsoImage from '../../Traits/Body/monkey-torso.png';
import NativeOutfitImage from '../../Traits/Body/Native.png';
import PeaceSignArmyGuyImage from '../../Traits/Body/Peace-sign-army-guy.png';
import PoliceUniformImage from '../../Traits/Body/Police-uniform.png';
import PrincessDressImage from '../../Traits/Body/princess-dress.png';
import PrisonJumpsuitImage from '../../Traits/Body/prison-jumpsuit.png';
import PsychoChibiImage from '../../Traits/Body/Psycho-Chibi.png';
import RainCoatImage from '../../Traits/Body/RainCoat.png';
import RedBodyImage from '../../Traits/Body/red-body.png';
import RobeImage from '../../Traits/Body/Robe.png';
import SamarauiOutFitImage from '../../Traits/Body/Samaraui.png';
import SGBHoodieImage from '../../Traits/Body/SGB-hoodie.png';
import SkeletonImage from '../../Traits/Body/Skeleton.png';
import SpaceSuitImageImage from '../../Traits/Body/Space-suit.png';
import UnicornOnsieImage from '../../Traits/Body/unicorn-onsie.png';
import WhiteTuxedoImage from '../../Traits/Body/white-tux.png';


//Back Options
import AKImage from '../../Traits/Back Accessories/ak-47.png';
import AngelWingsImage from '../../Traits/Back Accessories/Angel-wings.png';
import RocketLauncherImage from '../../Traits/Back Accessories/Rocket-Launcher.png';
import SongbirdSluggerImage from '../../Traits/Back Accessories/Songbird-Slugger.png';
import UnicornAKImage from '../../Traits/Back Accessories/Unicorn-AK.png';

//Background Options
import pinkGradientbgImage from '../../Traits/Background/pinkGradientbg.jpg';
import greenGradientbgImage from '../../Traits/Background/greenGradientbg.jpg';
import blueGradientbgImage from '../../Traits/Background/blueGradientbg.jpg';
import yellowGradientbgImage from '../../Traits/Background/yellowGradientbg.jpg';
import DottedSwirlsImage from '../../Traits/Background/dotted swirls.jpg';
import FoilImage from '../../Traits/Background/Foil.jpg';
import IllusionImage from '../../Traits/Background/illusion.jpg';
import IllusionSpinningImage from '../../Traits/Background/illusion spinning.jpg';
import OrangeGradientImage from '../../Traits/Background/orange.jpg';
import PurpleWavesImage from '../../Traits/Background/purple waves.jpg';





const HatOptions = {
    Kitty: 0,
    Beanie: 1,
    Toad: 2,
    Spinnycap: 3,
    Mohawk: 4,
    Samurai: 5,
    AlienAntennaas: 6,
    AstronuaghtHelmet: 7,
    BlackHair: 8,
    ClownHat: 9,
    ConstructionHat: 10,
    DevilHorns: 11,
    FirefighterHelmet: 12,
    GoldenPoo: 13,
    GreySGBBeanie: 14,
    Halo: 15,
    Headderess: 16,
    Headphones: 17,
    HippyBucketHat: 18,
    KingsCrown: 19,
    NFTCap: 20,
    NFTSongbirdBeanie: 21,
    PirateHat: 22,
    PoliceHat: 23,
    PrincessCrown: 24,
    SGBTopHat: 25,
    Sombero: 26,
    SongBird: 27,
    UnicornHorn: 28,
    VikingHelmet: 29,
    // ... other hats



  };

  const AccessoriesOptions = {
    Bandana: 0,
    EyePatch: 1,
    FlareTattoo: 2,
    LolliPop: 3,
    PyschoFlower: 4,
    PsychoGemStaff: 5,
    PyschoGem: 6,
    // ... other accessories
  };




    const HeadOptions = {
    OriginalHead: 0,
    GreenAlienHead: 1,
    HumanoidHead: 2,
    RobotHead: 3,
    AlienHead: 4,
    GoldHead: 5,
    MonkeyHead: 6,
    BlueHead: 7,
    GreenHead: 8,
    RedHead: 9,
    Skull: 10,
    ZombieHead: 11,

 
    
    };

    const MouthOptions = {
    VampireMouth: 0,
    Butter: 1,
    BigSmile: 2,
    Happy: 3,
    PearlyTeeth: 4,
    Smile: 5,
    SmileyTongue: 6,
    TobaccoPipe: 7,
    TongueOut: 8,

      
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
    YellowSpirals: 9,
    
   

    };

    const BodyOptions = {
    RobotBody: 0,
    OriginalBody: 1,
    GreenBody: 2,
    GoldTuxedo: 3,
    Old1800sOutfit: 4,
    AlienHoodie: 5,
    BlueBody: 6,
    ChefsCoat: 7,
    ClownOutfit: 8,
    ConstructionOutfit: 9,
    FireFighter: 10,
    GreyBody: 11,
    MonkeyTorso: 12,
    NativeOutfit: 13,
    PeaceSignArmyGuy: 14,
    PoliceUniform: 15,
    PrincessDress: 16,
    PrisonJumpsuit: 17,
    PsychoChibi: 18,
    RainCoat: 19,
    RedBody: 20,
    Robe: 21,
    SamarauiOutFit: 22,
    SGBHoodie: 23,
    Skeleton: 24,
    SpaceSuit: 25,
    UnicornOnsie: 26,
    WhiteTuxedo: 27,
    // ... other bodies
    };


    const BackOptions = {
    AK: 0,
    AngelWings: 1,
    RocketLauncher: 2,
    SongbirdSlugger: 3,
    UnicornAK: 4,
    // ... other backs
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
    OrangeGradient: 8,
    PurpleWaves: 9,


    };

    // Create a traitOptions object
const traitOptions = {
    hatOptions: Object.values(HatOptions),
    accessoriesOptions: Object.values(AccessoriesOptions),
    headOptions: Object.values(HeadOptions),
    mouthOptions: Object.values(MouthOptions),
    eyeColorOptions: Object.values(EyeColorOptions),
    bodyOptions: Object.values(BodyOptions),
    backOptions: Object.values(BackOptions),
    backgroundOptions: Object.values(BackgroundOptions),
  };

  const traitImages = {
    hatOptions: [KittyImage, SGBbeanieImage, toadImage, spinnycapImage, mohawkImage, SamarauiImage, AlienAntennaasImage, AstronuaghtHelmetImage, BlackHairImage, ClownHatImage, ConstructionHatImage, DevilHornsImage, FirefighterHelmetImage, GoldenPooImage, GreySGBBeanieImage, HaloImage, HeadderessImage, HeadphonesImage, HippyBucketHatImage, KingsCrownImage, NFTCapImage, NFTSongbirdBeanieImage, PirateHatImage, PoliceHatImage, PrincessCrownImage, SGBTopHatImage, SomberoImage, SongBirdImage, UnicornHornImage, VikingHelmetImage],
    accessoriesOptions: [BandanaImage, EyePatchImage, FlareTattooImage, LolliPopImage, PyschoFlowerImage, PsychoGemStaffImage, PyschoGemImage],
    headOptions: [originalHeadImage, GreenAlienHeadImage, humanoidHeadImage, robotHeadImage, alienHeadImage, goldHeadImage, monkeyImage, BlueHeadImage, GreenHeadImage, RedHeadImage, SkullImage, ZombieHeadImage],
    mouthOptions: [vampiremouthImage, butterImage, BigSmileImage, HappyImage, PearlyTeethImage, SmileImage, SmileyTongueImage, TobaccoPipeImage, TongueOutImage],
    eyeColorOptions: [hypnotizeEyesImage, rainbowspiraleyesImage, doubleeyesImage, yellowEyesImage, blackEyesImage, blueEyesImage, GoldEyesImage, GreenSpiralsImage, WhiteEyesImage, YellowSpiralsImage],
    bodyOptions: [robotBodyImage, originalBodyImage, greenBodyImage, goldTuxedoImage, old1800sOutfitImage, AlienHoodieImage, BlueBodyImage, ChefsCoatImage, ClownOutfitImage, ConstructionOutfitImage, FireFighterImage, GreenBodyImage, GreyBodyImage, MonkeyTorsoImage, NativeOutfitImage, PeaceSignArmyGuyImage, PoliceUniformImage, PrincessDressImage, PrisonJumpsuitImage, PsychoChibiImage, RainCoatImage, RedBodyImage, RobeImage, SamarauiOutFitImage, SGBHoodieImage, SkeletonImage, SpaceSuitImageImage, UnicornOnsieImage, WhiteTuxedoImage],
    backOptions: [AKImage, AngelWingsImage, RocketLauncherImage, SongbirdSluggerImage, UnicornAKImage],
    backgroundOptions: [pinkGradientbgImage, greenGradientbgImage, blueGradientbgImage, yellowGradientbgImage, DottedSwirlsImage, FoilImage, IllusionImage, IllusionSpinningImage, OrangeGradientImage, PurpleWavesImage]
  };

  const traitNames = {
    hatOptions: Object.keys(HatOptions),
    accessoriesOptions: Object.keys(AccessoriesOptions),
    headOptions: Object.keys(HeadOptions),
    mouthOptions: Object.keys(MouthOptions),
    eyeColorOptions: Object.keys(EyeColorOptions),
    bodyOptions: Object.keys(BodyOptions),
    backOptions: Object.keys(BackOptions),
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
    accessoriesOptions: [],
    headOptions: [],
    mouthOptions: [],
    eyeColorOptions: [],
    bodyOptions: [],
    backOptions: [],
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
          const accessoriesPrices = await Promise.all(traitOptions.accessoriesOptions.map((option) => contract.methods.getAccessoriesPrice(option).call()));
          const headPrices = await Promise.all(traitOptions.headOptions.map((option) => contract.methods.getHeadPrice(option).call()));
          const mouthPrices = await Promise.all(traitOptions.mouthOptions.map((option) => contract.methods.getMouthPrice(option).call()));
          const eyeColorPrices = await Promise.all(traitOptions.eyeColorOptions.map((option) => contract.methods.getEyeColorPrice(option).call()));
          const bodyPrices = await Promise.all(traitOptions.bodyOptions.map((option) => contract.methods.getBodyPrice(option).call()));
          const backPrices = await Promise.all(traitOptions.backOptions.map((option) => contract.methods.getBackPrice(option).call()));
          const backgroundPrices = await Promise.all(traitOptions.backgroundOptions.map((option) => contract.methods.getBackgroundPrice(option).call()));
      console.log(hatPrices, accessoriesPrices, headPrices, mouthPrices, eyeColorPrices, bodyPrices, backPrices, backgroundPrices);
          setTraitPrices({
            hatOptions: hatPrices,
            accessoriesOptions: accessoriesPrices,
            headOptions: headPrices,
            mouthOptions: mouthPrices,
            eyeColorOptions: eyeColorPrices,
            bodyOptions: bodyPrices,
            backOptions: backPrices,
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
            case 'accessoriesOptions':
              await contract.methods.purchaseAccessoriesTrait(traitEnumValue).send({ from: account });
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
      case 'backOptions':
        await contract.methods.purchaseBackTrait(traitEnumValue).send({ from: account });
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