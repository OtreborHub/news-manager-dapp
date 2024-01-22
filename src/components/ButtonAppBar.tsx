import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavbarProps } from '../utils/interfaces';

export default function ButtonAppBar({provider ,signer, balance, connectWallet}: NavbarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar enableColorOnDark color='transparent' position="static">
        <Toolbar>
          <Typography variant="h5" component="div" color="whitesmoke" sx={{ flexGrow: 1 }}>
            News Manager
          </Typography>

         { provider && signer && balance ?
         <>
        <div>
           <Typography variant="body1" mr=".2rem" component="div" color="whitesmoke" sx={{ flexGrow: 1 }}>
            Address
          </Typography>
          <Typography variant="body1" component="div" color="whitesmoke" sx={{ flexGrow: 1 }}>
            Balance 
          </Typography>
        </div> 
        <div>
           <Typography variant="body1" component="div" color="white" sx={{ flexGrow: 1 }}>
            {signer}
          </Typography>
          <Typography variant="body1" component="div" color="whitesmoke" sx={{ flexGrow: 1 }}>
            {balance} ETH
          </Typography>
        </div> 
        </>
        : 
        // <Button variant="contained" color="primary" onClick={() => connectWallet()}>Connect Wallet</Button>
        <w3m-button />
        }
        </Toolbar>
      </AppBar>
    </Box>
  );
}