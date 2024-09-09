'use client';

import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';

export default function Home() {
  const router = useRouter();
  
  const handleClick_1 = (e) => {
    e.preventDefault();
    const target = document.getElementById('join');
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  
  const imageUrls = [
    '/1.mp4',
    '/2.mp4',
    '/3.mp4', 
  ];

  const handleClick_2 = (e) => {
    e.preventDefault();
    const target = document.getElementById('learn-more');
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#8C5543' }}>
        <Toolbar>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h5" sx={{ flexGrow: 1, color: '#F4EFEA', fontFamily: 'Playfair Display, serif',}}>
            FoodFusion
          </Typography>
        </Link>
          <Typography variant="h5" style={{ flexGrow: 1 }} className="bangers" sx={{ fontFamily: 'Bangers, sans-serif' }}>
          
          </Typography>
          <SignedOut>
            <Button 
              variant="contained"
              onClick={() => router.push('/sign-in')}
              sx={{
                marginRight: 2,
                backgroundColor: 'rgb(255, 255, 255)',
                '&:hover': {
                  backgroundColor: '#F4EFEA',
                  transform: 'scale(1.05)',
                },
                color: '#8C5543',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 700,
              }}>
              Login
            </Button>
            <Button 
              variant="contained"
              onClick={() => router.push('/sign-up')}
              sx={{
                marginRight: 2,
                backgroundColor: 'rgb(255, 255, 255)',
                '&:hover': {
                  backgroundColor: '#F4EFEA',
                  transform: 'scale(1.05)',
                },
                color: '#8C5543',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 700,
              }}>
              Sign Up
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ textAlign: 'center', position: 'relative', overflow: 'hidden', height: 780 }}>
      <Slider {...settings} style={{ width: '100%', height: '100%' }}>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <img 
              src={url} 
              alt={`Slide ${index}`} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: '0.6',
              }} 
            />
          </div>
        ))}
      </Slider>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingBottom={10} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display, sans-serif' }}>
          Welcome to FoodFusion
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontFamily: 'Montserrat, serif', fontWeight: 500 }}>
          🗂️ Manage your pantry effortlessly & let AI generate amazing recipes for you with FoodFusion! 🍲
        </Typography>
        <SignedOut>
          <Button 
            variant="contained"
            onClick={() => router.push('/sign-up')}
            sx={{
              backgroundColor:'#8C5543', 
              color:'#F4EFEA', 
              fontFamily: 'Raleway, serif',
              '&:hover': {backgroundColor: '#B6956F', transform: 'scale(1.05)'}}}>
                Get Started for FREE!
              </Button>
          </SignedOut>

          <SignedIn>
            <Link href="/home" passHref>
              <Button 
                variant="contained"
                sx={{
                  backgroundColor:'#8C5543', 
                  color:'#F4EFEA', 
                  fontFamily: 'Raleway, serif',
                  '&:hover': {backgroundColor: '#B6956F', transform: 'scale(1.05)'}}}>Home
              </Button>
            </Link>
          </SignedIn>
        </Box>
      </Box>
    </>
  );
}
