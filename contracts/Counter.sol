// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter {

    uint256 public count;

    event Increment(address indexed user, uint256 newCount);
    event Reset(address indexed user);

    function increment() public {
        count += 1;
        emit Increment(msg.sender, count);
    }

    function reset() public {
        count = 0;
        emit Reset(msg.sender);
    }
}