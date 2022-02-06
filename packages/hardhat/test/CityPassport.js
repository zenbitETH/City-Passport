const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CityPassport", async function () {
  const MINT_PRICE = ethers.utils.parseEther('0.01');

  it("Deploy and mint", async function () {
    const [owner, secondAddress] = await ethers.getSigners();

    const CityPassport = await ethers.getContractFactory("CityPassport");
    const cityPassport = await upgrades.deployProxy(CityPassport, ["CityPassport", "CTY", 1], { 'kind': 'uups', 'initializer': 'initialize'});
    await cityPassport.deployed();

    await expect(cityPassport.mint(secondAddress.address, { value: MINT_PRICE }));
    const tokenUri = await cityPassport.tokenURI(1);
    const json = JSON.parse(Buffer.from(tokenUri.substring(29), "base64").toString());
    const decodedSvg = Buffer.from(json.image_data.substring(25), "base64").toString();
    expect(decodedSvg).to.eq("<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='350' height='350'><style>.heavy { font: bold 21px sans-serif; }</style><rect x='0' y='0' width='350' height='350' stroke='#FFC338' stroke-width='0px' fill='white'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' class='heavy'>CityPassport #1 of 1</text></svg>");
  });
});
