import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";

export const getAppId = async (setAppIdnew) => {
  try {
    const response = await fetch("/api/appId");
    const result = await response.json();
    if (result && result.data && result.data.appId) {
      setAppIdnew(result.data.appId);
      console.log("AppId: " + result.data.appId);
    } else {
      console.error("appId not found in data");
    }
  } catch (error) {
    console.error("Error fetching appId:", error);
  }
};

export const createNewUser = async (e, userId, setResponseUserId) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const result = await res.json();
    setResponseUserId(result);
  } catch (error) {
    console.error(error);
    setResponseUserId({ error: "An error occurred" });
  }
};

export const createSessionToken = async (e, userId, setTokenResponse) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/session-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const result = await res.json();
    setTokenResponse(result);
  } catch (error) {
    console.error(error);
    setTokenResponse({ error: "An error occurred" });
  }
};

export const initializeAccount = async (e, userToken, idempotencyKey, blockchain, setAccountResponse) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/users/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userToken,
        idempotencyKey,
        blockchains: [blockchain],
      }),
    });
    const result = await res.json();
    setAccountResponse(result);
  } catch (error) {
    console.error(error);
    setAccountResponse({ error: "An error occurred" });
  }
};

export const executeChallenge = async (e, sdk, appId, userToken, encryptionKey, challengeId, toast) => {
  e.preventDefault();
  try {
    if (!sdk) {
      sdk = new W3SSdk();
    }

    sdk.setAppSettings({ appId });
    sdk.setAuthentication({ userToken, encryptionKey });

    sdk.execute(challengeId, (error, result) => {
      if (error) {
        toast.error(`Error: ${error?.message ?? "Error!"}`);
        return;
      }
      toast.success(`Challenge: ${result?.type}, Status: ${result?.status}`);
      console.log("Challenge executed: ", result);
    });
  } catch (error) {
    console.error("Error executing challenge:", error.message);
    toast.error("An error occurred while executing the challenge.");
  }
};

export const fetchWalletData = async (e, userToken, setError, setWalletData) => {
  e.preventDefault();
  setError("");
  setWalletData(null);

  try {
    const response = await fetch("/api/checkWalletStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userToken }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }
    setWalletData(data);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};

export const fundWallet = async (e, address, setError, setFundResponse) => {
  e.preventDefault();
  setError("");
  setFundResponse(null);

  try {
    const response = await fetch("/api/fundWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }
    setFundResponse(data);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};

export const getWalletBalances = async (e, walletId, setError, setWalletBalances) => {
  e.preventDefault();
  setError("");
  setWalletBalances(null);

  try {
    const response = await fetch("/api/getWalletBalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletId }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }
    setWalletBalances(data);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};

export const initiateTransfer = async (e, idempotencyKey, userId, destinationAddress, refId, amounts, tokenId, walletId, userToken, setError, setTransferResponse) => {
  e.preventDefault();
  setError("");
  setTransferResponse(null);

  try {
    const response = await fetch("/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotencyKey,
        userId,
        destinationAddress,
        refId,
        amounts,
        tokenId,
        walletId,
        userToken,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }
    setTransferResponse(data);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};

export const confirmTransaction = async (e, sdk, appId,userToken, encryptionKey, setConfirmResponse, challengeId,toast) => {
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
      toast.success(`Transaction confirmed: ${result?.type}, Status: ${result?.status}`);
      console.log("Transaction confirmed: ", result);
      setConfirmResponse(result);
    });
  } catch (error) {
    console.error("Error confirming transaction:", error.message);
    toast.error("An error occurred while confirming the transaction.");
  }
};

export const confirmExecution = async (e, sdk, appId, userToken, encryptionKey, setExecutionResponse, challengeId, toast) => {
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
      toast.success(`Execution confirmed: ${result?.type}, Status: ${result?.status}`);
      console.log("Execution confirmed: ", result);
      setExecutionResponse(result);
    });
  } catch (error) {
    console.error("Error confirming execution:", error.message);
    toast.error("An error occurred while confirming the execution.");
  }
};