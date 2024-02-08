import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { projectFirestore } from '../../firebase/config'
import { useTheme } from '../../hooks/useTheme'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Search.css'

// components 
import RecipeList from '../../components/RecipeList'

export default function Search() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q').toLowerCase().trim()
    const { mode } = useTheme()

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const { user } = useAuthContext()

    useEffect(() => {
        setIsPending(true)

        const ref = projectFirestore.collection('recipes').where("uid", "==", user.uid)

        const unsub = ref.onSnapshot((snapshot) => {
            if(snapshot.empty){
                setError('No recipes found')
                setIsPending(false)
            } else{
                let results = []
                snapshot.docs.forEach(doc => {
                    if(doc.data().title.toLowerCase().trim().includes(query))
                    results.push({ id: doc.id, ...doc.data() })
                })
                setData(results)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsub()

    }, [query])

    return (
        <div className='search'>
            <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
            {error && <p className={`error ${mode}`}>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}
