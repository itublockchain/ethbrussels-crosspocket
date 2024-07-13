// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {PoolManager} from "v4-core/PoolManager.sol";
import {PoolSwapTest} from "v4-core/Test/PoolSwapTest.sol";

import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
contract DeploySwapRouter is Script {
    IPoolManager public poolManager;
    function run() external {
        vm.startBroadcast();
        
        PoolSwapTest poolSwapTest = new PoolSwapTest(IPoolManager(0x9C430DBdf1936AA36154e2046bb91C065Aa0107B));
        console.log("PoolSwapTest deployed at:", address(poolSwapTest));
        
        vm.stopBroadcast();
    }
}
