import React from "react";
import Image from "next/image";

const Header = () => {
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
            <button className="bg-[#4757E4] h-14 w-64 text-2xl text-[#C4CAFF] rounded-2xl ">Create Account</button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
