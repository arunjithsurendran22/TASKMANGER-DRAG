import React from "react";
import { Modal, Box, Button, TextField } from "@mui/material";

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  taskName: string;
  taskDescription: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  taskName,
  taskDescription,
  setTaskName,
  setTaskDescription,
  onSave,
}) => {
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
          {title}
        </h3>
        <TextField
          label="Task Name"
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          style={{
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          style={{
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
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
            Save Task
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReusableModal;
