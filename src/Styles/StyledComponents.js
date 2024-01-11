
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


export const StyledTraitSelectionContainer = styled.div`
padding: 15px;
margin: 10px 0;
border: 2px solid #dedede;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
background-color: #f9f9f9;
`;

export const StyledSelect = styled.select`
width: 100%;
padding: 10px 15px;
margin-top: 10px;
border: 1px solid #ccc;
border-radius: 6px;
background-color: white;
font-size: 16px;
color: #333;
cursor: pointer;

&:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

&:hover {
  border-color: #007bff;
}
`;

export const StyledOption = styled.option`
color: #333;
background-color: white;
padding: 8px 12px;

&:hover {
  background-color: #f2f2f2;
}
`;



export const Container = styled.div`
  text-align: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin: 0 auto;
    margin-top: 40px;
`;

export const Heading1 = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

export const Paragraph = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
`;

export const TraitCategory = styled.div`
  margin-top: 30px;
`;

export const TraitStoreWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;