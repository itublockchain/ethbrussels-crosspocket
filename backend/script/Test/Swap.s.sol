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

contract Swap is Script {
    PoolSwapTest swapRouter =
        PoolSwapTest(0x6f41d083B4C66aaDB6b4422B8b1De65d6177324A);

    // slippage tolerance to allow for unlimited price impact
    uint160 public constant MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
    uint160 public constant MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;

    address token0 = address(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238);
    address token1 = address(0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14);
    address hookAddr = address(0);

    function run() external {
        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: 500,
            tickSpacing: 10,
            hooks: IHooks(hookAddr)
        });

        // approve tokens to the swap router
        vm.broadcast();
        IERC20(token0).approve(address(swapRouter), type(uint256).max);
        vm.broadcast();
        IERC20(token1).approve(address(swapRouter), type(uint256).max);
        vm.broadcast();
        IERC20(token0).approve(
            address(0x61d810C745E3cFa17659A64d68824137c7b9625E),
            type(uint256).max
        );
        vm.broadcast();
        IERC20(token1).approve(
            address(0x61d810C745E3cFa17659A64d68824137c7b9625E),
            type(uint256).max
        );

        // ---------------------------- //
        // Swap exactly 1e18 of token0 into token1
        // ---------------------------- //
        bool zeroForOne = true;
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: -1e6,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT // unlimited impact
        });

        // in v4, users have the option to receieve native ERC20s or wrapped ERC1155 tokens
        // here, we'll take the ERC20s
        PoolSwapTest.TestSettings memory testSettings = PoolSwapTest
            .TestSettings({takeClaims: false, settleUsingBurn: false});

        bytes memory hookData = new bytes(0); // no hook data on the hookless pool
        vm.broadcast();
        swapRouter.swap(pool, params, testSettings, hookData);
    }
}
