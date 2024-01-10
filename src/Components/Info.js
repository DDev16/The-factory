import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideRight = keyframes`
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const hoverPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Styled components
const InfoContainer = styled.div`
  animation: ${fadeIn} 1s ease-out;
  padding: 50px;
  width: 80%;
  margin-top: 150px;
 text-align: center;
  color: #333;
  font-family: 'Roboto', Arial, sans-serif;
  background: linear-gradient(135deg, #ece9e6, #ffffff);
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  color: #5b8bf7;
  animation: ${slideRight} 1.2s ease-out;
  font-size: 2.2em;
  margin-bottom: 25px;
  text-shadow: 1px 1px 2px #6b6b6b;
`;

const Text = styled.p`
  color: #555;
  animation: ${fadeIn} 1.8s ease-in;
  line-height: 1.8;
  font-size: 1.1em;
`;

const StepList = styled.ol`
  animation: ${fadeIn} 2.2s ease-in-out;
  counter-reset: step-counter;
  padding: 0;
  list-style: none; // Remove default list styling
  display: flex;
  flex-direction: column;
  align-items: center; // Center align the list items
  width: 100%;
`;

const Step = styled.li`
  display: flex; // Use flexbox for alignment
  align-items: center; // Align items vertically
  justify-content: center; // Center align horizontally
  margin-bottom: 25px;
  animation: ${slideRight} 1.8s ease-out;
  counter-increment: step-counter;
  width: 100%;
  max-width: 600px; // Set a max-width for better readability

  &:before {
    content: counter(step-counter);
    background-color: #5b8bf7;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-right: 20px; // Add space between the number and text
  }

  &:hover {
    animation: ${hoverPulse} 0.7s ease;
    background-color: #f0f8ff;
    border-left: 4px solid #5b8bf7;
  }

  strong {
    color: #5b8bf7;
    font-weight: bold;
    font-size: 1.1em;
  }
`;

function Info() {
  return (
    <InfoContainer>
      <Title>Welcome to the Songbird Chibi Factory DApp!</Title>
      <Text>Follow these steps to create and customize your own Chibi NFTs:</Text>

      <StepList>
        <Step>
          <strong>Connect Your Wallet</strong>
          <Text>Click the "Connect Wallet" button at the top of the page...</Text>
        </Step>

        <Step>
          <strong>Customize Your Chibi</strong>
          <Text>Use the dropdown menus under "Hat," "Head," "Mouth, etc." to select traits...</Text>
        </Step>

        <Step>
          <strong>Enter NFT Details</strong>
          <Text>Type in a name and description for your Chibi NFT...</Text>
        </Step>

        <Step>
          <strong>Mint Your Chibi NFT</strong>
          <Text>Click the "Mint NFT" button to create your Chibi NFT...</Text>
        </Step>

        <Step>
          <strong>Update Chibi Traits (Optional)</strong>
          <Text>If you want to make changes to your Chibi's traits...</Text>
        </Step>

        <Step>
          <strong>Manage Your Chibi NFTs</strong>
          <Text>To view your Chibi NFTs, enter the Token ID...</Text>
        </Step>
      </StepList>

      <Text>That's it! You've successfully created and customized your own Chibi NFTs using the Songbird Chibi Factory DApp...</Text>
    </InfoContainer>
  );
}

export default Info;
