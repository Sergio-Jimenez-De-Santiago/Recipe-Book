import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
import { useTheme } from '../../hooks/useTheme'

// styles
import './Search.css'

// components 
import RecipeList from '../../components/RecipeList'

export default function Search() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q').toLowerCase()
    const { mode } = useTheme()

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true)

        const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
            if(snapshot.empty){
                setError('No recipes found')
                setIsPending(false)
            } else{
                let results = []
                snapshot.docs.forEach(doc => {
                    if(doc.data().title.toLowerCase().includes(query))
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
        <div>
            <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}
