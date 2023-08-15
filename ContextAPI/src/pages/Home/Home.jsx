import React from 'react'
//import { useContext } from 'react'
//import {CounterContext} from '../../context/CounterContext'

import ChangeCounter from '../../components/ChangeCounter'

import useCounterContext from '../../hooks/useCounterContext'
import useTitleColorContext from '../../hooks/useTitleColorContext'

const Home = () => {
  const {counter} = useCounterContext()

  const {color, dispatch} = useTitleColorContext()

  const setTitleColor = (color) => {
    dispatch({ type: color })
    console.log(color)
  }

  return (
    <div>
        <h1 style={{color}}>Home</h1>
        <p>{counter}</p>
        <ChangeCounter />
        <div>
          <button onClick={() => setTitleColor("RED")}>Vermelho</button>
          <button onClick={() => setTitleColor("BLUE")}>Blue</button>
          <button onClick={() => setTitleColor("PURPLE")}>Purple</button>
        </div>
    </div>
  )
}

export default Home