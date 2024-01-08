import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AppContainer, Header, MainLayout, Sidebar, TraitSelectionContainer, TraitButton, ChibiCanvas, TraitStyle, StyledInput, StyledButton } from './Styles/StyledComponents.js';
import contractABI from './abi/abi.json';
import traitImageMap from './TraitMap.js';
import { StyledTextarea } from './Styles/StyledComponents.js';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdGOTA4QjNBRDJGMDFGNjE2MjU1MTA0ODIwNjFmNTY5Mzc2QTg3MjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTI5MDE5ODQyMCwibmFtZSI6Ik5FV0VTVCJ9.FGtIrIhKhgSx-10iVlI4sM_78o7jSghZsG5BpqZ4xfA';

const createMetadataJSON = (imageCID, chibiTraits, nftName, nftDescription) => {
  // Define a mapping from indices to descriptive names
  const traitNames = {
    hatOptions: ["Kitty", "SGB Beanie", "Toad", "Spinnycap", "Mohawk", "Samaraui"],
    headOptions: ["Original Head", "Green Alien Head", "Humanoid Head", "Robot Head", "Alien Head", "Gold Head", "Monkey"],
    mouthOptions: ["Vampire Mouth", "Butter"],
    eyeColorOptions: ["Hypnotize Eyes", "Rainbow Spiral Eyes", "Double Eyes", "Yellow Eyes", "Black Eyes", "Blue Eyes"],
    bodyOptions: ["Robot Body", "Original Body", "Green Body", "Gold Tuxedo"],
    backgroundOptions: ["Pink Gradient", "Green Gradient", "Blue Gradient", "Yellow Gradient"]
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
  const traitOrder = ['backgroundOptions', 'bodyOptions', 'eyeColorOptions', 'headOptions', 'mouthOptions', 'hatOptions'];

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
  // Convert base64 to blob
  const response = await fetch(compositeImage);
  const blob = await response.blob();

  // Upload to nft.storage
  const formData = new FormData();
  formData.append('file', blob);

  const uploadResponse = await fetch('https://api.nft.storage/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`, // Make sure to keep your API key secure
    },
    body: formData,
  });

  const uploadResult = await uploadResponse.json();
  return uploadResult.value.cid; // This is the CID of the uploaded image
};



const contractAddress = '0xa27bC320252d51EEAA24BCCF6cc003979E485860';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [nftName, setNftName] = useState(''); // State for NFT name
  const [nftDescription, setNftDescription] = useState(''); // State for NFT description

  const [chibiTraits, setChibiTraits] = useState({
    hatOptions: null,
    headOptions: null,
    mouthOptions: null,
    eyeColorOptions: null,
    bodyOptions: null,
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

  const mintNFT = async () => {
    if (!contract) return;

    const traitIndices = {
      hat: Object.keys(traitImageMap.hatOptions).find(key => traitImageMap.hatOptions[key] === chibiTraits.hatOptions),
      head: Object.keys(traitImageMap.headOptions).find(key => traitImageMap.headOptions[key] === chibiTraits.headOptions),
      mouth: Object.keys(traitImageMap.mouthOptions).find(key => traitImageMap.mouthOptions[key] === chibiTraits.mouthOptions),
      eyeColor: Object.keys(traitImageMap.eyeColorOptions).find(key => traitImageMap.eyeColorOptions[key] === chibiTraits.eyeColorOptions),
      body: Object.keys(traitImageMap.bodyOptions).find(key => traitImageMap.bodyOptions[key] === chibiTraits.bodyOptions),
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

  
      // 3. Mint the NFT using existing smart contract function
      const accounts = await web3.eth.getAccounts();
      await contract.methods.mergeTraitsAndMintNFT(
        traitIndices.hat, 
        traitIndices.head, 
        traitIndices.mouth, 
        traitIndices.eyeColor, 
        traitIndices.body, 
        traitIndices.background
      ).send({ from: accounts[0] });
  
      console.log('NFT minted!');
    } catch (error) {
      console.error('Minting failed', error);
    }
  };
  
  const updateTrait = (traitType, value) => {
    setChibiTraits(prevTraits => ({
      ...prevTraits,
      [traitType]: traitImageMap[traitType][value],
    }));
  };

  return (
    <AppContainer>
 <Header>
        <h1>Songbird Chibi Factory</h1>
        <StyledButton onClick={connectWallet}>Connect Wallet</StyledButton>
        {account && <p>Connected Account: {account}</p>}
      </Header>   
         <MainLayout>
        <Sidebar>
          <TraitSelection traitType="hatOptions" options={Object.keys(traitImageMap.hatOptions)} updateTrait={updateTrait} label="Hat" />
          <TraitSelection traitType="headOptions" options={Object.keys(traitImageMap.headOptions)} updateTrait={updateTrait} label="Head" />
          <TraitSelection traitType="mouthOptions" options={Object.keys(traitImageMap.mouthOptions)} updateTrait={updateTrait} label="Mouth" />
          <TraitSelection traitType="eyeColorOptions" options={Object.keys(traitImageMap.eyeColorOptions)} updateTrait={updateTrait} label="Eye Color" />
          <TraitSelection traitType="bodyOptions" options={Object.keys(traitImageMap.bodyOptions)} updateTrait={updateTrait} label="Body" />
          <TraitSelection traitType="backgroundOptions" options={Object.keys(traitImageMap.backgroundOptions)} updateTrait={updateTrait} label="Background" />

        </Sidebar>
        <ChibiDisplay traits={chibiTraits} />
        
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

      </MainLayout>
    </AppContainer>
  );
}

function ChibiDisplay({ traits }) {
  // Define the order of trait types
  const traitOrder = ['backgroundOptions', 'bodyOptions', 'eyeColorOptions', 'headOptions', 'mouthOptions', 'hatOptions'];

  return (
    <ChibiCanvas>
      {traitOrder.map((traitType, index) => {
        const traitValue = traits[traitType];
        return (
          traitValue && (
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
          )
        );
      })}
    </ChibiCanvas>
  );
}



function TraitSelection({ traitType, options, updateTrait, label }) {
  return (
    <TraitSelectionContainer>
      <h3>{label}</h3>
      {options.map((option, index) => (
        <TraitButton key={index} onClick={() => updateTrait(traitType, option)}>
          {traitType} {option}
        </TraitButton>
      ))}
    </TraitSelectionContainer>
  );
}

export default App;


