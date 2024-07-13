// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {PoolModifyLiquidityTest} from "v4-core/test/PoolModifyLiquidityTest.sol";
import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";

contract PoolLiq is Script {
    PoolModifyLiquidityTest lpRouter =
        PoolModifyLiquidityTest(0xa46ff840Dbb261e347606b3733C91c5b3bdcA65d);
    address token0 = address(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238);
    address token1 = address(0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14);
    address hookAddress = address(address(0));

    function run() external {
        // Pool that will receieve liquidity
        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: 500,
            tickSpacing: 10,
            hooks: IHooks(hookAddress)
        });

        // approve tokens to the LP Router
        vm.broadcast();
        IERC20(token0).approve(address(lpRouter), type(uint256).max);
        vm.broadcast();
        IERC20(token1).approve(address(lpRouter), type(uint256).max);

        console.log(
            IERC20(token0).allowance(
                0x633aDfb3430b96238c9FB7026195D1d5b0889EA6,
                address(lpRouter)
            )
        );
        console.log(
            IERC20(token1).allowance(
                0x633aDfb3430b96238c9FB7026195D1d5b0889EA6,
                address(lpRouter)
            )
        );
        console.log(
            IERC20(token0).balanceOf(0x633aDfb3430b96238c9FB7026195D1d5b0889EA6)
        );
        console.log(
            IERC20(token1).balanceOf(0x633aDfb3430b96238c9FB7026195D1d5b0889EA6)
        );
        console.log("Approve tokens to LP Router", address(this));

        // Provide 10e18 worth of liquidity on the range of [-600, 600]
        int24 tickLower = -200;
        int24 tickUpper = 200;
        int256 liquidity = 0.000000001e18;

        vm.broadcast();
        lpRouter.modifyLiquidity(
            pool,
            IPoolManager.ModifyLiquidityParams({
                tickLower: tickLower,
                tickUpper: tickUpper,
                liquidityDelta: liquidity,
                salt: 0
            }),
            new bytes(0)
        );
        console.log("dfd");
    }
}
