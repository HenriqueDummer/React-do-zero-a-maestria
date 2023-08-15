import { useState, useEffect } from 'react'
import './App.css'

import useFetch from './hooks/useFetch'

const url = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([])

  const {data: items, httpConfig, loading, error} = useFetch(url)

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)

  // useEffect(() => {
  //  async function fetchData() {
  //     const res = await fetch(url)
  
  //     const data = await res.json()

  //     setProducts(data)
  //   }
    

  //   fetchData()
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    }

    httpConfig(product, "POST")

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product)
    // })

    // const addedProduct = await res.json()
    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    // refatorando post
    
    setName("")
    setPrice(0)
  }

  const handleDelete = async (product) => {
    const tempUrl = url + '/' + product.id

    httpConfig(product, "DELETE", tempUrl)
  }

  return (
    <div className='App'>
      <h1>Lista de Produtos</h1>
      {error && <p>{error}</p>}
      {loading ? 
      <p>Carregando...</p>
        :
      items && items.map((product) => (
        <li key={product.id}>{product.name} - R${product.price} <button onClick={() => handleDelete(product)}>Delete</button></li>
      ))
    }
      

      <div className="add_product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input required type="text" value={name} name='name' onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Price:
            <input required type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value) }/>
          </label>
          {loading ? 
            <input disabled className='submit_btn' type="submit" value="Aguarde"/>
            : 
            <input className='submit_btn' type="submit" value="Adicionar"/>}
          
        </form>
      </div>
    </div>
  )
}

export default App
