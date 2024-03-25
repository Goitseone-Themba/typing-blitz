import { useState } from 'react'
import { Container,Typography, Stack } from '@mui/material'

function App() {

  return (
    <Container maxwidth='sm'>
      <Stack spacing={2} >
        <Typography variant='h1'>Typing Blitz</Typography>
        <Typography variant='h3'>Screen</Typography>
        <Typography variant='h4'>Controls</Typography>
      </Stack>
    </Container>
  )
}

export default App
