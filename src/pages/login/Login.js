import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useTheme } from '../../hooks/useTheme'

// styles
import './Login.css'

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()
    const { mode } = useTheme()

    const handleSumbit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form onSubmit={handleSumbit} className={`login-form ${mode}`}>
            <h2>Login</h2>
            <label>
                <span>Email:</span>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button className='btn' disabled>loading</button>}
            {error && <p>{error}</p>}
        </form>
    )
}