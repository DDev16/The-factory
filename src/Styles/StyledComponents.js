
import styled from 'styled-components';


// Styled components
export const AppContainer = styled.div`
  text-align: center;
  font-family: 'Rubik Doodle Shadow', sans-serif;

  height: 150vh;
  border-top: 10px  dotted #ddd;

`;


export const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


export const Sidebar = styled.aside`
  flex: 0 0 600px;
  padding: 20px;
  border-right: 1px solid #ddd;
  height: 1024px;
  overflow-y: auto;
  background-color: #333;
  width: 70%;

  @media (max-width: 768px) {
    height: auto;
    width: 80%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;


export const Header = styled.header`
  font-family: 'Rubik Doodle Shadow, sans-serif';
  font-size: 30px;
  color: white;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;



export const ChibiCanvas = styled.div`
  position: relative;
  width: 1024px;
  height: 1024px;
  border: 8px solid #ccc;
  margin-bottom: 20px;
  border-radius: 16px;
  background: #ccc;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 90vw;
    height: 90vw; /* Keep the aspect ratio */
  }
`;



export const TraitStyle = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 6px;
  max-width: 100%;
  height: auto;

  @media (max-width: 768px) {
    /* Adjust size and position for smaller screens */
    width: 100vw; /* Example size, adjust as needed */
    /* You may also need to adjust 'top' and 'left' properties using percentages or viewport units */
  }
`;


export const TraitSelectionContainer = styled.div`
  margin: 10px;
  color: #fff;
  background-color: #333;
width: 50%;
  display: inline-block;
`;

export const TraitButton = styled.button`
  margin: 20px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #eaeaea;
  }
`;

export const StyledInput = styled.input`
flex: 0 0 200px;
padding: 10px;
margin: 10px 0;
border: 1px solid #ccc;
border-radius: 4px;
font-size: 16px;
width: 80%;
`;

export const StyledTextarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 10%;
  height: 100px;
`;

export const StyledButton = styled.button`
padding: 10px 20px;
background-color: #4caf50;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 16px;
margin: 10px 0;

&:hover {
  background-color: #45a049;
}
`;
