// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import { PoolManager } from "v4-core/PoolManager.sol";

contract DeployPoolManager is Script {
    function run() external {
        vm.startBroadcast();

        PoolManager poolManager = new PoolManager(500000);

        console.log("Pool Manager deployed at:", address(poolManager));

        vm.stopBroadcast();
    }
}
