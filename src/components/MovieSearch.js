import React, { useState } from "react";
import axios from "axios";

const MovieSearch = () => {
    
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "99eb9fd1";

  const fetchMovies = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError("");
      } else {
        setError("Invalid movie name. Please try again.");
        setMovies([]);
      }
    } catch (err) {
      setError("An error occurred while fetching movies.");
      setMovies([]);
    }
  };

  return (
    <div className="movie-search">
      <h2>Movie Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie title..."
      />
      <button onClick={fetchMovies}>Search</button>
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title} ({movie.Year})</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
