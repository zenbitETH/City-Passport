import React, { useState } from "react";

import {  Input } from "antd";
import { formatEther, parseEther } from "@ethersproject/units";
import { usePoller } from "eth-hooks";
import stage1 from "../assets/stage1.png";
import stage2 from "../assets/stage2.png";
import stage3 from "../assets/stage3.png";

const WhalesUI = ({ readContracts, address, writeContracts, tx, userSigner }) => {
  const [q, setQ] = useState("");
  const [floor, setFloor] = useState("0.0");

  usePoller(async () => {
    if (readContracts && address) {
      const floorPrice = await readContracts.ExampleNFT.MINT_PRICE();
      setFloor(formatEther(floorPrice));
    }
  }, 1500);

  const increaseFloor = async () => {
    tx(
      userSigner.sendTransaction({
        to: writeContracts.ExampleNFT.address,
        value: parseEther(q),
      }),
    );
  };

  return (
    <div>
      <div class="roadgrid">
        <img src={stage1}/>
        <img src={stage2}/>
        <img src={stage3}/>
      </div>
      <div style={{ display: "flex", alignItems: "center", maxWidth: 300, margin: "0 auto", marginBottom: "10px" }}>
        <label htmlFor="quantity" style={{ flexGrow: 1, flex: 1, textAlign: "left" }}>
        Retroactive Funding:
        </label>
        <Input
          className ="input-eth"
          type="number"
          placeholder="1 ETH"
          id="quantity"
          style={{ flex: 2 }}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>
      <h2>Current floor price = {floor.substr(0, 6)} ETH</h2>
      <div class="yolo-bt" disabled={q === ""} onClick={increaseFloor}>
        Deposit
      </div>
    </div>
  );
};

export default WhalesUI;
