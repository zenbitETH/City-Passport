import React from "react";

import nft1 from "../assets/nft1.png"
import nft2 from "../assets/nft2.png"
import nft3 from "../assets/nft3.png"

const DashboardUI = () => {
  

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
