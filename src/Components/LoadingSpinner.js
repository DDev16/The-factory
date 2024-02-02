import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #f37506;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
`;

const LoadingSpinner = () => (
  <Spinner />
);

export default LoadingSpinner;
