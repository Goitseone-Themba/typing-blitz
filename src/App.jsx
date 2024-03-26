import React, { useRef, useState, useEffect } from 'react'
import { Button, Box, Card, CardContent, Container,Typography, Stack, Paper, TextField, Divider } from '@mui/material'
import './Paragraph.css'

function App() {

  const [words, setWords] = useState([
    "JavaScript is a versatile language that can be used for web development, server-side programming, and even mobile app development.",
    "Treat others with kindness and empathy, for a small act of compassion can have a profound impact on someone's life.",
    "Mathematics may seem complex, but it is a language that helps us understand and describe the universe around us.",
    "Embrace challenges and step out of your comfort zone, for growth occurs when we push ourselves beyond our limits.",
    "Problem-solving skills are invaluable in life, as they enable us to overcome obstacles and achieve our goals.",
    "Surrounding yourself with a diverse team of skilled individuals can foster innovation and lead to greater success.",
    "Wisdom comes from learning from our mistakes and using those experiences to make better decisions in the future."
  ]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [charTypedCorrect, setCharTypedCorrect] = useState(0);
  const [charTypedWrong, setCharTypedWrong] = useState(0);
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState(null);

  const inputAreaRef = useRef(null);
  const paragraphBoxRef = useRef(null);

  useEffect(() => {
    if (isStarted) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(timer);
    } else {
      clearInterval(timer);
    }
  }, [isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setCurrentInput('');
    setCharTypedCorrect(0);
    setCharTypedWrong(0);
    setTime(0);
    setWpm(0);
    setAccuracy(0);
  };

  const handleEndTest = () => {
    clearInterval(timer); 
    setIsStarted(false);
    setCurrentWord('');
    setCurrentInput('');
    setCharTypedCorrect(0);
    setCharTypedWrong(0);
    setTime(0);
    setWpm(0);
    setAccuracy(0);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCurrentInput(inputValue);
    checkInput(inputValue);
  };

  const checkInput = (inputValue) => {
    const inputArray = inputValue.split('');
    const wordArray = currentWord.split('');

    let correct = 0;
    let wrong = 0;

    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] === wordArray[i]) {
        correct++;
      } else {
        wrong++;
      }
    }

    setCharTypedCorrect(correct);
    setCharTypedWrong(wrong);
  };

  const calculateWpm = () => {
    const wordLength = currentWord.length;
    const minutes = time / 60;
    const wpm = Math.round((wordLength / 5) / minutes);
    setWpm(wpm);
  };

  const calculateAccuracy = () => {
    const totalChars = currentWord.length;
    const accuracy = Math.round(((totalChars - charTypedWrong) / totalChars) * 100);
    setAccuracy(accuracy);
  };

  useEffect(() => {
    if (currentInput.length === currentWord.length) {
      setIsStarted(false);
      calculateWpm();
      calculateAccuracy();
    }
  }, [currentInput, currentWord]);

  return (
 
    <Container maxwidth='sm' sx={{marginTop: '120px', padding: '60px'}} component={Paper}>
      <Stack spacing={2} alignItems='center'>
        <Typography variant='h2'>Typing Blitz</Typography>
        <Divider/>
        <Stack spacing={8} direction='row' >
          <Card>
          <CardContent>
            <Typography variant='h5'>WPM</Typography>
            <Typography>{wpm}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant='h5'>Accuracy</Typography>
            <Typography>{accuracy}%</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant='h5'>Time</Typography>
            <Typography>{time} sec</Typography>
          </CardContent>
        </Card>
        </Stack>
        <Stack spacing={4} >
        <div ref={paragraphBoxRef} className="paragraph-box">
          <div className="word-container">
            {currentWord.split('').map((char, index) => {
              const isCurrentChar = index === currentInput.length;
              const isCorrect = currentInput[index] === char;
              const isWrong = currentInput[index] !== char && currentInput.length > index;
              const isSpace = char === ' ';

              return (
                <Typography
                  variant='h5'
                  key={index}
                  className={`
                    ${isCurrentChar ? 'cursor-highlight' : ''}
                    ${isCorrect ? 'correct' : ''}
                    ${isWrong ? 'wrong' : ''}
                    ${isSpace ? 'space' : ''}
                  `}
                >
                  {char}
                </Typography>
              );
            })}
          </div>
      </div>
        <TextField
          variant='filled'
          ref={inputAreaRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          autoFocus
          className="input-field"
        />
        </Stack>
        <Stack spacing={2} direction={'row-reverse'}>
          <Button variant='contained' onClick={handleEndTest}>End Test</Button>
          <Button variant='contained' onClick={handleStart} >Start Test</Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default App
