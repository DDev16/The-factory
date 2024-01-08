pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ChibiFactory is ERC721 {
    IERC20 public token;

    struct Trait {
        string name;
        uint256 supply;
        uint256 price;
    }

    mapping(uint256 => Trait) public hats;
    mapping(uint256 => Trait) public heads;
    // Other trait mappings...

    constructor(address _tokenAddress) ERC721("Chibi", "CHB") {
        token = IERC20(_tokenAddress);
        // Initialize traits with supply and price
    }

    function purchaseTrait(uint256 traitId, uint256 traitType) public {
        // Verify trait availability and price
        // Transfer ERC20 tokens from user to contract
        // Update trait ownership and decrease supply
    }

    function mintChibi(uint256[] memory selectedTraits) public {
        // Verify ownership of traits
        // Mint NFT with specific trait combination
    }

    // Additional helper functions for managing traits and minting...
}
