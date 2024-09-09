'use client';

import React from 'react';
import { Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
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

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ textAlign: 'center', my: 4, flexGrow: 1, color: '#3B3A36', fontFamily: 'Raleway, serif', fontWeight: '700'}}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{ flexGrow: 1, color: '#3B3A36', fontFamily: 'Motserrat, serif', fontWeight: '700'}}>
                    Sign In
                </Typography>

                {/* Use the redirectUrl prop to specify the redirect after sign-in */}
                <SignIn redirectUrl="/home" />
            </Box>
        </>
    );
}
