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

contract AddLiquidityScript is Script {
    using CurrencyLibrary for Currency;

    address constant GOERLI_POOLMANAGER = address(0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b); // pool manager deployed to GOERLI
    address constant MUNI_ADDRESS = address(0xbD97BF168FA913607b996fab823F88610DCF7737); // mUNI deployed to GOERLI -- insert your own contract address here
    address constant MUSDC_ADDRESS = address(0xa468864e673a807572598AB6208E49323484c6bF); // mUSDC deployed to GOERLI -- insert your own contract address here
    address constant HOOK_ADDRESS = address(0x3CA2cD9f71104a6e1b67822454c725FcaeE35fF6); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!
    address constant SEPOLIA_USDC = address(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!
    address constant SEPOLIA_WETH = address(0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!

    PoolModifyLiquidityTest lpRouter = PoolModifyLiquidityTest(address(0x83feDBeD11B3667f40263a88e8435fca51A03F8C));

    function run() external {
        // sort the tokens!
        address token0 = uint160(SEPOLIA_USDC) < uint160(SEPOLIA_WETH) ? SEPOLIA_USDC : SEPOLIA_WETH;
        address token1 = uint160(SEPOLIA_USDC) < uint160(SEPOLIA_WETH) ? SEPOLIA_WETH : SEPOLIA_USDC;
        uint24 swapFee = 1000;
        int24 tickSpacing = 10;

        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(HOOK_ADDRESS)
        });

        // approve tokens to the LP Router
        vm.broadcast();
        IERC20(token0).approve(address(lpRouter), 1000e18);
        vm.broadcast();
        IERC20(token1).approve(address(lpRouter), 1000e18);

        // optionally specify hookData if the hook depends on arbitrary data for liquidity modification
        bytes memory hookData = new bytes(0);

        // logging the pool ID
        PoolId id = PoolIdLibrary.toId(pool);
        bytes32 idBytes = PoolId.unwrap(id);
        console.log("Pool ID Below");
        console.logBytes32(bytes32(idBytes));

        // Provide 10_000e18 worth of liquidity on the range of [-600, 600]
        vm.broadcast();
        lpRouter.modifyLiquidity(pool, IPoolManager.ModifyLiquidityParams(-600, 600, 10_000e18, 0), hookData);
    }
}