import React, { useState } from "react";
import Styles from "./navbar.module.scss";
import { motion } from "framer-motion";
import mp3 from "../Chibi-Traits/Head/Gibran Alcocer & Leblanc - Idea 10 (Official Remix).mp3";
import styled from "styled-components";

const PlayButton = styled.button`
    background: linear-gradient(to right, #4285f4, #34a853, #fbbc05, #ea4335); /* Google-like color gradient */
    color: white;
    padding: 12px; /* Larger padding for a more prominent button */
    cursor: pointer;
    border: none;
    margin-top: 110px;
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

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioUrl = mp3;
  
    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };
  
    return (
      <div className={Styles.musicPlayer}>
        <PlayButton onClick={togglePlay}>
          {/* You can use an icon or any other element to represent play/pause */}
          {isPlaying ? "⏸" : "▶️"}
        </PlayButton>
        {isPlaying && <audio src={audioUrl} autoPlay />}
      </div>
    );
  };
  

const Navbar = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const toggleBurgerMenu = () => {
    setBurgerMenuActive(!burgerMenuActive);
  };

  const motionVariants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeOut",
        type: "spring",
      },
    },
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0,
        duration: 0,
      },
    },
  };

  const listItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
    closed: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
  };

  return (
    <div
      className={`${Styles.navbar} ${
        burgerMenuActive ? Styles.active : ""
      }`}
    >
      <div className={Styles.navigation}>
        <div
          className={Styles.burgerMenuContainer}
          onClick={() => toggleBurgerMenu()}
        >
          <div className={Styles.burgerMenuTrigger}></div>
          <div className={Styles.burgerMenu}></div>
        </div>
      </div>
      <div className={Styles.content}>
        <motion.ul
          animate={burgerMenuActive ? "open" : "closed"}
          variants={motionVariants}
        >
          <motion.li variants={listItemVariants}>
            <a href="/">Home</a>
          </motion.li>
          <motion.li variants={listItemVariants}>
            <a href="/">Trait Store</a>
          </motion.li>
          <motion.li variants={listItemVariants}>
            <a href="/">My Chibis</a>
          </motion.li>
        </motion.ul>
        
      </div>
      <MusicPlayer />
    </div>
  );
};

export default Navbar;
