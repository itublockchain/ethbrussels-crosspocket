// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {PoolManager} from "v4-core/PoolManager.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";

contract CreatePool is Script {
    using CurrencyLibrary for Currency;

    //addresses with contracts deployed
    address constant SEPOLIA_POOLMANAGER = address(0x61d810C745E3cFa17659A64d68824137c7b9625E); //pool manager deployed to GOERLI
    // address constant MUNI_ADDRESS = address(0xbD97BF168FA913607b996fab823F88610DCF7737); //mUNI deployed to GOERLI -- insert your own contract address here
    // address constant MUSDC_ADDRESS = address(0xa468864e673a807572598AB6208E49323484c6bF); //mUSDC deployed to GOERLI -- insert your own contract address here
    // address constant HOOK_ADDRESS = address(0x3CA2cD9f71104a6e1b67822454c725FcaeE35fF6); //address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!
    address constant SEPOLIA_USDC = address(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!
    address constant SEPOLIA_WETH = address(0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14); // address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!

    PoolManager manager = PoolManager(0x61d810C745E3cFa17659A64d68824137c7b9625E);

    function run() external {
        // sort the tokens!
        address token0 = uint160(SEPOLIA_USDC) < uint160(SEPOLIA_WETH) ? SEPOLIA_USDC : SEPOLIA_WETH;
        address token1 = uint160(SEPOLIA_USDC) < uint160(SEPOLIA_WETH) ? SEPOLIA_WETH : SEPOLIA_USDC;
        uint24 swapFee = 1000;
        int24 tickSpacing = 10;

        // floor(sqrt(1) * 2^96)
        uint160 startingPrice = 79228162514264337593543950336;

        bytes memory hookData = abi.encode(block.timestamp);

        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(address(0))
        });

        // Turn the Pool into an ID so you can use it for modifying positions, swapping, etc.
        PoolId id = PoolIdLibrary.toId(pool);
        bytes32 idBytes = PoolId.unwrap(id);

        console.log("Pool ID Below");
        console.logBytes32(bytes32(idBytes));

        vm.broadcast();
        manager.initialize(pool, startingPrice, hookData);
    }
}