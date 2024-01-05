import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// styles
import './Navbar.css'

// components
import Searchbar from './Searchbar'

export default function Navbar() {
    const { color } = useTheme()

    return (
        <div className='navbar' style={{ background: color }}>
            <nav>
                <Link to="/Recipe-Book" className="brand">
                    <h1>Sergio's recipe book</h1>
                </Link>
                <Searchbar />
                <Link to="/Recipe-Book/create">Create Recipe</Link>
            </nav>
        </div>
    )
}
