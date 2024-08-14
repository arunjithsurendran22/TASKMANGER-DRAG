import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Header from "../../components/Layout/Header";
import {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "../../services/taskService";

interface Task {
  _id: string;
  name: string;
  status: string;
  createdUser: string;
  createdAt: string;
  updatedUser: string | null;
  updatedAt: string;
  documentStatus: boolean;
  __v: number;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data.tasks);
    } catch (error: any) {
      console.log("Failed to get tasks");
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await addTask(taskName);
      if (response.data) {
        const newTask = response.data.task;
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskName("");
      }
    } catch (error: any) {
      console.log("Failed to add task");
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const response = await deleteTask(taskId);
      if (response.data) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      }
    } catch (error: any) {
      console.log("Failed to delete task");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTaskName(task.name);
    setShowModal(true);
  };

  const handleUpdateTask = async () => {
    if (editingTask) {
      try {
        const response = await updateTask(editingTask._id, taskName);
        if (response.data) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === editingTask._id ? { ...task, name: taskName } : task
            )
          );
          setShowModal(false);
          setEditingTask(null);
          setTaskName("");
        }
      } catch (error: any) {
        console.log("Failed to update task");
      }
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const response = await updateTaskStatus(taskId, newStatus);
      if (response.data) {
        fetchTasks();
      }
    } catch (error: any) {
      console.log("Failed to update task status");
    }
  };

  return (
    <div className=" container  mx-auto min-h-screen bg-black p-6 text-white">
      <Header />
      <div className=" mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Task Manager</h2>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="w-full p-2 border border-gray-700 rounded-lg mr-2 bg-gray-800 text-white"
          />
          <button
            onClick={editingTask ? handleUpdateTask : handleAddTask}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
          >
            { "ADD"}
          </button>
        </div>
        <table className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left">Task</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: Task) => (
              <tr key={task._id} className="border-b border-gray-700">
                <td className="p-4">{task.name}</td>
                <td className="p-4">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                    className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing task */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-lg mb-4 bg-gray-800 text-white"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdateTask}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
