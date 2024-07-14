-include .env

deploy:
	forge script script/DeployPoolManager.s.sol:DeployPoolManager --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-fuji:
	forge script script/DeployPoolManager.s.sol:DeployPoolManager --rpc-url $(FUJI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
deploy-swap:
	forge script script/DeploySwapRouter.s.sol:DeploySwapRouter --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-swap-fuji:
	forge script script/DeploySwapRouter.s.sol:DeploySwapRouter --rpc-url $(FUJI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
deploy-liq:
	forge script script/DeployLiq.s.sol:DeployLiq --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-liq-fuji:
	forge script script/DeployLiq.s.sol:DeployLiq --rpc-url $(FUJI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
addLiquidity:
	forge script script/AddLiquidity.s.sol:AddLiquidity --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
createPool:
	forge script script/CreatePool.s.sol:CreatePool --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast	
approve:
	forge script script/Test/Approve.s.sol:Approve --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
initialize:
	forge script script/Test/PoolInitialize.s.sol:PoolInitialize --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
liq:
	forge script script/Test/PoolLiq.s.sol:PoolLiq --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
swap:
	forge script script/Test/Swap.s.sol:Swap --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
<<<<<<< HEAD
deploy-swapper:
	forge script script/DeploySwap.s.sol:DeploySwap --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
swapper:
	forge script script/Swapper.s.sol:Swapper --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
=======
swapP:
	forge script script/Test/pancakeswapSwap.s.sol:pancakeswapSwap --fork-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
>>>>>>> 47add79a67879dae3efe405e600df85200b58a58
