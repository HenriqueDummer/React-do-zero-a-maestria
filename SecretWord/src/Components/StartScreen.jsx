import React from 'react'

export const StartScreen = ({startGame}) => {
  return (
    <div className="start_screen">
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar o jogo</p>
        <button onClick={startGame}>Começar</button>
    </div>
  )
}
