import React, { useCallback, useEffect, useState } from "react";

import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";

import cityPassport from "../contracts/AbiCityPassport.json";
import GovernorAlpha from "../contracts/GovernorAlpha.json";
const { ethers } = require("ethers");
const Moralis = require('moralis');

const DashboardUI = () => {
  //|:::: Fetching MINT_PRICE ::::|
  const cityPassportAbi = {
    abi: cityPassport,
    contractAddress: "0xB062BDccBF34B4c5dE7e8B6C795385e8d391331B",
    functionName: "MINT_PRICE",
    params: {},
  };

  fetch({
    params: cityPassportAbi,
    onError: (e) => console.log("#ERR", e),
			onSuccess: (res) => {
				console.log("#SUCCESS:", res);
      }
  });
 console.log('abi: ',GovernorAlpha.abi)
  // const providerUrlFromEnv = process.env.REACT_APP_PROVIDER;
  // const provider = new ethers.providers.StaticJsonRpcProvider(providerUrlFromEnv); //localhost
  // const provider = new ethers.providers.JsonRpcProvider(); //localhost
  const ethers = Moralis.web3Library;
  const provider = new ethers.providers.Web3Provider(window.ethereum); //Metamask
  const cityPassportContract = new ethers.Contract("0xB062BDccBF34B4c5dE7e8B6C795385e8d391331B", cityPassport, provider);
  const governorAlphaContract = new ethers.Contract("0x8B5C747CFa0CAb7BF45B83D8a76526B4F3C54FEb", GovernorAlpha.abi, provider);
  const [totalNumberOfProposals, setTotalNumberOfProposals] = useState(0);

  const getTokenURI = async () => {
    const tokenUri = await cityPassportContract.tokenURI(1);
    console.log('tokenUri :', tokenUri)
  }
  getTokenURI();

  const getMintPrice = async () => {
    const mintPrice = await cityPassportContract.MINT_PRICE();
    console.log('mintPrice :', Number(mintPrice))
  }
  getMintPrice();

  const getTotalNumberOfProposals = async () => {
    const total = await governorAlphaContract.proposalCount();
    setTotalNumberOfProposals(total);
  }
  getTotalNumberOfProposals();
  
  
  // const signer = provider.getSigner();
  // console.log("signer: ", signer);

  return (
    <div class="dashboard">
      <h2 class="dash-head">
        City Passport #1
        <div class="dash-city">
          Data from Querétaro City
        </div>
      </h2>
      <div class="dash-grid">
        <div>
          Project 1
        </div>
        <div>
          90%
        </div>
        <div>
          Ropsten
        </div>
        <div>
          10 validated users
        </div>
        <div>
          {totalNumberOfProposals} proposals
        </div>
        <div>
        🗂️
        </div>
        <div>
        📝
        </div>
        <div>
        🌐
        </div>
        
        <div>
          Project 2
        </div>
        <div>
          90%
        </div>
        <div>
          Ropsten
        </div>
        <div>
          10 validated users
        </div>
        <div>
          15 proposals
        </div>
        <div>
        🗂️
        </div>
        <div>
        📝
        </div>
        <div>
        🌐
        </div>

        <div>
          Project 3
        </div>
        <div>
          90%
        </div>
        <div>
          Ropsten
        </div>
        <div>
          10 validated users
        </div>
        <div>
          15 proposals
        </div>
        <div>
        🗂️
        </div>
        <div>
        📝
        </div>
        <div>
        🌐
        </div>
      </div>
      <h2 class="yellow">
        Your city NFTs
      </h2>
      <div class="nft-grid">
        <img src={nft1}/>
        <img src={nft2}/>
        <img src={nft3}/>
      </div>
    </div>
  );
};

export default DashboardUI;
