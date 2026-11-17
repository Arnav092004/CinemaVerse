import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/Home'

import MovieDetails from './pages/MovieDetails'

import Favorites from './pages/Favorites'

import Auth from './pages/Auth'

import SearchResults from './pages/SearchResults'

import ProtectedRoute from './components/ProtectedRoute'

import Profile from './pages/Profile'

import AIAssistant from './pages/AIAssistant'



function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route
          path="/"
          element={<Auth />}
        />



        {/* HOME */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>

              <Home />

            </ProtectedRoute>
          }
        />



        {/* MOVIE DETAILS */}

        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>

              <MovieDetails />

            </ProtectedRoute>
          }
        />



        {/* FAVORITES */}

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>

              <Favorites />

            </ProtectedRoute>
          }
        />



        {/* SEARCH */}

        <Route
          path="/search"
          element={
            <ProtectedRoute>

              <SearchResults />

            </ProtectedRoute>
          }
        />

        <Route path="/profile"  
            element={<Profile />} />

            <Route path="/ai" element={<AIAssistant />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App