const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying TodoList contract...");
  const TodoList = await ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();
  await todoList.deployed();
  console.log("✅ TodoList deployed to:", todoList.address);
}                                          // ← this was missing!

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});