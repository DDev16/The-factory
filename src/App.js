import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AppContainer, Header, MainLayout, Sidebar, StyledOption, StyledTraitSelectionContainer, StyledSelect, TraitButton, ChibiCanvas, TraitStyle, StyledInput, StyledButton } from './Styles/StyledComponents.js';
import contractABI from './abi/abi.json';
import traitImageMap from './TraitMap.js';
import { StyledTextarea } from './Styles/StyledComponents.js';
import Navbar from './Components/Navbar.js';
import placeholderImage from './Images/factory.png';
import Info from './Components/Info.js';
import Parallax from './Components/parallax/newparallaxhero.js';
import Cloud from './Components/ReversedCloud/Cloud.js';
import TraitStore from './Components/TraitStore/TraitStore.js';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdGOTA4QjNBRDJGMDFGNjE2MjU1MTA0ODIwNjFmNTY5Mzc2QTg3MjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTI5MDE5ODQyMCwibmFtZSI6Ik5FV0VTVCJ9.FGtIrIhKhgSx-10iVlI4sM_78o7jSghZsG5BpqZ4xfA';

const createMetadataJSON = (imageCID, chibiTraits, nftName, nftDescription) => {

  
  // Define a mapping from indices to descriptive names
  const traitNames = {
    hatOptions: ["Kitty", "SGB Beanie", "Toad", "Spinnycap", "Mohawk", "Samaraui", "Alien Antennaas", "Astronuaght Helmet", "Black Hair", "Clown Hat", "Construction Hat", "Devil Horns", "Firefighter Helmet", "Golden Poo", "Grey SGB Beanie", "Halo", "Headderess", "Headphones", "Hippy Bucket Hat", "Kings Crown", "NFT Cap", "NFT Songbird Beanie", "Pirate Hat", "Police Hat", "Princess Crown", "SGB Top Hat", "Sombero", "Song Bird", "Unicorn Horn", "Viking Helmet"],
    accessoriesOptions: ["Bandana", "Eye Patch", "Flare Tattoo", "Lolli Pop", "Psycho Flower", "Psycho Gem Staff", "Psycho Gem"],
    headOptions: ["Original Head", "Green Alien Head", "Humanoid Head", "Robot Head", "Alien Head", "Gold Head", "Monkey", "Blue Head", "Green Head", "Red Head", "Skull", "Zombie Head"],
    mouthOptions: ["Vampire Mouth", "Butter", "Big Smile", "Happy", "Pearly Teeth", "Smile", "Smiley Tongue", "Tobacco Pipe", "Tongue Out"],
    eyeColorOptions: ["Hypnotize Eyes", "Rainbow Spiral Eyes", "Double Eyes", "Yellow Eyes", "Black Eyes", "Blue Spirals", "Gold Eyes", "Green Spirals", "White Eyes", "Yellow Spirals"],
    bodyOptions: ["Robot Body", "Original Body", "Green Body", "Gold Tuxedo", "Old 1800s Outfit", "Alien Hoodie", "Blue Body", "Chefs Coat", "Clown Outfit", "Construction Outfit", "Fire Fighter", "Green Body", "Grey Body", "Monkey Torso", "Native Outfit", "Peace Sign Army Guy", "Police Uniform", "Princess Dress", "Prison Jumpsuit", "Psycho Chibi", "Rain Coat", "Red Body", "Robe", "Samaraui Outfit", "SGB Hoodie", "Skeleton", "Space Suit", "Unicorn Onsie", "White Tuxedo"],
    backOptions: ["AK", "Angel Wings", "Rocket Launcher", "Songbird Slugger", "Unicorn AK"],
    backgroundOptions: ["Pink Gradient", "Green Gradient", "Blue Gradient", "Yellow Gradient", "Dotted Swirls", "Foil", "Illusion", "Illusion Spinning", "Orange Gradient", "Purple Waves"]
  };

  // Create an array of attributes based on the selected traits
  const attributes = Object.entries(chibiTraits).map(([traitType, traitValue]) => {
    // Find the index in the traitImageMap that corresponds to the traitValue
    const traitIndex = Object.keys(traitImageMap[traitType]).find(key => traitImageMap[traitType][key] === traitValue);

    // Use the index to get the descriptive name from the mapping
    const readableName = traitIndex !== undefined ? traitNames[traitType][traitIndex] : 'None';

    return {
      trait_type: traitType.replace('Options', ''), // Removing 'Options' from the trait type
      value: readableName
    };
  });

  // Return the metadata JSON
  return {
    name: nftName, // Use user-provided name
    description: nftDescription, // Use user-provided description
    image: `https://ipfs.io/ipfs/${imageCID}`,
    attributes: attributes
  };
};




