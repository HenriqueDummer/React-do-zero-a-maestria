import React from 'react'


import ChangeCounter from '../../components/ChangeCounter'

import useCounterContext from '../../hooks/useCounterContext'


const Product = () => {
  const {counter} = useCounterContext()
  
  return (
    <div>
      <h1>Product</h1>
      <p>{counter}</p>
      <ChangeCounter />
    </div>

  )
}

export default Product