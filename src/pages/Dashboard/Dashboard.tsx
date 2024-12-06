import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
  updateRank,
} from "../../services/taskService";
import TaskModal from "./TaskModal";
import Header from "../../components/Layout/Header";
import toast from "react-hot-toast";

interface Task {
  id: number;
  title: string;
  description?: string;
  rank: number | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();

      // Separate tasks into those with and without a rank
      const tasksWithRank = response.data.tasks.filter(
        (task: Task) => task.rank !== null
      );
      const tasksWithoutRank = response.data.tasks.filter(
        (task: Task) => task.rank === null
      );

      // Sort tasks with rank in ascending order
      const sortedTasksWithRank = tasksWithRank.sort(
        (a: Task, b: Task) => a.rank! - b.rank!
      );

      // Combine sorted tasks with rank first and then tasks without rank
      const sortedTasks = [...sortedTasksWithRank, ...tasksWithoutRank];

      setTasks(sortedTasks);
    } catch (error) {
      console.log("Failed to get tasks");
    }
  };

  const handleAddTask = async (taskName: string, taskDescription: string) => {
    try {
      const response = await addTask(taskName, taskDescription);
      if (response.message === "Task with this title already exists.") {
        toast.error(response.message);
      }

      if (response.data) {
        toast.success("successfully added task");
        setTasks((prevTasks) => [...prevTasks, response.data.task]);
        setTaskName("");
        setTaskDescription("");
        setShowModal(false);
      }
    } catch (error) {
      console.log("Failed to add task");
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      const response = await deleteTask(taskId);
      if (response.data) {
        toast.success("successfully deleted");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.log("Failed to delete task");
    }
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setTaskName(task.title);
    setTaskDescription(task.description);
    setShowModal(true);
  };

  const handleUpdateTask = async (
    taskId: number,
    taskName: string,
    taskDescription: string
  ) => {
    try {
      const response = await updateTask(taskId, taskName, taskDescription);
      if (response.data) {
        toast.success("successfully updated");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? { ...task, title: taskName, description: taskDescription }
              : task
          )
        );
        setShowModal(false);
        setEditingTask(null);
        setTaskName("");
        setTaskDescription("");
      }
    } catch (error) {
      console.log("Failed to update task");
    }
  };

  const toggleDescription = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  // Drag and Drop Handlers with Rank Update
  const handleDragStart = (index: number) => {
    setDraggedTaskIndex(index);
  };

  const handleDrop = async (dropIndex: number) => {
    if (draggedTaskIndex !== null && draggedTaskIndex !== dropIndex) {
      const updatedTasks = [...tasks];

      // Get the dragged task and the dropped task
      const draggedTask = updatedTasks[draggedTaskIndex];
      const droppedTask = updatedTasks[dropIndex];

      // Swap their positions in the tasks array
      updatedTasks[draggedTaskIndex] = droppedTask;
      updatedTasks[dropIndex] = draggedTask;

      // Update the ranks of the tasks
      const newDraggedRank = dropIndex; // The new position of the dragged task
      const newDroppedRank = draggedTaskIndex; // The new position of the dropped task

      // Update the ranks in the UI
      setTasks(updatedTasks);

      try {
        // Update the ranks by calling the API
        await updateRank(draggedTask.id, newDraggedRank);
        await updateRank(droppedTask.id, newDroppedRank);
        console.log(
          `Task ${draggedTask.id} updated with new rank: ${newDraggedRank}`
        );
        console.log(
          `Task ${droppedTask.id} updated with new rank: ${newDroppedRank}`
        );
      } catch (error) {
        console.error("Failed to update ranks", error);
      }
    }
    setDraggedTaskIndex(null); // Reset dragged index
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#f4f7f6",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "80%", maxWidth: 900, textAlign: "center" }}>
          <Box display="flex" justifyContent="center">
            <Typography
              variant="h4"
              sx={{
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Add Your Task
            </Typography>
            <Button sx={{}}>
              <AddCircleIcon
                onClick={() => {
                  setTaskName("");
                  setTaskDescription("");
                  setEditingTask(null);
                  setShowModal(true);
                }}
              />
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginBottom: 3,
              justifyContent: "center",
              gap: 2,
            }}
          ></Box>

          <TableContainer
            component={Paper}
            elevation={3}
            sx={{ borderRadius: "8px", marginBottom: 3 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                    No.
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                    Task
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      textAlign: "right",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDrop={() => handleDrop(index)}
                    onDragOver={handleDragOver}
                    sx={{ cursor: "move" }}
                  >
                    <TableCell sx={{ paddingRight: "0px" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ paddingRight: "0px" }}>
                      <Box
                        onClick={() => toggleDescription(task.id)}
                        sx={{
                          cursor: "pointer",
                          fontSize: "18px",
                          color: "#2e3a46",
                          fontWeight: "600",
                        }}
                      >
                        {task.title}
                      </Box>
                      {expandedTask === task.id && (
                        <Box
                          sx={{
                            marginTop: 1,
                            fontSize: "14px",
                            color: "#555",
                            padding: 1,
                            backgroundColor: "#f7f7f7",
                            borderRadius: "4px",
                            width: "600px",
                            display: "inline-block",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {task.description}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(task)}
                        sx={{
                          marginRight: 1,
                          padding: "8px 16px",
                          position: "relative",
                          top: "5px",
                        }}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(task.id)}
                        sx={{
                          padding: "8px 16px",
                          position: "relative",
                          top: "5px",
                        }}
                      >
                        <FaTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <TaskModal
          open={showModal}
          onClose={() => setShowModal(false)}
          task={editingTask}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
