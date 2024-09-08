import { GridActionsCellItem, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const createColumns = (handleDeleteRow: (id: string) => void): GridColDef[] => [
    {
      field: 'companySigDate',
      headerName: 'Company Sig Date',
      width: 150,
      type: 'date',
      editable: true,
      valueFormatter: (params) => dayjs(params).format('DD/MM/YYYY'),
    },
    { field: 'companySignatureName', headerName: 'Company Signature Name', width: 180, type: 'string', editable: true },
    { field: 'documentName', headerName: 'Document Name', width: 150, type: 'string', editable: true },
    { field: 'documentStatus', headerName: 'Document Status', type: 'string', width: 150, editable: true },
    { field: 'documentType', headerName: 'Document Type', width: 150, type: 'string', editable: true },
    {
      field: 'employeeNumber',
      headerName: 'Employee Number',
      width: 150,
      type: 'number',
      editable: true,
      valueFormatter: (params) => Number(params), // Convert string to number for display
      valueParser: (value) => value.toString(), // Convert number to string for edit
    },
    { field: 'employeeSigDate', headerName: 'Employee Sig Date', width: 150, type: 'date', editable: true, valueFormatter: (params) => dayjs(params).format('DD/MM/YYYY'),
    },
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

export const defaultDocument = {
  companySigDate: '',
  companySignatureName: '',
  documentName: '',
  documentStatus: '',
  documentType: '',
  employeeNumber: '',
  employeeSigDate: '',
  employeeSignatureName: '',
}

export const boxStyles = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    width: '400',
    transform: 'translate(-50%, -50%)', 
    bgcolor: 'background.paper', 
    borderRadius: 2, 
    boxShadow: 24, 
    p: 4 
}

export const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  loginBox: {
    width: '400px',
    padding: '40px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center' as 'center',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};