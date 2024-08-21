'use client'

import { Box, Button, Stack, TextField, Tooltip } from '@mui/material'
import { useState, useEffect, useRef } from 'react'

function WeatherWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    script.async = true;
    script.id = 'weatherwidget-io-js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a
      className="weatherwidget-io"
      href="https://forecast7.com/en/48d862d35/paris/"
      data-label_1="PARIS"
      data-label_2="WEATHER"
      data-theme="original"
    >
      PARIS WEATHER
    </a>
  );
}

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Paris Olympics 2024 customer support. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    setMessage('');  // Clear the input field
  
    // Add the user's message and a placeholder for the assistant's response
    const newMessages = [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ];
    setMessages(newMessages);
  
    try {
      // Send the entire messages array to the server
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessages),
      });
  
      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      let result = '';
      const processText = async ({ done, value }) => {
        if (done) {
          setIsLoading(false);
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      };
      await reader.read().then(processText);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{
        backgroundImage: 'url(/paris_olympics.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backgroundBlendMode: 'overlay',
      }}
    >

      <Box
        position="fixed"
        width="40px"
        height="50px"
        display="flex"
        alignItems="center"
        style={{
          right: '0px',
          zIndex: 10,
        }}
      >
        <a href="https://www.instagram.com/olympicshospitality?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '30px', height: '30px', textDecoration: 'none' }}
        >
          <img 
            src="/1n.png"
            alt="Instagram icon"
            style={{ width: '30px', height: '30px', objectFit: 'contain' }}
          />
        </a>
      </Box>

      <Box
        position="fixed"
        width="40px"
        height="50px"
        display="flex"
        alignItems="center"
        style={{
          right: '35px',
          zIndex: 10,
        }}
      >
        <a href="https://youtube.com/@olympics?si=bHK0VWAa7euzhPrD"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '30px', height: '30px', textDecoration: 'none' }}
        >
          <img 
            src="/2n.png"
            alt="Youtube icon"
            style={{ width: '30px', height: '30px', objectFit: 'contain' }}
          />
        </a>
      </Box>

      <Box
        position="fixed"
        width="40px"
        height="50px"
        display="flex"
        alignItems="center"
        style={{
          right: '70px',
          zIndex: 10,
        }}
      >
        <a href="https://x.com/olympics"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '30px', height: '30px', textDecoration: 'none' }}
        >
          <img 
            src="/3n.png"
            alt="Twitter icon"
            style={{ width: '30px', height: '30px', objectFit: 'contain', filter: 'brightness()' }}
          />
        </a>
      </Box>

      <Box
        position="fixed"
        width="40px"
        height="50px"
        display="flex"
        alignItems="center"
        style={{
          right: '105px',
          zIndex: 10,
        }}
      >
        <a href="https://www.facebook.com/groups/1599932323566099/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '30px', height: '30px', textDecoration: 'none' }}
        >
          <img 
            src="/4n.png"
            alt="Facebook icon"
            style={{ width: '30px', height: '30px', objectFit: 'contain' }}
          />
        </a>
      </Box>

      <Stack
        direction={'column'}
        width="100%"
        height="100%"
        p={2}
        spacing={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'rgb(5, 165, 82)' 
                    : 'rgb(0, 130, 198)'
                }
                className="poppins-regular"
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField 
            label="Send your Message here"
            variant="filled"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '& .MuiInputBase-input': {
                color: 'rgb(24, 24, 51)', // Text color
                fontFamily: 'Poppins, sans-serif', // Font family
              },
              '& .MuiFormLabel-root': {
                color: 'rgb(24, 24, 51)', // Label color
              },
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <Tooltip title="Send" arrow>
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              disabled={isLoading}
              sx={{
                height: '56px',
                borderRadius: 2,
              }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
      <WeatherWidget />
    </Box>
  )
}
