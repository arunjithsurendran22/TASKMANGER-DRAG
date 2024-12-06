import React, { FC } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";


interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task: any | null;
  onAddTask: (taskName: string, taskDescription: string) => void;
  onUpdateTask: (taskId: number, taskName: string, taskDescription: string) => void;
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  taskDescription: string;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
}

const TaskModal: FC<TaskModalProps> = ({
  open,
  onClose,
  task,
  onAddTask,
  onUpdateTask,
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
}) => {
  const handleSave = () => {
    if (task) {
      onUpdateTask(task.id, taskName, taskDescription);
    } else {
      onAddTask(taskName, taskDescription);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "24px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: "24px", color: "#6200ea", fontWeight: "bold" }}>
          {task ? "Edit Task" : "Add Task"}
        </h3>
        <TextField
          label="Task Name"
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          style={{ marginBottom: "16px", borderRadius: "8px" }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          style={{ marginBottom: "16px", borderRadius: "8px" }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              backgroundColor: "#6200ea",
              color: "#fff",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            {task ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskModal;
