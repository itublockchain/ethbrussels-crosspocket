"use client";
import { useEffect, useState, useCallback, use } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import {
  getAppId,
  createNewUser,
  createSessionToken,
  initializeAccount,
  executeChallenge,
  fetchWalletData,
  fundWallet,
  getWalletBalances,
  initiateTransfer,
} from "./utils/functions";

export default function Home() {
  const [appId, setAppId] = useState("");
  const [userId, setUserId] = useState("");
  const [responseUserId, setResponseUserId] = useState(null);
  const [tokenResponse, setTokenResponse] = useState(null);
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [accountResponse, setAccountResponse] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [fundResponse, setFundResponse] = useState(null);
  const [walletId, setWalletId] = useState("");
  const [walletBalances, setWalletBalances] = useState(null);
  const [appIdnew, setAppIdnew] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [refId, setRefId] = useState("");
  const [amounts, setAmounts] = useState([""]);
  const [tokenId, setTokenId] = useState("");
  const [transferResponse, setTransferResponse] = useState(null);
  const [confirmResponse, setConfirmResponse] = useState(null);
  const [decrementResponse, setDecrementResponse] = useState(null);
  const [incrementResponse, setIncrementResponse] = useState(null);
  const [responseCountData, setResponseCountData] = useState(null);
  const [executionResponse, setExecutionResponse] = useState(null);

  let sdk: W3SSdk;

  useEffect(() => {
    if (appIdnew) {
      console.log("App ID: " + appIdnew);
    }
  }, [appIdnew]);

  useEffect(() => {
    if (responseUserId) {
      console.log("User ID: " + userId);
      console.log("Response User ID: ", responseUserId);
    }
  }, [responseUserId]);

  useEffect(() => {
    if (tokenResponse) {
      console.log("Session token response: ", tokenResponse);
    }
  }, [tokenResponse]);

  useEffect(() => {
    if (accountResponse) {
      console.log("Account response: ", accountResponse);
    }
  }, [accountResponse]);

  useEffect(() => {
    if (walletData) {
      console.log("Wallet data: ", walletData);
    }
  }, [walletData]);

  useEffect(() => {
    if (fundResponse) {
      console.log("Fund response: ", fundResponse);
    }
  }, [fundResponse]);

  useEffect(() => {
    if (walletBalances) {
      console.log("Wallet balances: ", walletBalances);
    }
  }, [walletBalances]);

  useEffect(() => {
    if (transferResponse) {
      console.log("Transfer response: ", transferResponse);
    }
  }, [transferResponse]);

  useEffect(() => {
    if (confirmResponse) {
      console.log("Confirm response: ", confirmResponse);
    }
  }, [confirmResponse]);

  useEffect(() => {
    if (decrementResponse) {
      console.log("Decrement response: ", decrementResponse);
    }
  }, [decrementResponse]);

  useEffect(() => {
    if (incrementResponse) {
      console.log("Increment response: ", incrementResponse);
    }
  }, [incrementResponse]);

  const handleDecrement = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contractExecution/decrement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userToken, walletId, idempotencyKey }),
      });
      const data = await response.json();
      setDecrementResponse(data);
      toast.success("Decrement successful!");
    } catch (error) {
      console.error(error);
      toast.error("Decrement failed.");
    }
  };

  const handleIncrement = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contractExecution/increment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userToken, walletId, idempotencyKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
      }

      const data = await response.json();
      setIncrementResponse(data);
      toast.success("Increment successful!");
    } catch (error) {
      console.error("Increment failed:", error.message);
      toast.error(`Increment failed: ${error.message}`);
    }
  };

  useEffect(() => {
    if (executionResponse) {
      console.log("Execution response: ", executionResponse);
    }
  }, [executionResponse]);

  const handleReadContract = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contractExecution/getCount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
      }

      const data = await response.json();
      console.log("Read Contract Response:", data);
      setResponseCountData(data);
      toast.success("Read contract successful!");
    } catch (error) {
      console.error("Read contract failed:", error.message);
      toast.error(`Read contract failed: ${error.message}`);
    }
  };

  useEffect(() => {
    if (responseCountData) {
      console.log("Response Count Data: ", responseCountData);
    }
  }, [responseCountData]);

  const confirmTransaction = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!sdk) {
          sdk = new W3SSdk();
        }

        sdk.setAppSettings({ appId });

        sdk.setAuthentication({
          userToken,
          encryptionKey,
        });

        sdk.execute(challengeId, (error, result) => {
          if (error) {
            toast.error(`Error: ${error?.message ?? "Error!"}`);
            return;
          }
          toast.success(
            `Transaction confirmed: ${result?.type}, Status: ${result?.status}`
          );
          console.log("Transaction confirmed: ", result);
          setConfirmResponse(result);
        });
      } catch (error) {
        console.error("Error confirming transaction:", error.message);
        toast.error("An error occurred while confirming the transaction.");
      }
    },
    [appId, userToken, encryptionKey, challengeId]
  );

  const confirmExecution = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!sdk) {
          sdk = new W3SSdk();
        }

        sdk.setAppSettings({ appId });

        sdk.setAuthentication({
          userToken,
          encryptionKey,
        });

        sdk.execute(challengeId, (error, result) => {
          if (error) {
            toast.error(`Error: ${error?.message ?? "Error!"}`);
            return;
          }
          toast.success(
            `Transaction confirmed: ${result?.type}, Status: ${result?.status}`
          );
          console.log("Transaction confirmed: ", result);
          setExecutionResponse(result);
        });
      } catch (error) {
        console.error("Error confirming transaction:", error.message);
        toast.error("An error occurred while confirming the transaction.");
      }
    },
    [appId, userToken, encryptionKey, challengeId]
  );

  return (
    <div className="bg-red-300 min-h-screen flex flex-col space-y-12 justify-center items-center">
      <div className="flex justify-center items-center">
        <button
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
          onClick={() => getAppId(setAppIdnew)}
        >
          Get App Id
        </button>
      </div>
      <form
        onSubmit={(e) => createNewUser(e, userId, setResponseUserId)}
        className="justify-center items-center"
      >
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID (must more than 5 characters)"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <button
          type="submit"
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
        >
          Create User
        </button>
      </form>
      <form onSubmit={(e) => createSessionToken(e, userId, setTokenResponse)}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <button
          type="submit"
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
        >
          Session Token
        </button>
      </form>
      <form
        onSubmit={(e) =>
          initializeAccount(
            e,
            userToken,
            idempotencyKey,
            blockchain,
            setAccountResponse
          )
        }
      >
        <input
          type="text"
          value={userToken}
          onChange={(e) => setUserToken(e.target.value)}
          placeholder="Enter User Token"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={idempotencyKey}
          onChange={(e) => setIdempotencyKey(e.target.value)}
          placeholder="Enter Idempotency Key"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={blockchain}
          onChange={(e) => setBlockchain(e.target.value)}
          placeholder="Enter Blockchain"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <button
          type="submit"
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
        >
          Initialize Account
        </button>
      </form>
      <form
        onSubmit={(e) =>
          executeChallenge(
            e,
            sdk,
            appId,
            userToken,
            encryptionKey,
            challengeId,
            toast
          )
        }
      >
        <input
          type="text"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          placeholder="Enter App ID"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={userToken}
          onChange={(e) => setUserToken(e.target.value)}
          placeholder="Enter User Token"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={challengeId}
          onChange={(e) => setChallengeId(e.target.value)}
          placeholder="Enter Challenge ID"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
          placeholder="Enter Encryption Key"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <button
          type="submit"
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
        >
          Execute Challenge
        </button>
      </form>
      <form
        onSubmit={(e) => fetchWalletData(e, userToken, setError, setWalletData)}
      >
        <div>
          <input
            type="text"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            required
            placeholder="Enter User Token"
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
          />
        </div>
        <button
          type="submit"
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
        >
          Fetch Wallet Data
        </button>
      </form>
      <form onSubmit={(e) => fundWallet(e, address, setError, setFundResponse)}>
        <div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter Wallet Address"
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
          />
        </div>
        <button
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
          type="submit"
        >
          Fund Wallet
        </button>
      </form>
      <form
        onSubmit={(e) =>
          getWalletBalances(e, walletId, setError, setWalletBalances)
        }
      >
        <div>
          <input
            type="text"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Wallet ID"
          />
        </div>
        <button
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
          type="submit"
        >
          Get Balances
        </button>
      </form>
      <form
        onSubmit={(e) =>
          initiateTransfer(
            e,
            idempotencyKey,
            userId,
            destinationAddress,
            refId,
            amounts,
            tokenId,
            walletId,
            userToken,
            setError,
            setTransferResponse
          )
        }
      >
        <div>
          <input
            type="text"
            value={idempotencyKey}
            onChange={(e) => setIdempotencyKey(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Idempotency Key"
          />
        </div>
        <div>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter User ID"
          />
        </div>
        <div>
          <input
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Destination Address"
          />
        </div>
        <div>
          <input
            type="text"
            value={refId}
            onChange={(e) => setRefId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Reference ID"
          />
        </div>
        <div>
          <input
            type="text"
            value={amounts}
            onChange={(e) => setAmounts([e.target.value])}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Amount"
          />
        </div>
        <div>
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Token ID"
          />
        </div>
        <div>
          <input
            type="text"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Wallet ID"
          />
        </div>
        <div>
          <input
            type="text"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter User Token"
          />
        </div>
        <button
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
          type="submit"
        >
          Initiate Transfer
        </button>
      </form>
      <form onSubmit={confirmTransaction}>
        <div>
          <input
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter App ID"
          />
        </div>
        <div>
          <input
            type="text"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter User Token"
          />
        </div>
        <div>
          <input
            type="text"
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Encryption Key"
          />
        </div>
        <div>
          <input
            type="text"
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Challenge ID"
          />
        </div>
        <button
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
          type="submit"
        >
          Confirm Transaction
        </button>
      </form>
      <form onSubmit={handleIncrement} className="flex flex-col space-y-4">
        <input
          type="text"
          value={userToken}
          onChange={(e) => setUserToken(e.target.value)}
          placeholder="Enter User Token"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
          placeholder="Enter Wallet ID"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={idempotencyKey}
          onChange={(e) => setIdempotencyKey(e.target.value)}
          placeholder="Enter Idempotency Key"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <button
          type="submit"
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
        >
          Increment
        </button>
      </form>
      <form onSubmit={handleDecrement} className="flex flex-col space-y-4">
        <input
          type="text"
          value={userToken}
          onChange={(e) => setUserToken(e.target.value)}
          placeholder="Enter User Token"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
          placeholder="Enter Wallet ID"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <input
          type="text"
          value={idempotencyKey}
          onChange={(e) => setIdempotencyKey(e.target.value)}
          placeholder="Enter Idempotency Key"
          required
          className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
        />
        <button
          type="submit"
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
        >
          Decrement
        </button>
        <button
          onClick={handleReadContract}
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
        >
          Read Contract
        </button>
      </form>
      
      <form onSubmit={ confirmExecution }>
        <div>
          <input
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter App ID"
          />
        </div>
        <div>
          <input
            type="text"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter User Token"
          />
        </div>
        <div>
          <input
            type="text"
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Encryption Key"
          />
        </div>
        <div>
          <input
            type="text"
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
            required
            className="w-64 h-16 opacity-80 rounded-xl flex justify-center items-center"
            placeholder="Enter Challenge ID"
          />
        </div>
        <button
          className="w-64 h-16 bg-teal-400 rounded-xl flex justify-center items-center"
          type="submit"
        >
          Confirm Execution
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
