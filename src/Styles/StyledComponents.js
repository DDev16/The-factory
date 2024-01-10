
import styled from 'styled-components';


// Styled components
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
 
`;



export const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 150px;
  align-items: start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;



export const Sidebar = styled.aside`
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;



export const Header = styled.header`
background: linear-gradient(90deg, #3f51b5 0%, #6a82fb 100%);
  color: #ffffff;
  width: 100%;
  border: 1px solid #ffffff;
  width: 80%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(250, 250, 250, 0.9);
  position: absolute

  

  p {
    margin: 5px 0 0;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
`;



export const TraitSelectionContainer = styled.div`
  margin-bottom: 20px;
  
`;

export const TraitButton = styled.button`
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }
`;



export const StyledInput = styled.input`
  
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const StyledTextarea = styled.textarea`
display: block;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  height: 100px;
`;

export const StyledButton = styled.button`
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }
`;
