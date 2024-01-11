import React from 'react';
import styled from 'styled-components';

const TraitCardWrapper = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const TraitImage = styled.img`
  max-width: 100%;
  height: auto;
  border-bottom: 1px solid #e0e0e0;
`;

const TraitContent = styled.div`
  padding: 16px;
`;

const TraitName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const PurchaseButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #45a049;
  }
`;

const TraitCard = ({ traitName, traitImage, purchaseTrait, loading }) => {
  return (
    <TraitCardWrapper>
      <TraitImage src={traitImage} alt={traitName} />
      <TraitContent>
        <TraitName>{traitName} Trait</TraitName>
        <PurchaseButton onClick={purchaseTrait} disabled={loading}>
          {loading ? 'Purchasing...' : `Purchase ${traitName} Trait`}
        </PurchaseButton>
      </TraitContent>
    </TraitCardWrapper>
  );
};

export default TraitCard;
