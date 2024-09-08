import { Button, TextField, CircularProgress, Input, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { addNewData } from '../api/getData';
import { IDocument } from '../interface/IRow';
import { defaultDocument } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';

type AddNewRowModalProps = {
  setData: React.Dispatch<React.SetStateAction<IDocument[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
};

export default function FormInputs({ setData, handleClose }: AddNewRowModalProps) {
  const [newRow, setNewRow] = useState<IDocument>({ ...defaultDocument, id: uuidv4() });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    Object.keys(newRow).forEach((key) => {
      if (!newRow[key as keyof IDocument]) {
        tempErrors[key] = 'This field is required';
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddRow = async () => {
    if (!validate()) return;
    const formattedRow = { ...newRow, employeeNumber: newRow.employeeNumber.toString() };


    setIsLoading(true);
    try {
      await addNewData(formattedRow);
      setData((prevData) => [...prevData, formattedRow]);
      alert('Data is sent successfully')
      handleClose();
    } catch (error) {
      console.error('Error adding new row:', error);
      alert('Something went wrong, please try again later')
    }
    setIsLoading(false);
  };

  return (
    <>
      <TextField
        type="datetime-local"
        name="companySigDate"
        fullWidth
        value={newRow.companySigDate}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
        error={!!errors.companySigDate}
        helperText={errors.companySigDate || "Please enter Company Sig Date"}
      />
      <TextField
        label="Company Signature Name"
        name="companySignatureName"
        fullWidth
        value={newRow.companySignatureName}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
        error={!!errors.companySignatureName}
        helperText={errors.companySignatureName}
      />
      <TextField
        label="Document Name"
        name="documentName"
        fullWidth
        value={newRow.documentName}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
        error={!!errors.documentName}
        helperText={errors.documentName}
      />
      <TextField
        label="Document Status"
        name="documentStatus"
        fullWidth
        value={newRow.documentStatus}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
        error={!!errors.documentStatus}
        helperText={errors.documentStatus}
      />
      <TextField
        label="Document Type"
        name="documentType"
        fullWidth
        value={newRow.documentType}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
        error={!!errors.documentType}
        helperText={errors.documentType}
      />
        {errors.employeeNumber && (
          <FormHelperText error>{errors.employeeNumber}</FormHelperText>
        )}
      <Input
        type="number"
        name="employeeNumber"
        placeholder="Employee number"
        fullWidth
        value={newRow.employeeNumber}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
        error={!!errors.employeeNumber}
      />
      <TextField
        type="datetime-local"
        name="employeeSigDate"
        fullWidth
        value={newRow.employeeSigDate}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
        error={!!errors.employeeSigDate}
        helperText={errors.employeeSigDate || "Please enter Employee Sig Date"}
      />
      <TextField
        label="Employee Signature Name"
        name="employeeSignatureName"
        fullWidth
        value={newRow.employeeSignatureName}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
        error={!!errors.employeeSignatureName}
        helperText={errors.employeeSignatureName}
      />

      <Button variant="contained" color="primary" onClick={handleAddRow} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Confirm'}
      </Button>
    </>
  );
}
