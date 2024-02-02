import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
// Import your Chibifactory contract ABI
import ChibifactoryABI from '../../abi/abi.json'; // Replace with the actual ABI
import ERC20ABI from '../../abi/ERC20Abi.json'; // Replace with the actual ABI
import Swal from 'sweetalert2';



// Hat Traits
import kitty from '../../Traits/Hat/kitty.png';
import SGBbeanie from '../../Chibi-Traits/Hat/SGBbeanie.png';
import spinnycap from '../../Traits/Hat/spinnycap.png';
import mohawk from '../../Traits/Hat/mohawk.png';
import Samaraui from '../../Traits/Hat/samaraui.png';
import toad from '../../Chibi-Traits/Hat/toad.png';
import AlienAntennaas from '../../Traits/Hat/Alien-antennes.png';
import AstronuaghtHelmet from '../../Traits/Hat/Astronuaght-helmet.png';
import BlackHair from '../../Traits/Hat/black-hair.png';
import ClownHat from '../../Traits/Hat/clown-hat.png';
import ConstructionHat from '../../Traits/Hat/Construction-Hat.png';
import DevilHorns from '../../Traits/Hat/Devil-Horns.png';
import FirefighterHelmet from '../../Traits/Hat/firefighter-helmet.png';
import GoldenPoo from '../../Traits/Hat/golden poo.png';
import GreySGBBeanie from '../../Traits/Hat/grey-sgb-beanie.png';
import Halo from '../../Traits/Hat/halo.png';
import Headderess from '../../Traits/Hat/Headdress.png';
import Headphones from '../../Traits/Hat/headphones.png';
import HippyBucketHat from '../../Traits/Hat/Hippy-bucket-hat.png';
import KingsCrown from '../../Traits/Hat/Kings-Crown.png';
import NFTCap from '../../Traits/Hat/NFT-cap.png';
import NFTSongbirdBeanie from '../../Traits/Hat/NFT-SONGBIRD-BEANIE.png';
import PirateHat from '../../Traits/Hat/Pirate-hat.png';
import PoliceHat from '../../Traits/Hat/police-hat.png';
import PrincessCrown from '../../Traits/Hat/Princess-Crown.png';
import SGBTopHat from '../../Traits/Hat/sgb-top-hat.png';
import Sombero from '../../Traits/Hat/sombero.png';
import SongBird from '../../Traits/Hat/song bird.png';
import UnicornHorn from '../../Traits/Hat/Unicorn-Horn.png';
import VikingHelmet from '../../Traits/Hat/viking.png';

// Accessories
import Bandana from '../../Traits/Accessories/bandana.png';
import EyePatch from '../../Traits/Accessories/Eye-Patch.png';
import FlareTattoo from '../../Traits/Accessories/Flare-Tattoo.png';
import LolliPop from '../../Traits/Accessories/lolli-pop.png';
import PyschoFlower from '../../Traits/Accessories/Psycho-Flower.png';
import PsychoGemStaff from '../../Traits/Accessories/Psycho-Gem-Staff.png';
import PyschoGem from '../../Traits/Accessories/Psycho-Gem.png';

// Head Options
import originalHead from '../../Traits/Head/original.png';
import GreenAlienHead from '../../Traits/Head/Green-Alien.png';
import humanoidHead from '../../Traits/Head/humanoid.png';
import robotHead from '../../Traits/Head/robot.png';
import alienHead from '../../Traits/Head/alien.png';
import monkey from '../../Traits/Head/monkey.png';
import goldHead from '../../Traits/Head/goldHead.png';
import BlueHead from '../../Traits/Head/blueskin.png';
import GreenHead from '../../Traits/Head/green-skin.png';
import RedHead from '../../Traits/Head/red-skin.png';
import Skull from '../../Traits/Head/Skull.png';
import ZombieHead from '../../Traits/Head/ZombieHead.png';

// Mouth Options
import vampiremouth from '../../Traits/Mouth/Vampire-mouth.png';
import butter from '../../Traits/Mouth/butter.png';
import BigSmile from '../../Traits/Mouth/big-smile.png';
import Happy from '../../Traits/Mouth/happy.png';
import PearlyTeeth from '../../Traits/Mouth/pearly-teeth.png';
import Smile from '../../Traits/Mouth/smile.png';
import SmileyTongue from '../../Traits/Mouth/smiley-tongue.png';
import TobaccoPipe from '../../Traits/Mouth/tobacco-pipe.png';
import TongueOut from '../../Traits/Mouth/tongue-out.png';

