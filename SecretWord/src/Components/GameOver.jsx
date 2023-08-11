import React from 'react'

export const GameOver = ({retry, score}) => {
  return (
    <div className='game_over'>
      <h1>Fim de Jogo!</h1>
      <h3>Sua pontação foi: {score}</h3>
      <button onClick={retry}>Jogar Novamente</button>
    </div>
  )
}
