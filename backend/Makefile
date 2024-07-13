-include .env

deploy:
	forge script script/DeployContracts.s.sol:DeployContracts --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-swap:
	forge script script/DeploySwapTest.s.sol:DeploySwapTest --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-liq:
	forge script script/DeployLiq.s.sol:DeployLiq --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
addLiquidity:
	forge script script/AddLiquidity.s.sol:AddLiquidity --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
createPool:
	forge script script/CreatePool.s.sol:CreatePool --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast	
approve:
	forge script script/Test/Approve.s.sol:Approve --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast