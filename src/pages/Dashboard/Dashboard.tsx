import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
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
import { addTask, getTasks, deleteTask, updateTask } from "../../services/taskService";
import TaskModal from "./TaskModal";
import Header from "../../components/Layout/Header";

// Import drag-and-drop components from react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragDropComponent from "./DragDropComponent";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Failed to get tasks");
    }
  };

  const handleAddTask = async (taskName: string, taskDescription: string) => {
    try {
      const response = await addTask(taskName, taskDescription);
      if (response.data) {
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

  // Handle drag and drop reordering
  const handleOnDragEnd = (result: any) => {
    const { source, destination } = result;

    // If the item is dropped outside of a valid droppable area, do nothing
    if (!destination) return;

    // If the item is dropped at the same position, do nothing
    if (source.index === destination.index) return;

    // Reorder tasks based on the drag result
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    setTasks(reorderedTasks);
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
          <Typography
            variant="h4"
            sx={{
              marginBottom: 3,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Task Manager
          </Typography>
          <Box
            sx={{
              display: "flex",
              marginBottom: 3,
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setTaskName("");
                setTaskDescription("");
                setEditingTask(null);
                setShowModal(true);
              }}
              sx={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "#6200ea",
                color: "#fff",
                borderRadius: "8px",
              }}
            >
              Add Task
            </Button>
          </Box>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="task-list">
              {(provided) => (
                <TableContainer
                  component={Paper}
                  elevation={3}
                  sx={{ borderRadius: "8px", marginBottom: 3 }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
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
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <TableRow
                              key={task.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
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
                          )}
                        </Draggable>
                      ))}
                    </TableBody>
                  </Table>
                  {provided.placeholder}
                </TableContainer>
              )}
            </Droppable>
          </DragDropContext>
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
      <DragDropComponent/>
    </Box>
  );
};

export default Dashboard;
