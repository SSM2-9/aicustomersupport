'use client';

import { Box, Button, Toolbar, Typography, AppBar } from '@mui/material';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#8C5543' }}>
                <Toolbar>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {/* You don't need Button here, as Link itself acts like a button */}
                        <Typography variant="h5" sx={{ flexGrow: 1, color: '#F4EFEA', fontFamily: 'Playfair Display, serif',}}>
                            FoodFusion
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingTop={4}>
                <img
                    src="/Pantry.png"
                    alt="Background image"
                    style={{
                    position: 'absolute',
                    top: 64,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover',
                    opacity: 0.5,
                    backgroundColor: '#f4f4f9',
                    zIndex: -1,  // Ensure the GIF is behind the content
                }}></img>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingLeft={4} paddingBottom={20} sx={{ backgroundColor: '#D6C6B1', width: '1400px', height: '500px'}}>
                    <Typography variant="h3" sx={{color:'#3B3A36', fontFamily: 'Playfair Display, serif'}}>Welcome to FoodFusion!</Typography>
                    <Typography variant="h5" sx={{color:'#3B3A36', fontFamily: 'Montserrat, sans-serif'}}>Choose an option from below:</Typography>
                    <Box paddingTop={4} paddingRight={4} display="flex" flexDirection="row" gap={2}>
                        <Link href='https://pantry-tracker-smoky-six.vercel.app' passHref>
                            <Button variant="contained"
                                sx={{
                                    backgroundColor:'#8C5543', 
                                    color:'#F4EFEA', 
                                    fontFamily: 'Raleway, serif',
                                    '&:hover': {backgroundColor: '#B6956F', transform: 'scale(1.05)'}}}
                                    >My Pantry
                            </Button>
                        </Link>
                        <Link href='/generate_recipe' passHref>
                            <Button variant="contained" 
                                sx={{
                                    backgroundColor:'#8C5543', 
                                    color:'#F4EFEA', 
                                    fontFamily: 'Raleway, serif',
                                    '&:hover': {backgroundColor: '#B6956F', transform: 'scale(1.05)'}}}
                                    >Generate A Recipe
                            </Button>
                        </Link>
                    </Box>
                    <img
                        src="/Groceries.gif"
                        alt="Background image"
                        style={{
                        position: 'absolute',
                        top: 350,
                        width: '200px',
                        height: '200px',
                        zIndex: 1,  // Ensure the GIF is behind the content
                    }}></img>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingLeft={4} paddingBottom={20} sx={{ backgroundColor: '#D6C6B1', width: '1400px', height: '100px'}}>
                </Box>
                <Typography variant="h6" sx={{ paddingTop: 2 }}>
                    Dev Team: <Link href="https://www.linkedin.com/in/minahil-shafique" style={{ textDecorationColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)' }}> Minahil-Backend </Link> and <Link href="https://www.linkedin.com/in/sakina-shaikh-mohammed" style={{ textDecorationColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)' }}>
                Sakina-Frontend
            </Link>
        </Typography>
            </Box>
        </>
    );
}
