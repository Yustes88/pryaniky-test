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
    { field: 'employeeNumber', headerName: 'Employee Number', width: 150, type: 'string', editable: true },
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