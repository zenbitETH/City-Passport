// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const CityPassport = await ethers.getContractFactory("CityPassport");
  const cityPassport = await upgrades.deployProxy(CityPassport, ["CityPassport", "CTY", 1], { 'kind': 'uups', 'initializer': 'initialize'});
  await cityPassport.deployed();
  console.log("CityPassport deployed to:", cityPassport.address);
}

main();