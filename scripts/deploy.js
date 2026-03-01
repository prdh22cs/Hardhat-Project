const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  const owners = [
    deployer.address,
    "0x0000000000000000000000000000000000000001",
    "0x0000000000000000000000000000000000000002"
  ];

  const required = 2;

  const MultiSig = await ethers.getContractFactory("MultiSigWallet");
  const multiSig = await MultiSig.deploy(owners, required);

  await multiSig.deployed();

  console.log("MultiSig deployed to:", multiSig.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
