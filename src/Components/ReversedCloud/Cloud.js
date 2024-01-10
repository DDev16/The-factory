import React from 'react';
import clouds from '../../Images/reversedclouds.png';
import swirl from '../../Images/illusion.png';
import './cloud.scss'; // Import your CSS file here

const Cloud = () => {
    return (
        
            <img src={clouds} alt="clouds" className="clouds" 
                style={{ 
                    marginTop: "0px", 
                    width: "100%", 
                    position: "relative"
                }} 
            />
          
    );
};

export default Cloud;
