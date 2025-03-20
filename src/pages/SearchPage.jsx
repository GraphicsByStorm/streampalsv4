import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchRow from '../components/SearchRow';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=1`
      );

      const results = response.data.results;
      const movies = results.filter(result => result.media_type === 'movie');
      const tvShows = results.filter(result => result.media_type === 'tv');
      setMovies(movies);
      setTvShows(tvShows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="w-full h-screen bg-blapal-500">
      <div className="container mx-auto p-4 pt-6">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            onKeyPress={handleKeyPress}
            placeholder="Search for a movie or TV show..."
            className="w-full mt-24 p-2 pl-10 text-sm text-tanpal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purpal-500 bg-blapal-800"
          />
          <button
            type="submit"
            className="ml-4 mt-24 bg-purpal-500 hover:bg-purpal-600 text-tanpal-500 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purpal-500"
          >
            Search
          </button>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {movies.length > 0 && (
              <SearchRow title="Movies" results={movies} rowID="movies" />
            )}
            {tvShows.length > 0 && (
              <SearchRow title="TV Shows" results={tvShows} rowID="tvShows" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;