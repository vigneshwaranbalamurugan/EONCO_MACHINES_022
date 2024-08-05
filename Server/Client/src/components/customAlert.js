import React from 'react';
import {  IconButton, Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({ title, message, severity, onCancel }) => {
  return (
    <div className="alert-popup-overlay">
      <Box
        sx={{
          width: '90%',
          maxWidth: '400px',
          bgcolor: 'white',
          borderRadius: '8px',
          boxShadow: 24,
          p: 3,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onCancel}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon fontSize="inherit"  />
        </IconButton>

        <InfoIcon sx={{ fontSize: 50, mb: 1,color:'blue' }} />

        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {message}
        </Typography>
      </Box>
    </div>
  );
};

export default CustomAlert;
