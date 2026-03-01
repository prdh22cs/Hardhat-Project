// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TodoList {

    // 1. Define the Task structure
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // 2. Map each wallet address to their own list of tasks
    mapping(address => Task[]) private userTasks;

    // 3. Events to notify the frontend
    event TaskAdded(address indexed user, uint taskId, string content);
    event TaskCompleted(address indexed user, uint taskId);
    event TaskDeleted(address indexed user, uint taskId);

    // ✅ Add a new task
    function addTask(string memory _content) external {
        uint taskId = userTasks[msg.sender].length;
        userTasks[msg.sender].push(Task(taskId, _content, false));
        emit TaskAdded(msg.sender, taskId, _content);
    }

    // ✅ Mark a task as completed
    function completeTask(uint _taskId) external {
        require(_taskId < userTasks[msg.sender].length, "Task does not exist");
        userTasks[msg.sender][_taskId].completed = true;
        emit TaskCompleted(msg.sender, _taskId);
    }

    // ✅ Delete a task (replaces it with last task to avoid gaps)
    function deleteTask(uint _taskId) external {
        Task[] storage tasks = userTasks[msg.sender];
        require(_taskId < tasks.length, "Task does not exist");

        // Move last task into the deleted spot
        tasks[_taskId] = tasks[tasks.length - 1];
        tasks[_taskId].id = _taskId; // update the id
        tasks.pop();

        emit TaskDeleted(msg.sender, _taskId);
    }

    // ✅ Get all tasks for the caller
    function getTasks() external view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
}