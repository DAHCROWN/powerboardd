const { v4: uuidv4 } = require("uuid");
import { EtherscanProvider, ethers } from "ethers";
import  {contractABI} from "../constants/abi"; // Update the path to your ABI file
import { useRouter } from "next/router";
import { useState } from "react";
import axios, { AxiosError } from "axios";


const {WALLET_PRIVATE} = process.env


export async function UpdateDBValues(props){
    // console.log("recieve props:", props)
    const apiRes = await axios.post(
        "https://powerboardd.vercel.app/api/netpower",
        props
      );
    return apiRes
}

function convertTo9Decimals(value) {
    // Check if the input is a number
    if (typeof value !== 'number') {
      throw new Error('Input must be a number');
    }
  
    // Multiply the value by 10^9 to get 9 decimals
    const scaledValue = value * 1e9;
  
    // Round the result to an integer
    const roundedValue = Math.round(scaledValue);
  
    // Return the result as a BigInt
    return BigInt(roundedValue);
  }

export async function UpdateValues(props) {
  const contractAddress = "0x24E2FA8d572029F626414c7E220eb633BECD6681";
  const abi = contractABI;
  // Connect to the Ethereum network
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/8_InHo4o-8rGSQ2vT3NUYmdBX2T-if3W");
  const wallet = new ethers.Wallet("5450f719b24c72d0c740e9b68a5df3163804901f6e8d27ae20acd8e450987f9d");
  const signer = wallet.connect(provider);
  console.log("Transaction Issued By:", signer);
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const convertedPower = convertTo9Decimals(props.netPower)
  const uploadToBlockchain = await contract.update(props.id, convertedPower);
    console.log("Update Smart Contract:", uploadToBlockchain);
}

