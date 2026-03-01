const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {
  let multiSig;
  let owner1, owner2, owner3;

  beforeEach(async function () {
    [owner1, owner2, owner3] = await ethers.getSigners();

    const MultiSig = await ethers.getContractFactory("MultiSigWallet");

    multiSig = await MultiSig.deploy(
      [owner1.address, owner2.address, owner3.address],
      2
    );

    await multiSig.deployed();
  });

  it("Should set correct owners", async function () {
    expect(await multiSig.isOwner(owner1.address)).to.equal(true);
    expect(await multiSig.isOwner(owner2.address)).to.equal(true);
    expect(await multiSig.isOwner(owner3.address)).to.equal(true);
  });

  it("Should require correct number of confirmations", async function () {
    expect((await multiSig.required()).toNumber()).to.equal(2);
  });

  it("Should allow owner to submit transaction", async function () {

  const to = owner2.address;
  const value = 100;
  const data = "0x";

  await multiSig.connect(owner1).submitTransaction(to, value, data);

  const tx = await multiSig.transactions(0);

  expect(tx.to).to.equal(to);
  expect(tx.value.toNumber()).to.equal(100);
  expect(tx.executed).to.equal(false);
  expect(tx.numConfirmations.toNumber()).to.equal(0);

});


it("Should allow owner to confirm transaction", async function () {

  const to = owner2.address;
  const value = 0;
  const data = "0x";

  await multiSig.connect(owner1).submitTransaction(to, value, data);

  await multiSig.connect(owner2).confirmTransaction(0);

  const tx = await multiSig.transactions(0);

  expect(tx.numConfirmations.toNumber()).to.equal(1);
});

it("Should not allow double confirmation", async function () {

  await multiSig.connect(owner1).submitTransaction(owner2.address, 0, "0x");

  await multiSig.connect(owner2).confirmTransaction(0);

  await expect(
    multiSig.connect(owner2).confirmTransaction(0)
  ).to.be.reverted;

});


});
