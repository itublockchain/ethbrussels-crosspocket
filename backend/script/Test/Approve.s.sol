// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "forge-std/Script.sol";
import "forge-std/console.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";
contract Approve is Script {
    address public USDC = address(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238);
    address public WETH = address(0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14);
    address public lpRouter = address(0xff80e212A63059B8d904104a7d58baa4fB00D30E);
    function run() external {
        vm.broadcast();
        IERC20(USDC).approve(address(lpRouter), 10000000);
        
    }
}