import React from 'react'
import { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'

const useCounterContext = () => {

    const context = (useContext(CounterContext))

    if(!context){
        console.log("Erro")
    }

  return context;
}

export default useCounterContext