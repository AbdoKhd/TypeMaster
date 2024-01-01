import React, { useState, useEffect } from 'react';
import './Practice.css';
import './Multiplayer.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import NavBar from '../components/NavBar';
import { getLocalStorageUser } from '../UTILS/localStorageUtils';
import ResultsService from '../services/ResultsService';
import TextService from '../services/TextService';
import { MDBBtn } from 'mdb-react-ui-kit';
import io from 'socket.io-client';  
import { useLocation } from 'react-router-dom';
const socket = io.connect("http://localhost:3003")

const Multiplayer = () => {
  const [texts, setTexts] = useState([]);
  const [textIndex, setTextIndex] = useState(0);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [wrongWords, setWrongWords] = useState(0);
  const [characterColors, setCharacterColors] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [receivedPercentage, setReceivedPercentage] = useState(0);
  const [secondUserJoined, setSecondUserJoined] = useState(false);
  const [countdown, setCountdown] = useState(5);


  //----get room number from JoinGame component
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomNb = searchParams.get('room');
  //----

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TextService.getTexts();
        console.log(response.data.texts[0] , 'this is response');
        if (response.status !== 200) {
          throw new Error('Failed to fetch texts');
        }
        const arrayOfTexts = response.data.texts.map(item => item.text);
        setTexts(arrayOfTexts || []);
        console.log(texts[0]);
      } catch (error) {
        console.error('Error fetching texts:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const storedUser = getLocalStorageUser();
    if (storedUser !== null) {
      setIsUserLoggedIn(true);
    }
    const wordsArray = texts.length > 0 && typeof texts[textIndex] === 'string' ? texts[textIndex].split(' ') : [];
    setWords(wordsArray);
    setCharacterColors(generateInitialColors(wordsArray));
  }, [texts, textIndex]);

  useEffect(() => {
    socket.on("receive_percentage", (data) => {
        setReceivedPercentage(data.completionPercentage);
        console.log(receivedPercentage, "this received percentage")
    })
    
    socket.emit("join_room", roomNb);

    socket.on('room_occupancy', (data) => {
        const usersInRoom = data.occupancy;
        console.log(`Users in the room: ${usersInRoom}`);
        
        if(usersInRoom === 1){
            setSecondUserJoined(false);
        }
        else if (usersInRoom === 2) {
            setSecondUserJoined(true);
          console.log('Starting the game!');

          let countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
  
          // Clear the interval after 5 seconds
          setTimeout(() => {
            clearInterval(countdownInterval);
            setCountdown(null); // Set countdown to null to remove the placeholder
          }, 5000);
        }
    });

  }, [roomNb]);

  const generateInitialColors = (wordsArray) => {
    return wordsArray.map((word) =>
      word.split('').map(() => ({
        correct: false,
        current: false,
      }))
    );
  };

  const handleInputChange = (e) => {

    if (!startTime) {
      setStartTime(Date.now());
    }
    setUserInput(e.target.value);

    let updatedColors = [...characterColors];

    for (let i = 0; i < words[currentWordIndex].length; i++) {
        updatedColors[currentWordIndex][i].current = i < e.target.value.length;
        updatedColors[currentWordIndex][i].correct =
        e.target.value[i] === words[currentWordIndex][i];
    }
    setCharacterColors(updatedColors);

    if(currentWordIndex === words.length - 1){
        if(words[currentWordIndex] === e.target.value){
            //----Calulating percentage---
            const totalWords = texts[textIndex].split(' ').length;
            const typedWords = currentWordIndex + 1;
            const completionPercentage = ((typedWords / totalWords) * 100).toFixed(2);
            setPercentage(completionPercentage);
            console.log(completionPercentage , "This is percentage");
            socket.emit("percentage", {completionPercentage, roomNb});
            //-----------------------------

            setEndTime(Date.now());
            setTypingComplete(true);

            if(isUserLoggedIn){
                const timeInSeconds = (Date.now() - startTime) / 1000;
                const currentText = texts[textIndex];
                const wpm = calculateWPM(timeInSeconds, currentText, wrongWords);
                const raw = calculateRAW(timeInSeconds, currentText);
                const time = timeInSeconds.toFixed(2);
                const userId = getLocalStorageUser().userId;
                console.log(userId, "this is the user id");
                const textId = textIndex + 1;
                const results = {
                    textId, wpm, raw, time, userId
                }
                const res = ResultsService.saveResults({results});
            }
        }
    }
    if (e.target.value.endsWith(' ')) {

        //----Calulating percentage---
        const totalWords = texts[textIndex].split(' ').length;
        const typedWords = currentWordIndex + 1;
        const completionPercentage = ((typedWords / totalWords) * 100).toFixed(2);
        setPercentage(completionPercentage);
        console.log(completionPercentage , "This is percentage");
        socket.emit("percentage", {completionPercentage, roomNb});
        //-----------------------------

        setCurrentWordIndex((prevIndex) => prevIndex + 1);

        if(userInput !== words[currentWordIndex]){
            setWrongWords((prevWrongWords) => prevWrongWords + 1);
            console.log("This is number of wrong words: ",wrongWords)
        }
  
        // Check if all words are typed
        if (currentWordIndex === words.length - 1) {
            setEndTime(Date.now());
            setTypingComplete(true);
            
            if(isUserLoggedIn){
                const timeInSeconds = (Date.now() - startTime) / 1000;
                const currentText = texts[textIndex];
                const wpm = calculateWPM(timeInSeconds, currentText, wrongWords);
                const raw = calculateRAW(timeInSeconds, currentText);
                const time = timeInSeconds.toFixed(2);
                const userId = getLocalStorageUser().userId;
                const textId = textIndex + 1;
                const results = {
                    textId, wpm, raw, time, userId
                }
                const res = ResultsService.saveResults({results});
            }
        }
  
        // Clear the input after the space
        setUserInput('');
    }
  };

  const resetSentence = (e) =>{
    setCurrentWordIndex(0);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setTypingComplete(false);
    setWrongWords(0);
    setCharacterColors(generateInitialColors(words));
  };

  const arrowLeft = (e) =>{
    if(canMoveLeft()){
        resetSentence();
        setTextIndex((prevIndex) => prevIndex - 1);
    }
  }

  const arrowRight = (e) =>{
    if(canMoveRight()){
        resetSentence();
        setTextIndex((prevIndex) => prevIndex + 1);
    }
  }

  const canMoveLeft = () => {
    return textIndex > 0;
  };

  const canMoveRight = () => {
    return textIndex < texts.length - 1;
  };

  const calculateWPM = (timeInSec, currentText, wrongWords) => {
    const minutes = (timeInSec) / 60;
    const wordCount = texts[textIndex].split(' ').length;
    const wpm = Math.round((wordCount - wrongWords) / minutes);
    return wpm;
  };

  const calculateRAW = (timeInSec, currentText) => {
    const minutes = timeInSec / 60;
    const wordCount = texts[textIndex].split(' ').length;
    const raw = Math.round(wordCount / minutes);
    return raw;
  };

  return (
      <div>
          <NavBar />
          <div className="center1">
              <div className="vertical-layout">
                  {!secondUserJoined && (
                      <p className="textColorWait">Waiting for the other user to join...</p>
                  )}

                  {secondUserJoined && (
                      <>
                          <h1 className="margin1">Multiplayer</h1>
                          <div className="percentage-container">
                              <p>Your Completion Percentage: {percentage}%</p>
                              <p>Opponent's Completion Percentage: {receivedPercentage}%</p>
                          </div>
                          <div className='main-text'>
                              <p className="textColor" disabled={!secondUserJoined}>
                                  {words.map((word, index) => (
                                      <span key={index}>
                                          {index > 0 && ' '}
                                          <span className={`${index === currentWordIndex ? 'current-word' : ''
                                              }`}
                                          >
                                              {word.split('').map((char, charIndex) => (
                                                  <span
                                                      key={charIndex}
                                                      className={
                                                          characterColors[index][charIndex].current
                                                              ? characterColors[index][charIndex].correct
                                                                  ? 'right-char'
                                                                  : 'wrong-char'
                                                              : 'initial-char'
                                                      }
                                                  >
                                                      {char}
                                                  </span>
                                              ))}
                                          </span>
                                      </span>
                                  ))}
                              </p>
                          </div>
                          <input
                              className="no-background"
                              type="text"
                              value={userInput}
                              onChange={handleInputChange}
                              placeholder={countdown !== null ? `Game starts in ${countdown} seconds...` : ''}
                              disabled={typingComplete || percentage === 100 || receivedPercentage === 100.00 || countdown > 0}
                          />
                      </>
                  )}

                  {typingComplete && (
                      <p className='colorP'>
                          Time taken: {((endTime - startTime) / 1000).toFixed(2)} seconds
                          <br />
                          Words Per Minute: {calculateWPM((endTime - startTime) / 1000, texts[textIndex], wrongWords)}
                          <br />
                          RAW: {calculateRAW((endTime - startTime) / 1000)}
                          {isUserLoggedIn ? (
                              <>
                              </>
                          ) : (
                              <div className='endMessage'>
                                  <a href="/Login" class="text-white-50 fw-bold">Login</a> to see your saved results.
                              </div>
                          )}
                      </p>
                  )}
              </div>
          </div>
      </div>
  );
};

export default Multiplayer;

