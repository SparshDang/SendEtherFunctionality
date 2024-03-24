// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Payment{
    function sendEther(address user) public payable{
        require(msg.value > 0, "Please have ");
        payable(user).transfer(msg.value);
    }
}