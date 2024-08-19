'use client'

import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import WeatherWidget from './components/WeatherWidget';


export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Paris Olympics 2024 customer support. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true)
    setMessage('')  // Clear the input field
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },  // Add the user's message to the chat
      { role: 'assistant', content: '' },  // Add a placeholder for the assistant's response
    ])
  
    try {
      // Send the message to the server
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })
      const reader = response.body.getReader()  // Get a reader to read the response body
      const decoder = new TextDecoder()  // Create a decoder to decode the response text
  
      let result = ''
      // Function to process the text from the response
      const processText = async ({ done, value }) => {
        if (done) {
          setIsLoading(false)
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true })  // Decode the text
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]  // Get the last message (assistant's placeholder)
          let otherMessages = messages.slice(0, messages.length - 1)  // Get all other messages
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },  // Append the decoded text to the assistant's message
          ]
        })
        return reader.read().then(processText)  // Continue reading the next chunk of the response
      }
      await reader.read().then(processText)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Box
        position="fixed"
        top="10px"
        left="10px"
        zIndex="10"
      >
        <WeatherWidget />
      </Box>
      
      <Box
          position="fixed"
          width="50px"
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
            style={{ display: 'block', width: '40px', height: '40px', textDecoration: 'none' }}
          >
            <img 
              src="/1n.png"
              alt="Instagram icon"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
          </a>
        </Box>

        <Box
        position="fixed"
        width="50px"
        height="50px"
        display="flex"
        alignItems="center"
        style={{
          right: '50px',
          zIndex: 10,
        }}
      >
        <a href="https://youtube.com/@olympics?si=bHK0VWAa7euzhPrD"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', width: '40px', height: '40px', textDecoration: 'none' }}
          >
            <img 
              src="/2n.png"
              alt="Youtube icon"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
          </a>
      </Box>

      <Box
        position="fixed"
        width="50px"
        height="50px"
        display="flex"
        alignItems="center"
        style={{
          right: '100px',
          zIndex: 10,
        }}
      >
        <a href="https://x.com/olympics"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', width: '40px', height: '40px', textDecoration: 'none' }}
          >
            <img 
              src="/3n.png"
              alt="Twitter icon"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
          </a>
      </Box>

      <Box
        position="fixed"
        width="50px"
        height="50px"
        display="flex"
        alignItems="center"
        style={{
          right: '150px',
          zIndex: 10,
        }}
      >
        <a href="https://www.facebook.com/groups/1599932323566099/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', width: '40px', height: '40px', textDecoration: 'none' }}
          >
            <img 
              src="/4n.png"
              alt="Facebook icon"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
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
                  ? 'rgb(26, 52, 105)' 
                  : 'rgb(155, 200, 221)'
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
            fontFamily: 'Poppins, sans-serif', // Font family
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: 'rgb(24, 24, 51)', // Bottom underline color when not focused
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: 'rgb(24, 24, 51)', // Bottom underline color when focused
          }
        }}
        InputProps={{
          style: {
            color: 'rgb(24, 24, 51)', // Text color inside the input
            fontFamily: 'Poppins, sans-serif', // Font family
          },
        }}
      />

          <Button 
            variant="contained" 
            onClick={sendMessage}
            disabled={isLoading}
            className="poppins-medium"
            sx={{
              backgroundColor: 'rgb(217, 200, 137)',
              '&:hover': {
                backgroundColor: 'rgba(217, 200, 137, 0.8)',
              },
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
