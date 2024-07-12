// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./INonfungiblePositionManager.sol";
import "./ICLSwapRouterBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PancakeSwapV4Hooks is Ownable {
    INonfungiblePositionManager public positionManager;
    ICLSwapRouterBase public swapRouter;

    constructor(address _positionManager, address _swapRouter) {
        positionManager = INonfungiblePositionManager(_positionManager);
        swapRouter = ICLSwapRouterBase(_swapRouter);
    }

    function mintLiquidity(
        INonfungiblePositionManager.PoolKey memory poolKey,
        int24 tickLower,
        int24 tickUpper,
        uint256 amount0Desired,
        uint256 amount1Desired
    ) external onlyOwner {
        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager.MintParams({
            poolKey: poolKey,
            tickLower: tickLower,
            tickUpper: tickUpper,
            amount0Desired: amount0Desired,
            amount1Desired: amount1Desired,
            amount0Min: 0,
            amount1Min: 0,
            recipient: address(this),
            deadline: block.timestamp
        });

        (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) = positionManager.mint(params);
    }

    function increaseLiquidity(
        uint256 tokenId,
        uint256 amount0Desired,
        uint256 amount1Desired
    ) external onlyOwner {
        INonfungiblePositionManager.IncreaseLiquidityParams memory params = INonfungiblePositionManager.IncreaseLiquidityParams({
            tokenId: tokenId,
            amount0Desired: amount0Desired,
            amount1Desired: amount1Desired,
            amount0Min: 0,
            amount1Min: 0,
            deadline: block.timestamp
        });

        (uint128 liquidity, uint256 amount0, uint256 amount1) = positionManager.increaseLiquidity(params);
    }

    function decreaseLiquidity(uint256 tokenId, uint128 liquidity) external onlyOwner {
        INonfungiblePositionManager.DecreaseLiquidityParams memory params = INonfungiblePositionManager.DecreaseLiquidityParams({
            tokenId: tokenId,
            liquidity: liquidity,
            amount0Min: 0,
            amount1Min: 0,
            deadline: type(uint256).max
        });

        (uint256 amount0, uint256 amount1) = positionManager.decreaseLiquidity(params);
    }

    function burnLiquidity(uint256 tokenId) external onlyOwner {
        positionManager.burn(tokenId);
    }

    function swapExactInputSingle(
        ICLSwapRouterBase.V4CLExactInputSingleParams memory params
    ) external onlyOwner {
        uint256 amountOut = swapRouter.exactInputSingle(params, block.timestamp);
    }

    function swapExactInput(
        ICLSwapRouterBase.V4CLExactInputParams memory params
    ) external onlyOwner {
        uint256 amountOut = swapRouter.exactInput(params, block.timestamp);
    }

    function swapExactOutputSingle(
        ICLSwapRouterBase.V4CLExactOutputSingleParams memory params
    ) external onlyOwner {
        uint256 amountIn = swapRouter.exactOutputSingle(params, block.timestamp);
    }

    function swapExactOutput(
        ICLSwapRouterBase.V4CLExactOutputParams memory params
    ) external onlyOwner {
        uint256 amountIn = swapRouter.exactOutput(params, block.timestamp);
    }

    function approveToken(address token, address spender, uint256 amount) external onlyOwner {
        IERC20(token).approve(spender, amount);
    }
}