const uploadMetadata = async (metadata) => {
  const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('file', metadataBlob);

  const response = await fetch('https://api.nft.storage/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`, // Your API key
    },
    body: formData,
  });

  const result = await response.json();
  return result.value.cid; // Metadata CID
};

const createCompositeImage = async (traits) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; // Set the desired dimensions
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Order of traits as they should appear on the canvas
  const traitOrder = ['backgroundOptions', 'backOptions', 'bodyOptions', 'eyeColorOptions', 'headOptions', 'mouthOptions', 'accessoriesOptions', 'hatOptions'];

  for (const traitType of traitOrder) {
    const image = new Image();
    image.src = traits[traitType];
    await new Promise((resolve) => {
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve();
      };
    });
  }

  return canvas.toDataURL(); // This is your composite image in base64 format
};


const uploadToNFTStorage = async (compositeImage) => {
  // Convert base64 to blob with explicit content type
  const fetchResponse = await fetch(compositeImage);
  const blob = await fetchResponse.blob();

  // Create a new blob with the correct content type
  const imageBlob = new Blob([blob], { type: 'image/png' });

  // Upload to nft.storage
  const formData = new FormData();
  formData.append('file', imageBlob);

  const uploadResponse = await fetch('https://api.nft.storage/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`, // Your API key
    },
    body: formData,
  });

  const uploadResult = await uploadResponse.json();
  return uploadResult.value.cid; // This is the CID of the uploaded image
};



const traitNames = {
  hatOptions: ["Kitty", "SGB Beanie", "Toad", "Spinnycap", "Mohawk", "Samaraui", "Alien Antennaas", "Astronuaght Helmet", "Black Hair", "Clown Hat", "Construction Hat", "Devil Horns", "Firefighter Helmet", "Golden Poo", "Grey SGB Beanie", "Halo", "Headderess", "Headphones", "Hippy Bucket Hat", "Kings Crown", "NFT Cap", "NFT Songbird Beanie", "Pirate Hat", "Police Hat", "Princess Crown", "SGB Top Hat", "Sombero", "Song Bird", "Unicorn Horn", "Viking Helmet"],
  accessoriesOptions: ["Bandana", "Eye Patch", "Flare Tattoo", "Lolli Pop", "Psycho Flower", "Psycho Gem Staff", "Psycho Gem"],
  headOptions: ["Original Head", "Green Alien Head", "Humanoid Head", "Robot Head", "Alien Head", "Gold Head", "Monkey", "Blue Head", "Green Head", "Red Head", "Skull", "Zombie Head"],
  mouthOptions: ["Vampire Mouth", "Butter", "Big Smile", "Happy", "Pearly Teeth", "Smile", "Smiley Tongue", "Tobacco Pipe", "Tongue Out"],
  eyeColorOptions: ["Hypnotize Eyes", "Rainbow Spiral Eyes", "Double Eyes", "Yellow Eyes", "Black Eyes", "Blue Spirals", "Gold Eyes", "Green Spirals", "White Eyes", "Yellow Spirals"],
  bodyOptions: ["Robot Body", "Original Body", "Green Body", "Gold Tuxedo", "Old 1800s Outfit", "Alien Hoodie", "Blue Body", "Chefs Coat", "Clown Outfit", "Construction Outfit", "Fire Fighter", "Green Body", "Grey Body", "Monkey Torso", "Native Outfit", "Peace Sign Army Guy", "Police Uniform", "Princess Dress", "Prison Jumpsuit", "Psycho Chibi", "Rain Coat", "Red Body", "Robe", "Samaraui Outfit", "SGB Hoodie", "Skeleton", "Space Suit", "Unicorn Onsie", "White Tuxedo"],
  backOptions: ["AK", "Angel Wings", "Rocket Launcher", "Songbird Slugger", "Unicorn AK"],
  backgroundOptions: ["Pink Gradient", "Green Gradient", "Blue Gradient", "Yellow Gradient", "Dotted Swirls", "Foil", "Illusion", "Illusion Spinning", "Orange Gradient", "Purple Waves"]
};


