// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/PancakeswapSwap.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast(deployerPrivateKey);

        address swapRouterAddress = 0x3d5fc75b5db8fa13cfAc2D3F97363C0C1ad73060;
        address _currency0 = 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14;
        address _currency1 = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238;
        address hooks = 0x0000000000000000000000000000000000000000;
        address poolManager = 0x85cD8228f397a6a52402776A8A8B720e85622C18;
        uint24 fee = 30000;
        bytes32 parameters = 0x0000000000000000000000000000000000000000000000000000000000000000;;

        // Construct the PoolKey
        PoolKey memory poolKey = PoolKey({
            currency0: _currency0,
            currency1: _currency1,
            hooks: hooks,
            poolManager: poolManager,
            fee: fee,
            parameters: parameters
        });

        PancakeswapSwap swapper = new PancakeswapSwap(
            swapRouterAddress,
            poolKey
        );

        console.log("PancakeswapSwap deployed to:", address(swapper));

        vm.stopBroadcast();
    }
}
