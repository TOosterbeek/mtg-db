import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBarDrawerItems from './AppBarDrawerItems';

import { useState } from 'react';

const AppBarDrawer = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => setDrawerOpen(true)}
            >
                <MenuIcon />
            </IconButton>

            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box p={2} width='250px' textAlign='center' role='presentation'>
                    <Typography variant='h6' component='div'>
                        MTG Card Tracker
                    </Typography>

                    <AppBarDrawerItems />
                </Box>
            </Drawer>
        </>
    )
}

export default AppBarDrawer;