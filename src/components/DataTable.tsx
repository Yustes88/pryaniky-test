import { Button, Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridDeleteIcon, GridRowId } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { deleteData, editData, getData } from '../api/getData';
import { IDocument } from '../interface/IRow';

const createColumns = (handleDeleteRow: (id: string) => void): GridColDef[] => [
  { field: 'companySigDate', headerName: 'Company Sig Date', width: 150, type: 'date', editable: true },
  { field: 'companySignatureName', headerName: 'Company Signature Name', width: 180, type: 'string', editable: true },
  { field: 'documentName', headerName: 'Document Name', width: 150, type: 'string', editable: true },
  { field: 'documentStatus', headerName: 'Document Status', type: 'string', width: 150, editable: true },
  { field: 'documentType', headerName: 'Document Type', width: 150, type: 'string', editable: true },
  { field: 'employeeNumber', headerName: 'Employee Number', width: 150, type: 'string', editable: true },
  { field: 'employeeSigDate', headerName: 'Employee Sig Date', width: 150, type: 'string', editable: true },
  { field: 'employeeSignatureName', headerName: 'Employee Signature Name', width: 180, type: 'string', editable: true },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<GridDeleteIcon />}
        label="Delete"
        onClick={() => handleDeleteRow(params.id as string)}
        color="inherit"
      />
    ],
  },
];

export default function DataTable() {
  const [data, setData] = useState<IDocument[] | []>([]);
  const [nextId, setNextId] = useState(1); // Track the next ID for new rows

  const handleProcessRowUpdate = async (newRow: IDocument): Promise<IDocument> => {
    const updatedRow = { ...newRow };

    await editData(updatedRow.id, updatedRow);

    setData((prevData) =>
      prevData.map((item) => (item.id === updatedRow.id ? updatedRow : item))
    );

    return updatedRow;
  };

  const handleDeleteRow = async (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    await deleteData(id);
  };

  const handleAddRow = () => {
    const newRow: IDocument = {
      id: `new-${nextId}`, // Unique temporary ID for new row
      companySigDate: '',
      companySignatureName: '',
      documentName: '',
      documentStatus: '',
      documentType: '',
      employeeNumber: '',
      employeeSigDate: '',
      employeeSignatureName: '',
    };

    setData((prevData) => [...prevData, newRow]); // Add new row to state
    setNextId((prevId) => prevId + 1); // Increment next ID
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result.data);
    };
    fetchData();
  }, []);

  console.log(data);

  const columns = createColumns(handleDeleteRow);

  
  return (
    <>
      <Button onClick={handleAddRow} variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Row
      </Button>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          editMode="row"
          rows={data}
          columns={columns}
          hideFooterPagination
          sx={{ border: 0 }}
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => console.log(error)}
        />
      </Paper>
    </>
  );
}
