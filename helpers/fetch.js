const { v4: uuidv4 } = require("uuid");
import { EtherscanProvider, ethers } from "ethers";
import  {contractABI} from "../constants/abi"; // Update the path to your ABI file
import { useRouter } from "next/router";
import { useState } from "react";
import axios, { AxiosError } from "axios";

const PowerCycleRefresh = Date();
//replace with timestamp
const currentTime = new Date();
const formattedDate = currentTime.toISOString().split("T")[0];
const nextEndTime = currentTime;


export async function UpdateDBValues(props){
    console.log("recieve props:", props)
    const apiRes = await axios.post(
        "http://localhost:3000/api/netpower",
        props
      );
    return apiRes
}

// async function UpdateValues() {
//   // ***
//   const contractAddress = "0x2E0175CEA14e6162C5Cb23078e5B8ddD8639ff77";
//   const abi = contractABI;
//   // Connect to the Ethereum network
//   const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/8_InHo4o-8rGSQ2vT3NUYmdBX2T-if3W");
//   const wallet = new ethers.Wallet( "5450f719b24c72d0c740e9b68a5df3163804901f6e8d27ae20acd8e450987f9d");
//   const signer = wallet.connect(provider);
//   console.log("Transaction Issued By:", signer);
//   const contract = new ethers.Contract(contractAddress, Abi, signer);

//   //replace with timestamp
//   const currentTimeStamp = 0;
    
//   if (currentTimeStamp < nextEndTime) {
//     //update the next power cycle
    
//   }
// }

