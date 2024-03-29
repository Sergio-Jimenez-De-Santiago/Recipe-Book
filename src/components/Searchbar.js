import { useState } from 'react'

// styles
import './Searchbar.css'
import { useHistory } from 'react-router-dom'

export default function SearchBar() {
    const [term, setTerm] = useState('')
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        history.push(`/Recipe-Book/search?q=${term}`)
        setTerm('')
    }

    return (
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search'>Search:</label>
                <input
                    type='text'
                    id='search'
                    onChange={(e) => setTerm(e.target.value)}
                    required
                    value={term}
                />
            </form>
        </div>
    )
}
