const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", function () {
  let todoList, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
  });

  it("Should add a task", async function () {
    await todoList.addTask("Learn Solidity");
    const tasks = await todoList.getTasks();
    expect(tasks.length).to.equal(1);
    expect(tasks[0].content).to.equal("Learn Solidity");
  });

  it("Should complete a task", async function () {
    await todoList.addTask("Learn Hardhat");
    await todoList.completeTask(0);
    const tasks = await todoList.getTasks();
    expect(tasks[0].completed).to.equal(true);
  });

  it("Should delete a task", async function () {
    await todoList.addTask("Task 1");
    await todoList.addTask("Task 2");
    await todoList.deleteTask(0);
    const tasks = await todoList.getTasks();
    expect(tasks.length).to.equal(1);
  });
});