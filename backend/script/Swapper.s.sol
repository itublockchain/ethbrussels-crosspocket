// 0x8c4672323544998861b592DC53cdA7E98Fb2EE39

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {PoolModifyLiquidityTest} from "v4-core/test/PoolModifyLiquidityTest.sol";
import {PoolSwapTest} from "v4-core/test/PoolSwapTest.sol";
import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";
import {TickMath} from "v4-core/libraries/TickMath.sol";
import {Swap} from "../src/Swap.sol";

contract Swapper is Script {
    Swap swapper =  Swap(payable(0xbc6db075E3BaB9C1A5f0070e40279374e46DF1B9));
    function run() external {
        vm.broadcast();
        swapper.swap(
            0x633aDfb3430b96238c9FB7026195D1d5b0889EA6,
            1000000
        );
    }
}
