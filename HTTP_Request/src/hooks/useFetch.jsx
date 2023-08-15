import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)

    // Refatorando post

    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [deleteUrl, setDeleteUrl] = useState("")

    const httpConfig = (data, method, tempUrl) => {
        setDeleteUrl(tempUrl)
        if(method === "POST"){
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            })
        }

        else if(method === "DELETE"){

            setConfig({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            })
        }

        setMethod(method)
    }

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true)

            try{
                const res = await fetch(url)
                const json = await res.json()

                setData(json)
            } catch (error){
                setError("Algo deu errado, tente novamente mais tarde")
            } 

            setLoading(false)
        }

        fetchData()

    }, [url, callFetch])

    // refatorando post

    useEffect(() => {
        const httpRequest = async () => {
            if(method === "POST"){
                let fetchOptions = [url, config]
    
                const res = await fetch(...fetchOptions)
                const json = await res.json()
    
                setCallFetch(json)
            }

            else if(method === "DELETE"){
                let fetchOptions = [deleteUrl, config]
    
                const res = await fetch(...fetchOptions)
                const json = await res.json()
    
                setCallFetch(json)
            }
        }

        httpRequest()
    }, [config])

    return {data, httpConfig, loading, error}
} 

export default useFetch
