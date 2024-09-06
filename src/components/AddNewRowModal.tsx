import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { addNewData } from '../api/getData';
import { IDocument } from '../interface/IRow';

export default function DataTable() {
  const [data, setData] = useState<IDocument[]>([]);
  const [open, setOpen] = useState(false); // State for modal
  const [newRow, setNewRow] = useState<IDocument>({
    id: '',
    companySigDate: '',
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: '',
    employeeSignatureName: '',
  });

  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => setOpen(false); // Close the modal

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handleAddRow = async () => {
    try {
      const response = await addNewData(newRow)
      console.log(response)

      const createdRow = response;
      setData((prevData) => [...prevData, createdRow]);
      handleClose(); // Close the modal after success
    } catch (error) {
      console.error('Error adding new row:', error);
    }
  };

  return (
    <>
      {/* Modal for Adding New Row */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add New Row
          </Typography>
          {/* Form Fields */}
          <TextField
            label="Company Sig Date"
            type="datetime-local"
            name="companySigDate"
            fullWidth
            value={newRow.companySigDate}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Company Signature Name"
            name="companySignatureName"
            fullWidth
            value={newRow.companySignatureName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Document Name"
            name="documentName"
            fullWidth
            value={newRow.documentName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Document Status"
            name="documentStatus"
            fullWidth
            value={newRow.documentStatus}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Document Type"
            name="documentType"
            fullWidth
            value={newRow.documentType}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Employee Number"
            name="employeeNumber"
            fullWidth
            value={newRow.employeeNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Employee Sig Date"
            type="datetime-local"
            name="employeeSigDate"
            fullWidth
            value={newRow.employeeSigDate}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Employee Signature Name"
            name="employeeSignatureName"
            fullWidth
            value={newRow.employeeSignatureName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" color="primary" onClick={handleAddRow}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </>
  );
}