const contractAddress = '0xe7209f2D56F6bAe8C86380f633D3B4819d8E9AA1';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [nftName, setNftName] = useState(''); // State for NFT name
  const [nftDescription, setNftDescription] = useState(''); // State for NFT description
  const [tokenId, setTokenId] = useState(''); // State for tokenId
  const [isTraitSelected, setIsTraitSelected] = useState(false); // New state
   const [chibiTraits, setChibiTraits] = useState({
    hatOptions: null,
    accessoriesOptions: null,
    headOptions: null,
    mouthOptions: null,
    eyeColorOptions: null,
    bodyOptions: null,
    backOptions: null,
    backgroundOptions: null,
  });


 

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const chibiFactoryContract = new web3Instance.eth.Contract(contractABI, contractAddress);
      setContract(chibiFactoryContract);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.requestAccounts(); // Requesting account access
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const chibiFactoryContract = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(chibiFactoryContract);
        } else {
          console.error("No accounts found");
        }
      } catch (error) {
        console.error("Error connecting to wallet", error);
      }
    } else {
      console.error("Ethereum wallet not detected");
    }
  };

  const updateNFTMetadata = async (tokenId, metadataCID) => {
    if (!contract) return;
  
    const newTokenURI = `https://ipfs.io/ipfs/${metadataCID}`;
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.updateTokenURI(tokenId, newTokenURI).send({ from: accounts[0] });
      console.log(`Token URI updated for tokenId ${tokenId}`);
    } catch (error) {
      console.error('Failed to update token URI', error);
    }
  };
  

  const mintNFT = async () => {
    if (!contract) return;
    
    // Convert selected traits to the format expected by the smart contract
    const traitTypes = ['hatOptions', 'accessoriesOptions', 'headOptions', 'mouthOptions', 'eyeColorOptions', 'bodyOptions','backOptions', 'backgroundOptions'];
    const selectedTraits = traitTypes.map((traitType, index) => {
      // Get the keys (indices) of the selected trait values
      const selectedKey = Object.keys(traitImageMap[traitType]).find(key => traitImageMap[traitType][key] === chibiTraits[traitType]);
      return selectedKey !== undefined ? { traitType: index, option: parseInt(selectedKey) } : null;
    }).filter(trait => trait !== null);

    // Convert the object array to an array of arrays (tuples)
    const traitsArray = selectedTraits.map(trait => [trait.traitType, trait.option]);

    try {
      // Create the composite image
      const compositeImage = await createCompositeImage(chibiTraits);
  
      // Upload the image to nft.storage and get the image CID
      const imageCID = await uploadToNFTStorage(compositeImage);
      console.log(`Image uploaded to nft.storage with CID: ${imageCID}`);
  
      // Create metadata using the image CID
      const metadata = createMetadataJSON(imageCID, chibiTraits, nftName, nftDescription);
  
      // Upload the metadata to nft.storage and get the metadata CID
      const metadataCID = await uploadMetadata(metadata);
      console.log(`Metadata uploaded to nft.storage with CID: ${metadataCID}`);
  
      // Call the mintNFT function of the contract
      const accounts = await web3.eth.getAccounts();
      const mintTransaction = await contract.methods.mintNFT(traitsArray).send({ from: accounts[0] });
  
      // Retrieve the tokenId from the transaction
      const tokenId = mintTransaction.events.MintNFT.returnValues.tokenId;
      console.log(`NFT minted with tokenId ${tokenId}`);
  
      // Update NFT metadata
      await updateNFTMetadata(tokenId, metadataCID);
      console.log('Token URI updated!');
    } catch (error) {
      console.error('Minting failed', error);
    }
};


