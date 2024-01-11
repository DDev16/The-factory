import React from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
const TraitCardWrapper = styled.div`
  background-color: #f2f2f2; /* Slightly darker background color */
  border: 1px solid #d9d9d9; /* Softer border color */
  width: 300px;
  border-radius: 16px; /* Larger border radius for a smoother look */
  overflow: hidden;
  margin: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8); /* Softer box shadow */
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const TraitImage = styled.img`
  max-width: 100%;
  height: auto;
  border-bottom: 2px solid #d9d9d9; /* Slightly thicker border at the bottom */
`;

const TraitContent = styled.div`
  padding: 20px; /* More padding for better spacing */
`;

const TraitName = styled.p`
  font-size: 20px; /* Larger font size for the trait name */
  font-weight: bold;
  margin-bottom: 12px; /* Increased margin for better spacing */
  color: #333; /* Darker text color for better contrast */
`;

const PurchaseButton = styled.button`
  background: linear-gradient(to right, #4285f4, #34a853, #fbbc05, #ea4335); /* Google-like color gradient */
  color: white;
  padding: 12px; /* Larger padding for a more prominent button */
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-size: 16px; /* Larger font size for the button text */
  transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(to right, #4285f4, #1c87f0, #5c0eae, #ea4335); /* Adjusted gradient on hover */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Slightly larger box shadow on hover */
  }

  &:focus {
    outline: none; /* Remove default focus outline */
  }
`;

const TraitPrice = styled.p`
  font-size: 16px; /* Larger font size for the trait price */
  color: #666;
  margin-top: 10px; /* Added margin at the top for better spacing */
`;


const TraitCard = ({ traitName, traitImage, traitPrice, purchaseTrait, loading }) => {
    // Check if traitPrice is defined before attempting to convert
    const formattedPrice = traitPrice ? Web3.utils.fromWei(traitPrice.toString(), 'ether') : 'N/A';
  
    return (
      <TraitCardWrapper>
        <TraitImage src={traitImage} alt={traitName} />
        <TraitContent>
          <TraitName>{traitName} Trait</TraitName>
          <TraitPrice>{formattedPrice} Psycho Gem Tokens</TraitPrice> {/* Updated this line */}
          <PurchaseButton onClick={purchaseTrait} disabled={loading}>
            {loading ? 'Purchasing...' : `Purchase ${traitName} Trait`}
          </PurchaseButton>
        </TraitContent>
      </TraitCardWrapper>
    );
  };
  
  export default TraitCard;

