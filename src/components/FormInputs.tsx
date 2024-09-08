import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { addNewData } from '../api/getData';
import { IDocument } from '../interface/IRow';
import { defaultDocument } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';


type AddNewRowModalProps = {
  setData: React.Dispatch<React.SetStateAction<IDocument[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void
}

export default function FormInputs({ setData, handleClose}: AddNewRowModalProps) {
    const [newRow, setNewRow] = useState<IDocument>({...defaultDocument,   id: uuidv4()
    });
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRow((prevRow) => ({
          ...prevRow,
          [name]: value,
        }));
      };
    
      const handleAddRow = async () => {
        setIsLoading(true)
        try {
          await addNewData(newRow);
            
          setData((prevData) => [...prevData, newRow]);
          handleClose(); 
        } catch (error) {
          console.error('Error adding new row:', error);
        }
        setIsLoading(false)
      };
  
  return (
    <>
          <TextField
            helperText="Please enter Company Sig Date"
            type="datetime-local"
            name="companySigDate"
            fullWidth
            value={newRow.companySigDate}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Company Signature Name"
            name="companySignatureName"
            fullWidth
            value={newRow.companySignatureName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Document Name"
            name="documentName"
            fullWidth
            value={newRow.documentName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Document Status"
            name="documentStatus"
            fullWidth
            value={newRow.documentStatus}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Document Type"
            name="documentType"
            fullWidth
            value={newRow.documentType}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Employee Number"
            name="employeeNumber"
            fullWidth
            value={newRow.employeeNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            helperText="Please enter Employee Sig Date"
            type="datetime-local"
            name="employeeSigDate"
            fullWidth
            value={newRow.employeeSigDate}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Employee Signature Name"
            name="employeeSignatureName"
            fullWidth
            value={newRow.employeeSignatureName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />

          <Button variant="contained" color="primary" onClick={handleAddRow}>
            Confirm
          </Button>
    </>
  );
}

