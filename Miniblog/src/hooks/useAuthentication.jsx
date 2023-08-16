import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // Deal with memory leak

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled){
            return;
        }
    }

        const createUser = async (data) => {
            checkIfIsCancelled()

            setLoading(true)

            try {

                const {user} = await createUserWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                )

                await updateProfile(user, {
                    displayName: data.displayName
                })

                return user
            } catch (error) {
                console.log(`error => ${error.message}`)  
                setError(error.message)
            }
            
            setLoading(false)
        }

        const logout = () => {
            checkIfIsCancelled()
            signOut(auth)
        }

        // Login

        const login = async(data) => {
            checkIfIsCancelled()

            setLoading(true)
            setError(false)

            try {
                await signInWithEmailAndPassword(auth, data.email, data.password)
            } catch (error) {
                setError(error.message)
            }

            setLoading(false)
        }

        useEffect(() => {
            setCancelled(true)
        }, [])
    
        return {
            auth,
            createUser,
            error,
            loading,
            logout,
            login
        }
    }

export default useAuthentication