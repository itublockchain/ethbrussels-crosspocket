"use client";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import {
  createNewUser,
  createSessionToken,
  initializeAccount,
  executeChallenge,
  fetchWalletData,
  fundWallet,
  getWalletBalances,
  initiateTransfer,
} from "./utils/functions";
import Image from "next/image";
import { readContract } from "@wagmi/core";
import { SimplePriceFeed } from "./utils/priceFeed.json";
import { config } from "./utils/config";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [appId, setAppId] = useState("d6a14aa4-0e4e-5778-aff7-f34d51486a53");
  const [error, setError] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [refId, setRefId] = useState("Swap or Transaction");
  const [amounts, setAmounts] = useState([""]);
  const [activeButton, setActiveButton] = useState(null);
  const [price, setPrice] = useState<number>(0);

  const {
    data: pricefeed,
    refetch,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["pricefeed"],
    refetchOnMount: false,
    queryFn: async () => {
      const data: any = await readContract(config, {
        abi: SimplePriceFeed,
        address: "0xE6d3933790b2cfF7faD19eb68cd7627b57d46184",
        functionName: "getPrice",
      });
      return data;
    },
  });

  const newPriceFeed = Number(pricefeed) / 100000000;

  const handleClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  const buttonClasses = (buttonName: any) =>
    `w-44 h-12 rounded-2xl text-2xl ${
      activeButton === buttonName
        ? "bg-white text-[#18227B] border-2 border-[#18227B] font-bold"
        : "bg-[#6E78CE] text-white"
    }`;

  let sdk: W3SSdk;

  1;
  // const confirmTransaction = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     try {
  //       if (!sdk) {
  //         sdk = new W3SSdk();
  //       }

  //       sdk.setAppSettings({ appId });

  //       sdk.setAuthentication({
  //         userToken,
  //         encryptionKey,
  //       });

  //       sdk.execute(challengeId, (error, result) => {
  //         if (error) {
  //           toast.error(`Error: ${error?.message ?? "Error!"}`);
  //           return;
  //         }
  //         toast.success(
  //           `Transaction confirmed: ${result?.type}, Status: ${result?.status}`
  //         );
  //         console.log("Transaction confirmed: ", result);
  //         setConfirmResponse(result);
  //       });
  //     } catch (error) {
  //       console.error("Error confirming transaction:", error.message);
  //       toast.error("An error occurred while confirming the transaction.");
  //     }
  //   },
  //   [appId, userToken, encryptionKey, challengeId]
  // );

  return (
    <div className="min-h-screen bg-[url('/page.png')] bg-cover bg-center justify-center items-center flex">
      <div className="bg-white w-[800px] h-[730px] flex justify-center items-center border-[#18227B] border-4 rounded-2xl">
        <div className="bg-white w-[770px] h-[700px] flex items-center border-[#18227B] border-4 rounded-2xl flex-col space-y-8 pt-14">
          <h1 className="text-5xl font-bold text-[#4757E4]">
            3.5118 SepoliaETH
          </h1>
          <div className="flex space-x-8">
            <button
              className={buttonClasses("Polygon")}
              onClick={() => handleClick("Polygon")}
            >
              Polygon
            </button>
            <button
              className={buttonClasses("Ethereum")}
              onClick={() => handleClick("Ethereum")}
            >
              Ethereum
            </button>
            <button
              className={buttonClasses("Arbitrum")}
              onClick={() => handleClick("Arbitrum")}
            >
              Arbitrum
            </button>
          </div>
          <div className="flex justify-center flex-col items-center space-y-4">
            <h1 className="text-black text-3xl">
            Recommended Price: {newPriceFeed * price} USDC
            </h1>
            <h1 className="text-black w-64 h-10 bg-[#ACB3F8] text-center items-center flex justify-center rounded-2xl text-xl font-bold">
              Output:{" "}
              <input
                type="text"
                placeholder=""
                className="bg-transparent border-[#18227B] border-2 rounded-3xl w-20 pl-2 border-opacity-40"
                onChange={(e) => setPrice(e.target.value)}
              />{" "}
              USDC
            </h1>
          </div>
          <div className="flex flex-row space-x-8">
            <div className="flex flex-col items-center justify-center text-center">
              <button className="w-12 h-12 rounded-2xl bg-[#18227B] flex justify-center items-center">
                <Image src={"/send.png"} alt="send" width={30} height={30} />
              </button>
              <h1 className="text-gray-500 text-lg text-center">Send</h1>
            </div>
            <button className="w-40 h-12 bg-[#18227B] text-white text-2xl font-bold justify-center items-center text-center rounded-xl">
              SWAP
            </button>
          </div>

          <div className="bg-[#ACB3F8] w-[600px] h-[220px] rounded-2xl bg-opacity-45 border-[#ACB3F8] border-4 flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <Image
                  src={"/swap.png"}
                  alt="swap"
                  width={100}
                  height={100}
                  className=""
                />
                <div className="flex flex-col items-center justify-center text-center pb-4">
                  <h1 className="text-black text-2xl font-bold">USDC Sent</h1>
                  <h1 className="text-[#3041D9] pr-14 ">Approved</h1>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center pb-4 pr-4 ">
                <h1 className="text-[#6E78CE] text-xl">-$358.51..</h1>
                <h1 className="text-[#6E78CE] text-opacity-60">
                  July 14, 2024
                </h1>
              </div>
            </div>
            <div className="justify-center items-center flex pb-4 relative top-[-23px]">
              <Image src={"/vector.png"} alt="" height={1} width={550} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
