// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/PancakeswapSwap.sol";
import {Currency} from "@pancakeswap/v4-core/src/types/Currency.sol";
import {PoolKey} from "@pancakeswap/v4-core/src/types/PoolKey.sol";
import {IHooks} from "@pancakeswap/v4-core/src/interfaces/IHooks.sol";
import {IPoolManager} from "@pancakeswap/v4-core/src/interfaces/IPoolManager.sol"; // Import the IPoolManager interface

contract pancakeswapSwap is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address swapRouterAddress = 0x3d5fc75b5db8fa13cfAc2D3F97363C0C1ad73060;
        address currency0Address = 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14;
        address currency1Address = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238;
        address hooksAddress = address(0);
        address poolManagerAddress = 0x85cD8228f397a6a52402776A8A8B720e85622C18; // Update with actual pool manager address
        uint24 fee = 30000;
        bytes32 parameters = bytes32(0);

        // Wrap addresses to expected types
        Currency currency0 = Currency.wrap(currency0Address);
        Currency currency1 = Currency.wrap(currency1Address);
        IHooks hooks = IHooks(hooksAddress);
        IPoolManager poolManager = IPoolManager(poolManagerAddress);

        // Construct the PoolKey
        PoolKey memory poolKey = PoolKey({
            currency0: currency0,
            currency1: currency1,
            hooks: hooks,
            poolManager: poolManager,
            fee: fee,
            parameters: parameters
        });

        // Deploy the PancakeswapSwap contract
        PancakeswapSwap swapper = new PancakeswapSwap(
            swapRouterAddress,
            poolKey
        );

        console.log("PancakeswapSwap deployed to:", address(swapper));

        vm.stopBroadcast();
    }
}
