import React, { useState, useEffect } from 'react';
import './Practice.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import NavBar from '../components/NavBar';
import { getLocalStorageUser } from '../UTILS/localStorageUtils';
import ResultsService from '../services/ResultsService';
import TextService from '../services/TextService';
import { MDBBtn } from 'mdb-react-ui-kit'; 

const Practice = () => {
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
          <h1 className="margin1">Practice</h1>
          <div className='main-text'>
          <p className="textColor">
          {words.map((word, index) => (
              <span key={index}>
                {index > 0 && ' '}
                <span className={`${
                    index === currentWordIndex ? 'current-word' : ''
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
            disabled={typingComplete}
          />
          <div className='horiz-layout'>
            <div  className='icons'>
                <MDBBtn onClick={resetSentence}>
                <i className="fas fa-arrows-rotate"></i>
                </MDBBtn>
            </div>
            <div  className='icons'>
                <MDBBtn onClick={arrowLeft} className={`${!canMoveLeft() && 'disabled'}`} >
                <i className={`fas fa-arrow-left`}></i>
                </MDBBtn>
            </div>
            <div  className='icons'>
                <MDBBtn onClick={arrowRight} className = {`${!canMoveRight() && 'disabled'}`} >
                <i className={`fas fa-arrow-right`}></i>
                </MDBBtn>
            </div>
          </div>

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

export default Practice;

