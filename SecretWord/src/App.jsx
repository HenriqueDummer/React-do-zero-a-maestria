import { useState, useEffect, useCallback } from 'react'

import { StartScreen } from './Components/StartScreen'
import { Game } from './Components/Game'
import { GameOver } from './Components/GameOver'

import {wordsList} from './Data/wordList'

function App() {

  const stages = [
    {id: 1, name:"start"},
    {id: 2, name:"game"},
    {id: 3, name:"end"},
  ]

  const [gamseStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)


  const pickWordAndCategory =  useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {category, word}
  }, [words])

  const startGame = useCallback(() => {

    clearStates()

    const{ category, word} = pickWordAndCategory()
    setGameStage(stages[1].name)

    let wordLetters = word.toLowerCase().split("")
    
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((prevGuessedLeters) => [
        ...prevGuessedLeters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((prevWrongLeters) => [
        ...prevWrongLeters,
        normalizedLetter
      ])
      setGuesses((prev) => prev - 1)
    }
  }

  const clearStates = () => {
    setWrongLetters([])
    setGuessedLetters([])
  }

  useEffect(() => {
    if(guesses <= 0){
      setGameStage(stages[2].name)
      clearStates()
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    if(uniqueLetters.length === guessedLetters.length){
      setScore((prev) => prev += 100)
      startGame()
    }
  }, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0)
    setGuesses(3)

    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gamseStage === 'start' && <StartScreen startGame = {startGame}/>}
      {gamseStage === 'game' && 
      <Game  
        verifyLetter = {verifyLetter} 
        pickedWord ={pickedWord  }
        pickedCategory = {pickedCategory} 
        letters = {letters} 
        wrongLetters = {wrongLetters}
        guesses = {guesses}
        score = {score}
        guessedLetters = {guessedLetters}
        setGuessedLetters = {setGuessedLetters}
      />}
      {gamseStage === 'end' && <GameOver 
        retry = {retry}
        score = {score}
      />}
    </div>
  )
}

export default App
