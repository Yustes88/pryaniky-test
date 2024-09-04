import { default as Paper } from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { getData } from '../api/getData';

const columns: GridColDef[] = [
  { field: 'companySigDate', headerName: 'companySigDate', width: 70, type: 'string' },
  { field: 'companySignatureName', headerName: 'companySignatureName', width: 130, type: 'string' },
  { field: 'documentName', headerName: 'documentName', width: 130, type: 'string' },
  {
    field: 'documentStatus',
    headerName: 'documentStatus',
    type: 'string',
    width: 90,
  },
  { field: 'documentType', headerName: 'documentType', width: 130, type: 'string' },
  { field: 'employeeNumber', headerName: 'employeeNumber', width: 130, type: 'string' },
  { field: 'employeeSigDate', headerName: 'employeeSigDate', width: 130, type: 'string' },
  { field: 'employeeSignatureName', headerName: 'employeeSignatureName', width: 130, type: 'string' },
  { field: 'Edit', headerName: 'Edit', width: 130},
  { field: 'Remove', headerName: 'Remove', width: 130},
];


export default function DataTable() {
  const [data, setData] = useState([])
  
    React.useEffect(() => {
        const fetchData = async () => {
          const result = await getData()
          setData(result.data)
        }
        fetchData()
      }, [])
    
      

    return (
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          sx={{ border: 0 }}
        />
      </Paper>
    );
  }