const hre = require("hardhat"); //import the hardhat
const { utils } = require("ethers"); //import ethers.js

async function main() {
  //Set token URI
  const baseTokenURI = "ipfs://QmXs4f7xjyvte6mbbQ9ztGv66Devwfq9njtKbpHFDSNzpZ/";

  //Get owner/deployer's wallet address
  const [owner] = await hre.ethers.getSigners();

  //Get contract that we want to deploy
  const lRBH = await hre.ethers.getContractFactory('LockerRoomBrotherHood');
  //Deploy contract with correct constructor
  const contract = await lRBH.deploy(baseTokenURI);

  //Wait for this transaction to be minted
  await contract.deployed();

  //Get contract address
  console.log('Contract deployed to:', contract.address);

  //Reserve NFT
  let txn = await contract.reserveNft();
  await txn.wait();
  console.log("10 NFT have been reserved");
}

//Catching errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
