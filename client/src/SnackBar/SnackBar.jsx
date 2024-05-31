import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackBar = ({ open, content, color, handleCloseSnackBar }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      open={open}
      onClose={handleCloseSnackBar}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={color} sx={{ width: '100%' }}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
