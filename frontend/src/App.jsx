import React, { useCallback, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cuisine from './components/Cuisine'
import HomeView from './components/HomeView'
import Serach from './components/Search'
import RecipeDeatils from './components/RecipeDetails'



const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [serachLoading, setSerachLoading] = useState(false);

  const API_URL = "https://www.themealdb.com/api/json/v1/1/"

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchQuery(query);
    setSearchResult([]);
    setSerachLoading(true);

    try {
      const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);

      if (!res.ok) {
        throw new Error(`error: ${res.status}`);
      }

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSerachLoading(false);
    }

  }, []);

  // filter by category
  const filterByCategory = useCallback((category) => {
    filterRecipe(category, "c")
  }, [filterRecipe]);

  // filter by area
  const filterByArea = useCallback((area) => {
    filterRecipe(area, "a")
  }, [filterRecipe]);

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    setSearchResult([]);
    setSerachLoading(true);

    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);

      if (!res.ok) {
        throw new Error(`error: ${res.status}`);
      }

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSerachLoading(false);
    }

  }, [])
  return (
    <>
      <BrowserRouter>
        <div className='min-h-screen bg-gray-950 font-sans text-gray-100' >
          <Navbar handleSearch={handleSearch} />
          <Cuisine filterByArea={filterByArea} />
          <Routes>
            <Route path='/' element={<HomeView filterByCategory={filterByCategory} />} />
            <Route path='/recipe/:id' element={<RecipeDeatils />} />
            <Route path='/search/:query' element={<Serach meals={searchResult} loading={serachLoading} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App