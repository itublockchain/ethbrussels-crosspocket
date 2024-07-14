"use client";
import React from "react";
import Image from "next/image";
import {
  createNewUser,
  createSessionToken,
  initializeAccount,
  executeChallenge,
  fetchWalletData,
} from "../utils/functions"; 
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { toast,ToastContainer } from "react-toastify"; 

const Header = () => {
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await createNewUser();
      await createSessionToken();
      await initializeAccount();
      const sdk = new W3SSdk();
      const appId = "d6a14aa4-0e4e-5778-aff7-f34d51486a53"; 
      await executeChallenge(e, sdk, appId, toast);
  
      
      setTimeout(async () => {
        try {
          await fetchWalletData();
          toast.success("Account created and wallet data fetched successfully");
        } catch (error) {
          toast.error(`An error occurred while fetching wallet data: ${error.message}`);
          console.error("Error in fetching wallet data:", error);
        }
      }, 20000);
  
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error("Error in account creation process:", error);
    }
  };

  const walletAddress = localStorage.getItem("walletAddress");

  const formatAddress = (address) => {
    const maxLength = 16;
    if (address.length > maxLength) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-transparent">
      <nav className="flex flex-row justify-around">
        <Image
          src={"/logo.png"}
          alt="CrossPocket"
          width={200}
          height={200}
          className="pt-4"
        
        />
        <div className="bg-[#18227b] w-[580px] h-16 justify-center flex items-center rounded-b-full flex-row space-x-10">
          <h1 className="text-[#C4CAFF] text-lg bg-[#2E3993] h-10 w-20 flex text-center justify-center items-center rounded-2xl">Home</h1>
          <h1 className="text-[#C4CAFF] text-lg bg-[#2E3993] h-10 w-20 flex text-center justify-center items-center rounded-2xl">About</h1>
          <h1 className="text-[#C4CAFF] text-lg bg-[#2E3993] h-10 w-24 flex text-center justify-center items-center rounded-2xl">Contact</h1>
          <h1 className="text-[#C4CAFF] text-lg bg-[#2E3993] h-10 w-16 flex text-center justify-center items-center rounded-2xl">Blog</h1>
        </div>
        <div className="flex pt-4">
            <button className="bg-[#4757E4] h-14 w-64 text-2xl text-[#C4CAFF] rounded-2xl" onClick={handleCreateAccount}>{walletAddress ? formatAddress(walletAddress) : "Create Account"}</button>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Header;
