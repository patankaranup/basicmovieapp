import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// 5977e0fe
const API_URL = "http://www.omdbapi.com?apikey=5977e0fe";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return (
    <>
      <div className="app">
        <h1>MovieVerse</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Search for Movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="SearchIcon"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => {
              return <MovieCard movie={movie} />;
            })}
          </div>
        ) : (
          <div className="empty">
            <h2> No Movies Found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