// Eye Options
import hypnotizeEyes from '../../Traits/Eyes/hypnotize-eyes.png';
import rainbowspiraleyes from '../../Traits/Eyes/rainbowspiraleyes.png';
import doubleeyes from '../../Traits/Eyes/double-eyes.png';
import yellowEyes from '../../Traits/Eyes/yellowEyes.png';
import blackEyes from '../../Traits/Eyes/blackEyes.png';
import blueEyes from '../../Traits/Eyes/blue-spirals.png';
import GoldEyes from '../../Traits/Eyes/goldeyes.png';
import GreenSpirals from '../../Traits/Eyes/green-spirals.png';
import WhiteEyes from '../../Traits/Eyes/White-Eyes.png';
import YellowSpirals from '../../Traits/Eyes/yellow-spirals.png';

// Body Options
import robotBody from '../../Traits/Body/robotBody.png';
import originalBody from '../../Traits/Body/Birthday-suit.png';
import greenBody from '../../Traits/Body/greenbody.png';
import goldTuxedo from '../../Traits/Body/gold-suit.png';
import old1800sOutfit from '../../Traits/Body/1800s.png';
import AlienHoodie from '../../Traits/Body/Alien-hoodie.png';
import BlueBody from '../../Traits/Body/Blue-body.png';
import ChefsCoat from '../../Traits/Body/chefs-coat.png';
import ClownOutfit from '../../Traits/Body/Clown.png';
import ConstructionOutfit from '../../Traits/Body/construction.png';
import FireFighter from '../../Traits/Body/Fire-fighter.png';
import GreenBody from '../../Traits/Body/greenbody.png';
import GreyBody from '../../Traits/Body/Grey-body.png';
import MonkeyTorso from '../../Traits/Body/monkey-torso.png';
import NativeOutfit from '../../Traits/Body/Native.png';
import PeaceSignArmyGuy from '../../Traits/Body/Peace-sign-army-guy.png';
import PoliceUniform from '../../Traits/Body/Police-uniform.png';
import PrincessDress from '../../Traits/Body/princess-dress.png';
import PrisonJumpsuit from '../../Traits/Body/prison-jumpsuit.png';
import PsychoChibi from '../../Traits/Body/Psycho-Chibi.png';
import RainCoat from '../../Traits/Body/RainCoat.png';
import RedBody from '../../Traits/Body/red-body.png';
import Robe from '../../Traits/Body/Robe.png';
import SamarauiOutFit from '../../Traits/Body/Samaraui.png';
import SGBHoodie from '../../Traits/Body/SGB-hoodie.png';
import Skeleton from '../../Traits/Body/Skeleton.png';
import SpaceSuit from '../../Traits/Body/Space-suit.png';
import UnicornOnsie from '../../Traits/Body/unicorn-onsie.png';
import WhiteTuxedo from '../../Traits/Body/white-tux.png';
import PicklesWarfare from '../../Traits/Body/PicklesWarfare.png';

// Back Options
import AK from '../../Traits/Back Accessories/ak-47.png';
import AngelWings from '../../Traits/Back Accessories/Angel-wings.png';
import RocketLauncher from '../../Traits/Back Accessories/Rocket-Launcher.png';
import SongbirdSlugger from '../../Traits/Back Accessories/Songbird-Slugger.png';
import UnicornAK from '../../Traits/Back Accessories/Unicorn-AK.png';

// Background Options
import pinkGradientbg from '../../Traits/Background/pinkGradientbg.jpg';
import greenGradientbg from '../../Traits/Background/greenGradientbg.jpg';
import blueGradientbg from '../../Traits/Background/blueGradientbg.jpg';
import yellowGradientbg from '../../Traits/Background/yellowGradientbg.jpg';
import DottedSwirls from '../../Traits/Background/dotted swirls.jpg';
import Foil from '../../Traits/Background/Foil.jpg';
import Illusion from '../../Traits/Background/illusion.jpg';
import IllusionSpinning from '../../Traits/Background/illusion spinning.jpg';
import OrangeGradient from '../../Traits/Background/orange.jpg';
import PurpleWaves from '../../Traits/Background/purple waves.jpg';

import BN from 'bn.js';











