import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'

// page components 
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import ThemeSelector from './components/ThemeSelector'

// styles
import './App.css'

function App() {
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path="/Recipe-Book">
            <Home />
          </Route>
          <Route path="/Recipe-Book/create">
            <Create />
          </Route>
          <Route path="/Recipe-Book/search">
            <Search />
          </Route>
          <Route path="/Recipe-Book/recipes/:id">
            <Recipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
