import React from 'react';
import Navbar from './components/AppBar';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';


function App() {

  return (
    <>
      <Navbar />
      <div>
        <div className="pdfContainer" style={{
          margin: 'auto',
          width: '50%',
          marginTop: '10%',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0,0,0.2,0.2)',
          padding: '20px',
          backgroundColor: 'white',
        }}>
        
        </div>
        <div style={{
          margin: 'auto',
          width: '50%',
          marginTop: '2%',
        }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default App;
