// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 private minimumWage;

    // Emitted when the stored value changes
    event MinimumWageChanged(uint256 newMinimumWage);

    // Stores a new value in the contract
    function store(uint256 newMinimumWage) public onlyOwner {
        minimumWage = newMinimumWage;
        emit MinimumWageChanged(newMinimumWage);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return minimumWage;
    }
}
