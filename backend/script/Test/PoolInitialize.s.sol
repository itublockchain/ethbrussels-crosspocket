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

contract PoolInitialize is Script {
    using CurrencyLibrary for Currency;

    // address constant GOERLI_POOLMANAGER = address(0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b); // pool manager deployed to GOERLI
    // address constant MUNI_ADDRESS = address(0xbD97BF168FA913607b996fab823F88610DCF7737); // mUNI deployed to GOERLI -- insert your own contract address here
    // address constant MUSDC_ADDRESS = address(0xa468864e673a807572598AB6208E49323484c6bF); // mUSDC deployed to GOERLI -- insert your own contract address here
    // address constant HOOK_ADDRESS = address(0x3CA2cD9f71104a6e1b67822454c725FcaeE35fF6); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!
    address constant SEPOLIA_USDC =
        address(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!
    address constant SEPOLIA_WETH =
        address(0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!

    PoolModifyLiquidityTest lpRouter =
        PoolModifyLiquidityTest(
            address(0xff80e212A63059B8d904104a7d58baa4fB00D30E)
        );

    function run() external {
        IPoolManager manager = IPoolManager(0x61d810C745E3cFa17659A64d68824137c7b9625E);

        address token0 = address(SEPOLIA_USDC);
        address token1 = address(SEPOLIA_WETH);
        uint24 swapFee = 500; // 0.05% fee tier
        int24 tickSpacing = 10;

        // floor(sqrt(1) * 2^96)
        uint160 startingPrice = 79228162514264337593543950336;

        // hookless pool doesnt expect any initialization data
        bytes memory hookData = new bytes(0);

        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(address(0x0)) // !!! Hookless pool is address(0x0)
        });
        vm.broadcast();
        manager.initialize(pool, startingPrice, hookData);
    }
}
