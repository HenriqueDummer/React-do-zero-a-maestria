import React from 'react'
import useFetch from '../../hooks/useFetch'
import { Link, useSearchParams } from 'react-router-dom'

const Search = () => {
    const [searchParams] = useSearchParams()

    const url = "http://localhost:3000/products?" + searchParams

    const {data: items, loading, error} = useFetch(url)
    console.log(items)
  return (
    <div>
        <h1>Resultados da busca</h1>
        {items && items.map((item) => (
            <li key={item.id}>
            <h2>{item.name}</h2> 
            <p>R$ {item.price}</p>
            <Link to={`/products/${item.id}`}>Detalhes</Link>
            </li>
        ))}
    </div>

    
  )
}

export default Search