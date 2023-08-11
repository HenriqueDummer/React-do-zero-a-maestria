import React, { useState, useRef } from 'react'

export const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {

  const [letter, setLetter] = useState('')
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")

    letterInputRef.current.focus()
  }

    console.log(letters)
  return (
    <div className="game">
      <p className='points'>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <p>Você ainda tem {guesses} tentativas</p>

      <div className="word_container">
        {letters.map((letter, i) => 
          guessedLetters.includes(letter) ? (
            <span key={i} className='letter'>{letter}</span>
          ) : (
            <span key={i} className='blank_square'></span>
          )
        )}
      </div>

      <div className="letter_container">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input ref={letterInputRef} type="text" name='letter' maxLength={1} value={letter} required onChange={(e) => setLetter(e.target.value)}/>
          <button>Jogar!</button>
        </form>
      </div>

      <div className="wrong_letters_container">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i ) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}
