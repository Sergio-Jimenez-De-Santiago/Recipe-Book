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

    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {documents && <RecipeList recipes={documents} />}
        </div>
    )
}
