-include .env

deploy:
	forge script script/DeployContracts.s.sol:DeployContracts --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-swap:
	forge script script/DeploySwapTest.s.sol:DeploySwapTest --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
deploy-liq:
	forge script script/DeployLiq.s.sol:DeployLiq --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --etherscan-api-key $(ETHERSCAN_API_KEY) --verify
    