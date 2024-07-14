// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {MockERC20} from "solmate/test/utils/mocks/MockERC20.sol";
import {Test} from "forge-std/Test.sol";
import {Constants} from "@pancakeswap/v4-core/test/pool-cl/helpers/Constants.sol";
import {Currency} from "@pancakeswap/v4-core/src/types/Currency.sol";
import {PoolKey} from "@pancakeswap/v4-core/src/types/PoolKey.sol";
import {LPFeeLibrary} from "@pancakeswap/v4-core/src/libraries/LPFeeLibrary.sol";
import {CLPoolParametersHelper} from "@pancakeswap/v4-core/src/pool-cl/libraries/CLPoolParametersHelper.sol";
import {PoolIdLibrary} from "@pancakeswap/v4-core/src/types/PoolId.sol";
import {ICLSwapRouterBase} from "@pancakeswap/v4-periphery/src/pool-cl/interfaces/ICLSwapRouterBase.sol";

contract PancakeswapSwap {
    using PoolIdLibrary for PoolKey;
    using CLPoolParametersHelper for bytes32;

    ICLSwapRouterBase public swapRouter;
    PoolKey public key;

    constructor(address _swapRouter, PoolKey memory _key) {
        swapRouter = ICLSwapRouterBase(_swapRouter);
        key = _key;
    }

    function performSwap(
        address recipient,
        uint128 amountIn,
        uint128 amountOutMinimum,
        bool zeroForOne,
        uint160 sqrtPriceLimitX96,
        bytes memory hookData
    ) public returns (uint256 amtOut) {
        amtOut = swapRouter.exactInputSingle(
            ICLSwapRouterBase.V4CLExactInputSingleParams({
                poolKey: key,
                zeroForOne: zeroForOne,
                recipient: recipient,
                amountIn: amountIn,
                amountOutMinimum: amountOutMinimum,
                sqrtPriceLimitX96: sqrtPriceLimitX96,
                hookData: hookData
            }),
            block.timestamp
        );
    }
}
