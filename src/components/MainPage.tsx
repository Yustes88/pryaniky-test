import { Box } from '@mui/material';
import DataTable from './DataTable';

export default function MainPage() {
  return (
    <Box component='section' sx={{
      width: '70%',
      height: 100,
      borderRadius: 1,
      margin: '2rem auto'
    }}>
      <DataTable/>
    </Box>
  );
}
