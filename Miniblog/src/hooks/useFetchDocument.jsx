import { useState, useEffect } from "react";
import {db} from "../firebase/config"
import { doc, getDoc  } from "firebase/firestore";

const useFetchDocument = (docCollection, id) => {
    const [postDocument, setPostDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled,setCancelled] = useState(false)

    useEffect(() => {

        const loadDocument = async () => {
            if(cancelled){ 
                return
            }

            setLoading(true)
            
            try {
                const docRef = await doc(db, docCollection, id)
                const  docSnap = await getDoc(docRef)
                
                setPostDocument(docSnap.data())
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
            
            setLoading(false)    
        }

        loadDocument()
    }, [docCollection, id])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

        return {postDocument, loading, error}
    
}

export default useFetchDocument