const updateTokenTraitsAndMetadata = async () => {
  if (!contract) return;

  const traitIndices = {
    hat: Object.keys(traitImageMap.hatOptions).find(key => traitImageMap.hatOptions[key] === chibiTraits.hatOptions),
    accessories: Object.keys(traitImageMap.accessoriesOptions).find(key => traitImageMap.accessoriesOptions[key] === chibiTraits.accessoriesOptions),
    head: Object.keys(traitImageMap.headOptions).find(key => traitImageMap.headOptions[key] === chibiTraits.headOptions),
    mouth: Object.keys(traitImageMap.mouthOptions).find(key => traitImageMap.mouthOptions[key] === chibiTraits.mouthOptions),
    eyeColor: Object.keys(traitImageMap.eyeColorOptions).find(key => traitImageMap.eyeColorOptions[key] === chibiTraits.eyeColorOptions),
    body: Object.keys(traitImageMap.bodyOptions).find(key => traitImageMap.bodyOptions[key] === chibiTraits.bodyOptions),
    back: Object.keys(traitImageMap.backOptions).find(key => traitImageMap.backOptions[key] === chibiTraits.backOptions),
    background: Object.keys(traitImageMap.backgroundOptions).find(key => traitImageMap.backgroundOptions[key] === chibiTraits.backgroundOptions),
  };

  try {
    // Create the composite image
    const compositeImage = await createCompositeImage(chibiTraits);

    // Upload the image to nft.storage and get the image CID
    const imageCID = await uploadToNFTStorage(compositeImage);
    console.log(`Image uploaded to nft.storage with CID: ${imageCID}`);

    // Create metadata using the image CID
    const metadata = createMetadataJSON(imageCID, chibiTraits, nftName, nftDescription);

    // Upload the metadata to nft.storage and get the metadata CID
    const metadataCID = await uploadMetadata(metadata);
  console.log(`Metadata uploaded to nft.storage with CID: ${metadataCID}`);

  const accounts = await web3.eth.getAccounts();
    const updateTransaction = await contract.methods.updateTraits(
      tokenId, // Use the state variable 'tokenId'
      traitIndices.hat, 
      traitIndices.accessories,
      traitIndices.head, 
      traitIndices.mouth, 
      traitIndices.eyeColor, 
      traitIndices.body, 
      traitIndices.back,
      traitIndices.background
    ).send({ from: accounts[0] });

    const updatedTokenId = updateTransaction.events.TraitSwapped.returnValues.tokenId;
    console.log(`NFT updated with tokenId ${updatedTokenId}`);

    await updateNFTMetadata(updatedTokenId, metadataCID);
    console.log('Token URI updated!');
  } catch (error) {
    console.error('Update failed', error);
  }
};


  
const updateTrait = (traitType, value) => {
  setChibiTraits(prevTraits => ({
    ...prevTraits,
    [traitType]: traitImageMap[traitType][value],
  }));
  setIsTraitSelected(true); // Update the state to true when a trait is selected
};


  return (
    
    <AppContainer style={{ width: '100%'}}>
        <Navbar/>


 <Parallax/>
<Cloud/>
      <Info />
         <MainLayout>
         <ChibiDisplay traits={chibiTraits} />

        <Sidebar>
        <Header style={{top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'}}> Trait Selection</Header>  

        <TraitSelection 
  traitType="hatOptions" 
  options={Object.keys(traitImageMap.hatOptions)} 
  updateTrait={updateTrait} 
  label="Hat" 
  traitNames={traitNames} 
/>
<TraitSelection 
  traitType="accessoriesOptions"
  options={Object.keys(traitImageMap.accessoriesOptions)}
  updateTrait={updateTrait}
  label="Accessories"
  traitNames={traitNames}
/>

<TraitSelection
  traitType="headOptions"
  options={Object.keys(traitImageMap.headOptions)}
  updateTrait={updateTrait}
  label="Head"
  traitNames={traitNames}
/>
<TraitSelection
  traitType="mouthOptions"
  options={Object.keys(traitImageMap.mouthOptions)}
  updateTrait={updateTrait}
  label="Mouth"
  traitNames={traitNames}
/>
<TraitSelection
  traitType="eyeColorOptions"
  options={Object.keys(traitImageMap.eyeColorOptions)}
  updateTrait={updateTrait}
  label="Eye Color"
  traitNames={traitNames}
/>
<TraitSelection

  traitType="bodyOptions"
  options={Object.keys(traitImageMap.bodyOptions)}
  updateTrait={updateTrait}
  label="Body"
  traitNames={traitNames}
/>
<TraitSelection
  traitType="backOptions"
  options={Object.keys(traitImageMap.backOptions)}
  updateTrait={updateTrait}
  label="Back"
  traitNames={traitNames}
/>
<TraitSelection
  traitType="backgroundOptions"
  options={Object.keys(traitImageMap.backgroundOptions)}
  updateTrait={updateTrait}
  label="Background"
  traitNames={traitNames}
/>
<StyledInput 
        type="text" 
        value={nftName} 
        onChange={(e) => setNftName(e.target.value)} 
        placeholder="Enter NFT Name" 
      />
      <StyledTextarea 
        value={nftDescription} 
        onChange={(e) => setNftDescription(e.target.value)} 
        placeholder="Enter NFT Description"
      />
         <TraitButton onClick={() => mintNFT()}>Mint NFT</TraitButton>
         <p style={{fontSize: '1em', color: '#aaa'}}> Please make sure you are connected to the Flare Networks</p>  
         <p style={{fontSize: '1em', color: '#aaa'}}> Ensure you have selected all traits and entered a name and description</p>
         <p style={{fontSize: '1em', color: '#333'}}>Enter the Token ID of the NFT you want to update</p>
         <p style={{fontSize: '1em', color: '#aaa'}}>Note: You can only update NFTs that you own</p>
      <TraitButton onClick={() => updateTokenTraitsAndMetadata()}>Update NFT Traits</TraitButton>
      <StyledInput type='text' value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder='Enter Token ID' />
     
        </Sidebar>
        
       </MainLayout>
    <TraitStore/>
    </AppContainer>
  );
}
function ChibiDisplay({ traits }) {
  const traitOrder = ['backgroundOptions', 'backOptions', 'bodyOptions', 'eyeColorOptions', 'headOptions', 'mouthOptions', 'accessoriesOptions', 'hatOptions'];

  // Check if at least one trait is selected
  const isAnyTraitSelected = Object.values(traits).some(trait => trait != null);

  return (
    <ChibiCanvas>
      {isAnyTraitSelected 
        ? traitOrder.map((traitType, index) => {
            const traitValue = traits[traitType];
            // Render image only if traitValue is not null
            return traitValue && (
              <TraitStyle
                key={index}
                src={traitValue}
                alt={`Chibi ${traitType}`}
                 style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              />
            );
          })
        : <img src={placeholderImage} alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      }
    </ChibiCanvas>
  );
}



function TraitSelection({ traitType, options, updateTrait, label, traitNames }) {
  return (
    <StyledTraitSelectionContainer>
      <h3 style={{ margin: '0 0 10px' }}>{label}</h3>
      <StyledSelect onChange={(e) => updateTrait(traitType, e.target.value)}>
        <StyledOption value="">Select {label}</StyledOption>
        {options.map((option, index) => (
          <StyledOption key={index} value={option}>
            {traitNames[traitType][option]}
          </StyledOption>
        ))}
      </StyledSelect>
    </StyledTraitSelectionContainer>
  );
}



export default App;


