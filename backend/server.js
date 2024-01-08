

const express = require('express');
const sharp = require('sharp');
const { NFTStorage, File } = require('nft.storage');
const path = require('path');

const app = express();
const port = 3000;

// NFT.Storage API key
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdGOTA4QjNBRDJGMDFGNjE2MjU1MTA0ODIwNjFmNTY5Mzc2QTg3MjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTI5MDE5ODQyMCwibmFtZSI6Ik5FV0VTVCJ9.FGtIrIhKhgSx-10iVlI4sM_78o7jSghZsG5BpqZ4xfA';
const client = new NFTStorage({ token: apiKey });

// Define the directory for images
const imageDir = path.join(__dirname, 'Chibi-Traits');

// Import images (ensure paths are correct)
const images = {
    "hypnotizeEyes": path.join(imageDir, 'Eyes/hypnotizeEyes.png'),
    "originalHead": path.join(imageDir, 'Head/originalHead.png'),
    "originalBody": path.join(imageDir, 'Body/originalBody.png'),
    "robotBody": path.join(imageDir, 'Body/robotBody.png'),
    "pinkGradientbg": path.join(imageDir, 'Background/pinkGradientbg.png'),
    "greenGradientbg": path.join(imageDir, 'Background/greenGradientbg.png'),
    "blueGradientbg": path.join(imageDir, 'Background/blueGradientbg.png'),
    "yellowGradientbg": path.join(imageDir, 'Background/yellowGradientbg.png'),
    "greenAlienHead": path.join(imageDir, 'Head/greenAlien.png'),
    "humanoidHead": path.join(imageDir, 'Head/humanoid1.png'),
    "robotHead": path.join(imageDir, 'Head/robot.png'),
    "rainbowSpiralEyes": path.join(imageDir, 'Eyes/rainbowSpiralEyes.png'),
    "alienHead": path.join(imageDir, 'Head/alien.png'),
    "kitty": path.join(imageDir, 'Hat/kitty.png'),
    "vampireMouth": path.join(imageDir, 'Mouth/vampireMouth.png'),
    "doubleEyes": path.join(imageDir, 'Eyes/doubleEyes.png'),
    "butter": path.join(imageDir, 'Mouth/butter.png'),
    "SGBBeanie": path.join(imageDir, 'Hat/SGBBeanie.png'),
    "toad": path.join(imageDir, 'Hat/toad.png'),
    "spinyCap": path.join(imageDir, 'Hat/spinyCap.png'),
    "mohawk": path.join(imageDir, 'Hat/mohawk.png'),
    "yellowEyes": path.join(imageDir, 'Eyes/yellowEyes.png'),
    "samurai": path.join(imageDir, 'Hat/samurai.png'),
    "greenBody": path.join(imageDir, 'Body/greenBody.png'),
    "blackEyes": path.join(imageDir, 'Eyes/blackEyes.png'),
    "blueEyes": path.join(imageDir, 'Eyes/blueEyes.png'),
    "goldHead": path.join(imageDir, 'Head/goldHead.png'),
    "goldTuxedo": path.join(imageDir, 'Body/goldTuxedo.png'),
    "monkey": path.join(imageDir, 'Head/monkey.png')
};

// Map trait values to image file names
const traitImageMap = {
    "hat": {
        "0": "kitty", "1": "SGBBeanie", "2": "toad", "3": "spinyCap", "4": "mohawk", "5": "samurai"
    },
    "head": {
        "0": "originalHead", "1": "greenAlienHead", "2": "humanoidHead", "3": "robotHead", "4": "alienHead", "5": "goldHead", "6": "monkey"
    },
    "mouth": {
        "0": "vampireMouth", "1": "butter"
    },
    "eyeColor": {
        "0": "hypnotizeEyes", "1": "rainbowSpiralEyes", "2": "doubleEyes", "3": "yellowEyes", "4": "blackEyes", "5": "blueEyes"
    },
    "body": {
        "0": "robotBody", "1": "originalBody", "2": "greenBody", "3": "goldTuxedo"
    },
    "background": {
        "0": "pinkGradientbg", "1": "greenGradientbg", "2": "blueGradientbg", "3": "yellowGradientbg"
    }
};

async function createCompositeImage(traits) {
  console.log("Received traits for image composition:", traits);

  const compositeOptions = [
    { input: images[traitImageMap["background"][traits.background]] }, // Background first
    { input: images[traitImageMap["body"][traits.body]] },             // Body next
    { input: images[traitImageMap["eyeColor"][traits.eyeColor]] },     // Eye Color
    { input: images[traitImageMap["head"][traits.head]] },             // Head
    { input: images[traitImageMap["mouth"][traits.mouth]] },           // Mouth
    { input: images[traitImageMap["hat"][traits.hat]] }                // Hat on top
  ].filter(option => option.input); // Filter out undefined paths

  const compositeImage = await sharp({ create: { width: 1024, height: 1024, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite(compositeOptions)
      .png()
      .toBuffer();

  return compositeImage;
}



async function uploadToIPFS(buffer) {
  const file = new File([buffer], 'nft.png', { type: 'image/png' });
  const cid = await client.storeBlob(file);
  return `https://ipfs.io/ipfs/${cid}`;
}

app.get('/metadata/:tokenId', async (req, res) => {
  const tokenId = req.params.tokenId;
  const traits = req.query;

  try {
      const compositeImageBuffer = await createCompositeImage(traits);
      const imageUrl = await uploadToIPFS(compositeImageBuffer);
      const metadata = {
          name: `NFT #${tokenId}`,
          description: "Dynamic NFT with customizable traits.",
          image: imageUrl,
          attributes: [] // Add any additional metadata here
      };
      res.json(metadata);
  } catch (error) {
      console.error('Error generating metadata:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`NFT Metadata server running at http://localhost:${port}`);
});