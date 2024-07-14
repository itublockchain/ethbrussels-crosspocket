// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {PoolManager} from "v4-core/PoolManager.sol";
import {PoolSwapTest} from "v4-core/Test/PoolSwapTest.sol";
import {Swap} from "../src/Swap.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
contract DeploySwap is Script {
    
    function run() external {
        vm.startBroadcast();
        
        Swap swap = new Swap();
        console.log("PoolSwapTest deployed at:", address(swap));
        
        vm.stopBroadcast();
    }
}