const traitImageMap = {
    hatOptions: {
        "0": kitty, "1": SGBbeanie, "2": toad, "3": spinnycap, "4": mohawk, "5": Samaraui, "6": AlienAntennaas, "7": AstronuaghtHelmet, "8": BlackHair, "9": ClownHat, "10": ConstructionHat, "11": DevilHorns, "12": FirefighterHelmet, "13": GoldenPoo, "14": GreySGBBeanie, "15": Halo, "16": Headderess, "17": Headphones, "18": HippyBucketHat, "19": KingsCrown, "20": NFTCap, "21": NFTSongbirdBeanie, "22": PirateHat, "23": PoliceHat, "24": PrincessCrown, "25": SGBTopHat, "26": Sombero, "27": SongBird, "28": UnicornHorn, "29": VikingHelmet // ... other hats
    },
    accessoriesOptions: {
        "0": Bandana, "1": EyePatch, "2": FlareTattoo, "3": LolliPop, "4": PyschoFlower, "5": PsychoGemStaff, "6": PyschoGem // ... other accessories
    },
    headOptions: {
        "0": originalHead, "1": GreenAlienHead, "2": humanoidHead, "3": robotHead, "4": alienHead, "5": goldHead, "6": monkey, "7": BlueHead, "8": GreenHead, "9": RedHead, "10": Skull, "11": ZombieHead // ... other heads
    },
    mouthOptions: {
        "0": vampiremouth, "1": butter, "2": BigSmile, "3": Happy, "4": PearlyTeeth, "5": Smile, "6": SmileyTongue, "7": TobaccoPipe, "8": TongueOut // ... other mouths
    },
    eyeColorOptions: {
        "0": hypnotizeEyes, "1": rainbowspiraleyes, "2": doubleeyes, "3": yellowEyes, "4": blackEyes, "5": blueEyes, "6": GoldEyes, "7": GreenSpirals, "8": WhiteEyes, "9": YellowSpirals // ... other eye colors
    },
    bodyOptions: {
        "0": robotBody, "1": originalBody,"2": greenBody, "3": goldTuxedo, "4": old1800sOutfit, "5": AlienHoodie, "6": BlueBody, "7": ChefsCoat, "8": ClownOutfit, "9": ConstructionOutfit, "10": FireFighter, "11": GreenBody, "12": GreyBody, "13": MonkeyTorso, "14": NativeOutfit, "15": PeaceSignArmyGuy, "16": PoliceUniform, "17": PrincessDress, "18": PrisonJumpsuit, "19": PsychoChibi, "20": RainCoat, "21": RedBody, "22": Robe, "23": SamarauiOutFit, "24": SGBHoodie, "25": Skeleton, "26": SpaceSuit, "27": UnicornOnsie, "28": WhiteTuxedo, "29": PicklesWarfare // ... other bodies
    },
    backOptions: {
        "0": AK, "1": AngelWings, "2": RocketLauncher, "3": SongbirdSlugger, "4": UnicornAK // ... other backs
    },

    backgroundOptions: {
        "0": pinkGradientbg, "1": greenGradientbg, "2": blueGradientbg, "3": yellowGradientbg, "4": DottedSwirls, "5": Foil, "6": Illusion, "7": IllusionSpinning, "8": OrangeGradient, "9": PurpleWaves // ... other backgrounds
    }
};


  // Define a mapping from indices to descriptive names
  const traitNames = {
    hatOptions: ["Kitty", "SGB Beanie", "Toad", "Spinnycap", "Mohawk", "Samaraui", "Alien Antennaas", "Astronuaght Helmet", "Black Hair", "Clown Hat", "Construction Hat", "Devil Horns", "Firefighter Helmet", "Golden Poo", "Grey SGB Beanie", "Halo", "Headderess", "Headphones", "Hippy Bucket Hat", "Kings Crown", "NFT Cap", "NFT Songbird Beanie", "Pirate Hat", "Police Hat", "Princess Crown", "SGB Top Hat", "Sombero", "Song Bird", "Unicorn Horn", "Viking Helmet"],
    accessoriesOptions: ["Bandana", "Eye Patch", "Flare Tattoo", "Lolli Pop", "Psycho Flower", "Psycho Gem Staff", "Psycho Gem"],
    headOptions: ["Original Head", "Green Alien Head", "Humanoid Head", "Robot Head", "Alien Head", "Gold Head", "Monkey", "Blue Head", "Green Head", "Red Head", "Skull", "Zombie Head"],
    mouthOptions: ["Vampire Mouth", "Butter", "Big Smile", "Happy", "Pearly Teeth", "Smile", "Smiley Tongue", "Tobacco Pipe", "Tongue Out"],
    eyeColorOptions: ["Hypnotize Eyes", "Rainbow Spiral Eyes", "Double Eyes", "Yellow Eyes", "Black Eyes", "Blue Spirals", "Gold Eyes", "Green Spirals", "White Eyes", "Yellow Spirals"],
    bodyOptions: ["Robot Body", "Original Body", "Green Body", "Gold Tuxedo", "Old 1800s Outfit", "Alien Hoodie", "Blue Body", "Chefs Coat", "Clown Outfit", "Construction Outfit", "Fire Fighter", "Green Body", "Grey Body", "Monkey Torso", "Native Outfit", "Peace Sign Army Guy", "Police Uniform", "Princess Dress", "Prison Jumpsuit", "Psycho Chibi", "Rain Coat", "Red Body", "Robe", "Samaraui Outfit", "SGB Hoodie", "Skeleton", "Space Suit", "Unicorn Onsie", "White Tuxedo", "Pickles Warfare"],
    backOptions: ["AK", "Angel Wings", "Rocket Launcher", "Songbird Slugger", "Unicorn AK"],
    backgroundOptions: ["Pink Gradient", "Green Gradient", "Blue Gradient", "Yellow Gradient", "Dotted Swirls", "Foil", "Illusion", "Illusion Spinning", "Orange Gradient", "Purple Waves"]
  };


  
