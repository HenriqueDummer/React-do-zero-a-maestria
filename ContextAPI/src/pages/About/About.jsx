import React from 'react'

import ChangeCounter from '../../components/ChangeCounter'

import useCounterContext from '../../hooks/useCounterContext'

const About = () => {
  const {counter} = useCounterContext()
  return (
    <div>
        <h1>About</h1>
        <p>{counter}</p>
        <ChangeCounter />
    </div>
  )
}

export default About