import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '../hooks/useTheme'

// styles
import './Navbar.css'

// components
import Searchbar from './Searchbar'

export default function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const { color } = useTheme()

    return (
        <div className='navbar' style={{ background: color }}>
            <nav>
                <Link to="/Recipe-Book" className="brand">
                    <h1>Sergio's recipe book</h1>
                </Link>
                <Searchbar />
                <Link to="/Recipe-Book/create">Create Recipe</Link>
                {!user && (
                    <>
                        <p><Link to="/Recipe-Book/login">Login</Link></p>
                        <p><Link to="/Recipe-Book/signup">Signup</Link></p>
                    </>
                )}

                {user && (
                    <>
                        <p className='greetings'>Hello, {user.displayName}</p>
                        <button className='logout' onClick={logout}>Logout</button>
                    </>
                )}
            </nav>
        </div>
    )
}
