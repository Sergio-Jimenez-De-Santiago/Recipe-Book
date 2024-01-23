import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Home.css'

// components 
import RecipeList from '../../components/RecipeList'

export default function Home() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection(
        'recipes',
        ["uid", "==", user.uid]
        )
    // const [data, setData] = useState(null)
    // const [isPending, setIsPending] = useState(false)
    // const [error, setError] = useState(null)
    

    // useEffect(() => {
    //     setIsPending(true)

    //     const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
    //         if(snapshot.empty){
    //             setError('No recipes to load')
    //             setIsPending(false)
    //         } else{
    //             let results = []
    //             snapshot.docs.forEach(doc => {
    //                 results.push({ id: doc.id, ...doc.data() })
    //             })
    //             setData(results)
    //             setIsPending(false)
    //         }
    //     }, (err) => {
    //         setError(err.message)
    //         setIsPending(false)
    //     })

    //     return () => unsub()

    // }, [])
    
    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {/* {isPending && <p className='loading'>Loading...</p>} */}
            {documents && <RecipeList recipes={documents} />}
        </div>
    )
}
