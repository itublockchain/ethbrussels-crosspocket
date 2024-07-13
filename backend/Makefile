-include .env

deploy:
	forge script script/DeployPoolManager.s.sol:DeployPoolManager --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-swap:
	forge script script/DeploySwapRouter.s.sol:DeploySwapRouter --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-liq:
	forge script script/DeployLiq.s.sol:DeployLiq --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
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
swapP:
	forge script script/Test/pancakeswapSwap.s.sol:pancakeswapSwap --fork-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast