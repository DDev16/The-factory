import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TraitCard from '../TraitStore/TraitCard';

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

const TraitStore = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Connect to Web3
    const connectToWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const chibifactoryContract = new web3Instance.eth.Contract(
          ChibifactoryABI,
          '0xB9dfCb4d6A8ff7be25C082380DE931A1f7F9c01c'
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

  const traitNames = {
    hatOptions: ["Kitty", "SGB Beanie", "Toad", "Spinnycap", "Mohawk", "Samurai"],
    headOptions: ["Original Head", "Green Alien Head", "Humanoid Head", "Robot Head", "Alien Head", "Gold Head", "Monkey"],
    mouthOptions: ["Vampire Mouth", "Butter"],
    eyeColorOptions: ["Hypnotize Eyes", "Rainbow Spiral Eyes", "Double Eyes", "Yellow Eyes", "Black Eyes", "Blue Eyes"],
    bodyOptions: ["Robot Body", "Original Body", "Green Body", "Gold Tuxedo"],
    backgroundOptions: ["Pink Gradient", "Green Gradient", "Blue Gradient", "Yellow Gradient"]
  };

  const traitImages = {
    Kitty: KittyImage,
    "SGB Beanie": BeanieImage,
    Toad: ToadImage,
    Spinnycap: SpinnycapImage,
    Mohawk: MohawkImage,
    Samurai: SamuraiImage,

    "Original Head": OriginalHeadImage,
    "Green Alien Head": AlienHeadImage,
    "Humanoid Head": HumanoidHeadImage,
    "Robot Head": RobotHeadImage,
    "Alien Head": AlienHeadImage,
    "Gold Head": GoldHeadImage,
    "Monkey": MonkeyHeadImage,

    "Vampire Mouth": VampireMouthImage,
    "Butter": ButterMouthImage,

    "Hypnotize Eyes": HypnotizeEyesImage,
    "Rainbow Spiral Eyes": RainbowSpiralEyesImage,
    "Double Eyes": DoubleEyesImage,
    "Yellow Eyes": YellowEyesImage,
    "Black Eyes": BlackEyesImage,
    "Blue Eyes": BlueEyesImage,

    "Robot Body": RobotBodyImage,
    "Original Body": OriginalBodyImage,
    "Green Body": GreenBodyImage,
    "Gold Tuxedo": GoldTuxedoImage,

    "Pink Gradient": PinkGradientImage,
    "Green Gradient": GreenGradientImage,
    "Blue Gradient": BlueGradientImage,
    "Yellow Gradient": YellowGradientImage,
  };

  const purchaseTrait = async (selectedTrait) => {
    try {
      setLoading(true);

      // Get the enum value for the selected trait
      const traitEnumValue = traitNames.hatOptions.indexOf(selectedTrait);

      // Replace the following line with the actual function to purchase a trait
      await contract.methods.purchaseHatTrait(traitEnumValue).send({ from: account });

      console.log(`Successfully purchased ${selectedTrait} trait!`);
    } catch (error) {
      console.error('Error purchasing trait:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Trait Store</h2>
      <p>Connected Account: {account}</p>

      {/* Display cards for each trait category */}
      {Object.keys(traitNames).map((traitType) => (
        <div key={traitType}>
          <h3>{traitType}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {traitNames[traitType].map((trait) => (
              <TraitCard
                key={trait}
                traitName={trait}
                traitImage={traitImages[trait]}
                purchaseTrait={() => purchaseTrait(trait)}
                loading={loading}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TraitStore;
