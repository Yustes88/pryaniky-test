import { Button, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { deleteData, editData, getData } from '../api/getData';
import { IDocument } from '../interface/IRow';
import { createColumns } from '../utils/utils';
import AddNewRowModal from './AddNewRowModal';

export default function DataTable() {
  const [data, setData] = useState<IDocument[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleProcessRowUpdate = async (newRow: IDocument): Promise<IDocument> => {
    setIsLoading(true)
    const updatedRow = { ...newRow };

    await editData(updatedRow.id, updatedRow);

    setData((prevData) =>
      prevData.map((item) => (item.id === updatedRow.id ? updatedRow : item))
    );

    setIsLoading(false)
    return updatedRow;
  };

  const handleDeleteRow = async (id: string) => {
    setIsLoading(true)
    setData((prevData) => prevData.filter((item) => item.id !== id));
    await deleteData(id);
    setIsLoading(false)
  };

  const handleOpen = () => setOpen(true); // Open the modal


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await getData();
      setData(result.data);
      setIsLoading(false)
    };
    fetchData();
  }, []);

  const columns = createColumns(handleDeleteRow);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="inherit" sx={{ mb: 2 }}>
        Add New Row
      </Button>

      <AddNewRowModal setData={setData} setOpen={setOpen} open={open}/>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          editMode="row"
          rows={data}
          columns={columns}
          hideFooterPagination
          sx={{ border: 0 }}
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => console.log(error)}
          loading ={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: 'linear-progress',
              noRowsVariant: 'skeleton',
            },
          }}
        />
      </Paper>
    </>
  );
}
