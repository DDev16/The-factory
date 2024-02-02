import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 200px;
  text-align: center;
`;

const TraitName = styled.h3`
  font-size: 18px;
  margin: 8px 0;
`;

const TraitImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
`;

const TraitPrice = styled.p`
  font-size: 16px;
  margin: 8px 0;
`;

const TraitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TraitCard = ({ traitName, traitImage, purchaseTrait, loading, traitPrice }) => {
  return (
    <CardContainer>
      <TraitImage src={traitImage} alt={traitName} />
      <TraitName>{traitName}</TraitName>
      <TraitPrice>Price: {traitPrice} ETH</TraitPrice>
      <TraitButton onClick={purchaseTrait} disabled={loading}>
        {loading ? 'Purchasing...' : 'Purchase'}
      </TraitButton>
    </CardContainer>
  );
};

export default TraitCard;
