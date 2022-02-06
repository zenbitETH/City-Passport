import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import axios from "axios";

import { formatEther } from "@ethersproject/units";
import { usePoller } from "eth-hooks";

import passport from "../assets/citypass.png"

const MainUI = ({ loadWeb3Modal, address, tx, priceToMint, readContracts, writeContracts }) => {
  const [collection, setCollection] = useState({
    loading: true,
    items: [],
  });
  const [floor, setFloor] = useState("0.0");

  usePoller(async () => {
    if (readContracts && address) {
      console.log('readContract :', readContracts)
      const floorPrice = await readContracts.ExampleNFT.MINT_PRICE();
      setFloor(formatEther(floorPrice));
    }
  }, 1500);

  const getTokenURI = async (ownerAddress, index) => {
    const id = await readContracts.ExampleNFT.tokenOfOwnerByIndex(ownerAddress, index);
    const tokenURI = await readContracts.ExampleNFT.tokenURI(id);
    const metadata = await axios.get(tokenURI);
    const approved = await readContracts.ExampleNFT.getApproved(id);
    return { ...metadata.data, id, tokenURI, approved: approved === writeContracts.ExampleNFT.address };
  };

  const loadCollection = async () => {
    if (!address || !readContracts || !writeContracts) return;
    setCollection({
      loading: true,
      items: [],
    });
    const balance = (await readContracts.ExampleNFT.balanceOf(address)).toNumber();
    const tokensPromises = [];
    for (let i = 0; i < balance; i += 1) {
      tokensPromises.push(getTokenURI(address, i));
    }
    const tokens = await Promise.all(tokensPromises);
    setCollection({
      loading: false,
      items: tokens,
    });
  };

  const redeem = async id => {
    try {
      const redeemTx = await tx(writeContracts.ExampleNFT.redeem(id));
      await redeemTx.wait();
    } catch (e) {
      console.log("redeem tx error:", e);
    }
    loadCollection();
  };

  const approveForBurn = async id => {
    try {
      const approveTx = await tx(writeContracts.ExampleNFT.approve(writeContracts.ExampleNFT.address, id));
      await approveTx.wait();
    } catch (e) {
      console.log("Approve tx error:", e);
    }
    loadCollection();
  };

  useEffect(() => {
    if (readContracts.ExampleNFT) loadCollection();
  }, [address, readContracts, writeContracts]);

  return (
    <div style={{ maxWidth: 768, margin: "20px auto" }}>
      {address ? (
        <>
          <div >
            <img src={passport} class="pass"/>
            {collection.items.length === 0 && <h2 class="yellow">You don't have a City Passport yet</h2>}
            {collection.items.length > 0 &&
              collection.items.map(item => (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                  <div>
                      <div class="redeem-bt" onClick={() => redeem(item.id)}>
                        Redeem physical passport
                      </div>
                  </div>
                </div>
              ))}
          </div>
          
          <div
            className="mint-bt"
          
            onClick={async () => {
              const priceRightNow = await readContracts.ExampleNFT.price();
              try {
                const txCur = await tx(writeContracts.ExampleNFT.mintItem(address, { value: priceRightNow }));
                await txCur.wait();
              } catch (e) {
                console.log("mint failed", e);
              }
              loadCollection();
            }}
          >
            MINT for  {priceToMint && (+ethers.utils.formatEther(priceToMint)).toFixed(4)} Ξ
          </div>
          <h2>Current floor price = {floor.substr(0, 6)} ETH</h2>
        </>
      ) : (
        <div key="loginbutton" type="primary" onClick={loadWeb3Modal}>
          Connect to mint
        </div>
      )}
    </div>
  );
};

export default MainUI;
