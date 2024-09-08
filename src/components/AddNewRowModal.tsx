import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { IDocument } from '../interface/IRow';
import { boxStyles } from '../utils/utils';
import FormInputs from './FormInputs';

type AddNewRowModalProps = {
  setData: React.Dispatch<React.SetStateAction<IDocument[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddNewRowModal({setData, open, setOpen}: AddNewRowModalProps) {
  const handleClose = () => setOpen(false);


  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyles}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add New Row
          </Typography>
          <FormInputs setData={setData} setOpen={setOpen} handleClose = {handleClose}/>
         </Box>
      </Modal>
    </>
  );
}