const StoreFront = styled.div`
  background-size: cover;
background-color: #333;
  background-repeat: no-repeat;
  padding: 20px;
  text-align: center;
  color: #fff;
  width: 100%;  
  font-family: Arial, sans-serif;
`;

const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TraitSelect = styled.select`
  background-color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  padding: 10px;
  margin-right: 10px;
`;

const PurchaseButton = styled.button`
  background-color: #f37506;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  padding: 10px 20px;
  cursor: pointer;
`;

const TraitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;


const traitTypeToNumber = {
  'hatOptions': 0,
  'accessoriesOptions': 1,
  'headOptions': 2,
  'mouthOptions': 3,
  'eyeColorOptions': 4,
  'bodyOptions': 5,
  'backOptions': 6,
  'backgroundOptions': 7,
  // ... other mappings
};




// Assuming the contract address is constant
const CONTRACT_ADDRESS = "0xa63d0F4b62a5E80Cefd6670A38aA09bE5e1C3Add";


const TraitCard = ({ image, name, supply, price, onPurchase, traitTypeNumber, optionNumber }) => {
  const handlePurchase = () => {
    onPurchase(traitTypeNumber, optionNumber);
  };

  return (
    <Card>
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>Supply: {supply !== undefined ? supply.toString() : 'Loading...'}</p>
      <p>Price: {price !== undefined ? price.toString() : 'Loading...'}</p>
      <PurchaseButton onClick={handlePurchase}>Purchase</PurchaseButton>
    </Card>
  );
};
// Styled component for the cards
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const TraitStore = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [selectedTraitType, setSelectedTraitType] = useState('hatOptions');
  const [selectedOption, setSelectedOption] = useState('0');
  const [traitData, setTraitData] = useState({});
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const chibifactoryContract = new web3Instance.eth.Contract(
          ChibifactoryABI,
          CONTRACT_ADDRESS
        );
        setContract(chibifactoryContract);
        await fetchAllTraitData(chibifactoryContract); // Pass the contract to the function
      } else {
        alert('Please install MetaMask to use this feature.');
      }
    };
  
    init(); // Call the async init function
  }, []);
  
  const fetchAllTraitData = async (contract) => {
    const allTraitData = {};
    for (const traitType in traitTypeToNumber) {
      const traitTypeNumber = traitTypeToNumber[traitType];
      for (const optionKey in traitImageMap[traitType]) {
        try {
          const optionNumber = parseInt(optionKey);
          const result = await contract.methods.getTraitSupplyAndPrice(traitTypeNumber, optionNumber).call();
          allTraitData[`${traitTypeNumber}-${optionNumber}`] = {
            supply: parseInt(result.supply), // Convert to number
            price: parseInt(result.price) // Convert to number
          };
        } catch (error) {
          console.error(`Error fetching data for trait type number: ${traitTypeNumber}, option key: ${optionKey}`, error);
        }
      }
    }
    setTraitData(allTraitData);
  };

  const traitOptions = Object.keys(traitImageMap);

  const handleTraitTypeChange = (event) => {
    const newTraitType = event.target.value;
    setSelectedTraitType(newTraitType);
    const firstOptionKey = Object.keys(traitImageMap[newTraitType])[0];
    setSelectedOption(firstOptionKey);
    console.log(`Trait type change - New trait type: ${newTraitType}, Mapped number: ${traitTypeToNumber[newTraitType]}, First option key: ${firstOptionKey}`);
    fetchTraitData(traitTypeToNumber[newTraitType], firstOptionKey);
  };
  

  const fetchTraitData = async (traitTypeNumber, optionKey) => {
    console.log(`Fetching data for trait type number: ${traitTypeNumber}, option key: ${optionKey}`);
    try {
      const optionNumber = parseInt(optionKey);
      const result = await contract.methods.getTraitSupplyAndPrice(traitTypeNumber, optionNumber).call();
      console.log(`Result for trait type number: ${traitTypeNumber}, option number: ${optionNumber}`, result);
      // Update the state with new data for the trait option
      setTraitData(prevData => ({
        ...prevData,
        [`${traitTypeNumber}-${optionNumber}`]: {
          supply: result.supply,
          price: result.price
        }
      }));
    } catch (error) {
      console.error('Error fetching trait data:', error);
    }
  };

  const checkAllowance = async (owner, spender) => {
    const erc20ContractAddress = '0x573496D483942dd90974d94FFA0499B432d8d196';
    const erc20Contract = new web3.eth.Contract(ERC20ABI, erc20ContractAddress);
  
    try {
      const allowance = await erc20Contract.methods.allowance(owner, spender).call();
      return allowance;
    } catch (error) {
      console.error('Error checking allowance:', error);
      return '0';
    }
  };
  
  const approveTraitPurchase = async (spender, amount) => {
    try {
      setLoading(true);
  
      const erc20ContractAddress = '0x573496D483942dd90974d94FFA0499B432d8d196';
      const erc20Contract = new web3.eth.Contract(ERC20ABI, erc20ContractAddress);
  
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) throw new Error('No accounts found. Please connect with MetaMask.');
  
      const currentAllowance = await checkAllowance(accounts[0], spender);
      const requiredAmount = new BN(amount);
  
      if (new BN(currentAllowance).lt(requiredAmount)) {
        // Proceed with approval as current allowance is less than required
        await erc20Contract.methods.approve(spender, amount).send({ from: accounts[0] });
        console.log('Successfully approved trait purchase!');
      } else {
        console.log('Sufficient allowance already granted.');
      }
    } catch (error) {
      console.error('Error approving trait purchase:', error.message);
    } finally {
      setLoading(false);
    }
  };
    
  const purchaseTrait = async (traitTypeNumber, optionNumber) => {
    if (!web3 || !contract) return;
  
    try {
      setLoading(true);
      // Show spinner here
      Swal.fire({
        title: 'Processing...',
        html: 'Please wait while your transaction is being processed.',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      const accounts = await web3.eth.getAccounts();
      const traitKey = `${traitTypeNumber}-${optionNumber}`;
      const traitInfo = traitData[traitKey];
      if (!traitInfo) throw new Error('Trait info not found');
  
      // First approve the necessary amount
      await approveTraitPurchase(CONTRACT_ADDRESS, 1000);
  
      // Then make the purchase
      await contract.methods
        .purchaseTrait(traitTypeNumber, optionNumber)
        .send({ from: accounts[0] });
  
      // Display success alert with Sweet Alert 2
      Swal.fire({
        title: 'Success!',
        text: 'Trait purchased successfully!',
        icon: 'success',
        confirmButtonText: 'Cool'
      });
  
    } catch (error) {
      console.error('Error purchasing trait:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Error purchasing trait.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreFront>
      <Header>Trait Store</Header>
      <div>
        <TraitSelect value={selectedTraitType} onChange={handleTraitTypeChange}>
          {traitOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </TraitSelect>
     
      </div>
      <TraitGrid>
      {Object.keys(traitImageMap[selectedTraitType]).map((option) => {
        const traitKey = `${traitTypeToNumber[selectedTraitType]}-${option}`;
        const { supply, price } = traitData[traitKey] || {};
        return (
          <TraitCard
            key={option}
            image={traitImageMap[selectedTraitType][option]}
            name={traitNames[selectedTraitType][option]}
            supply={supply}
            price={price}
            onPurchase={purchaseTrait}
            traitTypeNumber={traitTypeToNumber[selectedTraitType]}
            optionNumber={parseInt(option)}
          />
        );
      })}
    </TraitGrid>
    </StoreFront>
  );
};

export default TraitStore;