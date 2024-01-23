import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useTheme } from './hooks/useTheme'

// page components 
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import ThemeSelector from './components/ThemeSelector'

// styles
import './App.css'

function App() {
  const { authIsReady, user } = useAuthContext()
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Switch>
            <Route exact path="/Recipe-Book">
              {!user && <Redirect to="/Recipe-Book/login" />}
              {user && <Home />}
            </Route>
            <Route path="/Recipe-Book/create">
              {!user && <Redirect to="/Recipe-Book/login" />}
              {user && <Create />}
            </Route>
            <Route path="/Recipe-Book/search">
              {!user && <Redirect to="/Recipe-Book/login" />}
              {user && <Search />}
            </Route>
            <Route path="/Recipe-Book/recipes/:id">
              {!user && <Redirect to="/Recipe-Book/login" />}
              {user && <Recipe />}
            </Route>
            <Route path="/Recipe-Book/login">
              {user && <Redirect to="/Recipe-Book" />}
              {!user && <Login />}
            </Route>
            <Route path="/Recipe-Book/signup">
              {user && <Redirect to="/Recipe-Book" />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
