import { useState, useEffect } from "react";
import StarRating from "./components/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
library.add(faCalendar);

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const myApiKey = "5dae1c6";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        if (searchQuery.length < 3) {
          setMovies([]);
          setIsLoading(false);
          setIsError(false);
          return;
        }
        const res = await fetch(
          `https://www.omdbapi.com/?s=${searchQuery}&apikey=${myApiKey}`
        );
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("No Results Found");
        }

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
        setMovies([]);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  const getMovieById = async (id) => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${myApiKey}`
      );
      const data = await res.json();

      if (data.Response === "False") {
        throw new Error("No Results Found");
      }

      setSelectedMovie(data);
    } catch (err) {}
  };

  return (
    <>
      <Navbar>
        <Logo />
        <SearchInput searchQuery={searchQuery} onSearchQuery={setSearchQuery} />
        <NumberOfResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Error />
          ) : (
            <MoviesList movies={movies} onSelectedMovie={getMovieById} />
          )}
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieDetails
              movieData={selectedMovie}
              onCloseDetails={() => setSelectedMovie("")}
              setWatchedMovies={(movieData) =>
                setWatchedMovies([...watchedMovies, movieData])
              }
              updateWatchedMovies={setWatchedMovies}
              watchedMovies={watchedMovies}
            />
          ) : (
            <WatchedMoviesList
              watchedMovies={watchedMovies}
              updateWatchedMovies={setWatchedMovies}
            />
          )}
        </Box>
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <img src="logo.png" alt="popcorn icon" />
      <h1>Popcorn</h1>
    </div>
  );
}

function SearchInput({ searchQuery, onSearchQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchQuery}
      onChange={(e) => onSearchQuery(e.target.value)}
    />
  );
}

function NumberOfResults({ movies }) {
  const numResults = movies.length;
  return (
    <p className="num-results">
      {numResults === 0 ? (
        <span>🤷‍♂️ No Results Found</span>
      ) : (
        <span>
          Found <strong>{numResults}</strong> results
        </span>
      )}
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MoviesList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title}-poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>
            <FontAwesomeIcon icon={faCalendar} style={{ color: "#dee2e6" }} />
          </span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watchedMovies, updateWatchedMovies }) {
  return (
    <>
      <WatchedSummary watchedMovies={watchedMovies} />
      <ul className="list">
        {watchedMovies.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            watchedMovies={watchedMovies}
            updateWatchedMovies={updateWatchedMovies}
          />
        ))}
      </ul>
    </>
  );
}

function WatchedSummary({ watchedMovies }) {
  // Calculate the average rating of the movies
  const avgImdbRating = Number(
    average(watchedMovies.map((movie) => movie.imdbRating))
  ).toFixed(1);
  const avgUserRating = Number(
    average(watchedMovies.map((movie) => movie.userRating))
  ).toFixed(1);
  const avgRuntime = Number(
    average(watchedMovies.map((movie) => movie.Runtime))
  ).toFixed(0);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, watchedMovies, updateWatchedMovies }) {
  const handleRemoveFromWatched = () => {
    const newWatchedMovies = watchedMovies.filter(
      (m) => m.imdbID !== movie.imdbID
    );
    updateWatchedMovies(newWatchedMovies);
  };

  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title}-poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>
      </div>
      <button className="btn-delete" onClick={handleRemoveFromWatched}>
        x
      </button>
    </li>
  );
}

function MovieDetails({
  movieData,
  onCloseDetails,
  setWatchedMovies,
  watchedMovies,
  updateWatchedMovies,
}) {
  const [userRating, setUserRating] = useState("");

  // Check if the movie is already in the watched list
  const isAdded = watchedMovies.some((movie) => {
    return movieData.imdbID === movie.imdbID;
  });

  const handleAddToWatched = () => {
    const newWatchedMovie = {
      imdbID: movieData.imdbID,
      Title: movieData.Title,
      Year: movieData.Year,
      Poster: movieData.Poster,
      Runtime: Number(movieData.Runtime.replace(" min", "")),
      imdbRating: Number(movieData.imdbRating),
      userRating: userRating,
    };
    setWatchedMovies(newWatchedMovie);
    onCloseDetails();
  };

  const handleRemoveFromWatched = () => {
    const newWatchedMovies = watchedMovies.filter(
      (movie) => movie.imdbID !== movieData.imdbID
    );
    updateWatchedMovies(newWatchedMovies);
    onCloseDetails();
  };

  // Display Movie Name on the Page Title at the Browser Tab
  useEffect(() => {
    document.title = `${movieData.Title} ${
      userRating && `( Rated ${userRating} 🌟)`
    }`;
    return () => {
      document.title = "Popcorn App"; // Clenup function to reset the page title to the default
    };
  }, [movieData, userRating]);

  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseDetails}>
        X
      </button>
      <header>
        <img
          src={`${movieData.Poster}`}
          alt={`${movieData.Title} - poster`}
        ></img>
        <div className="details-overview">
          <h2>{movieData.Title}</h2>
          <p>
            {movieData.Released} &bull; {movieData.Runtime}
          </p>
          <p>{movieData.Genre}</p>
          <p>
            <span>⭐️</span> {movieData.imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        {isAdded ? (
          <div className="rating">
            <button className="btn-remove" onClick={handleRemoveFromWatched}>
              Remove From List
            </button>
          </div>
        ) : (
          <div className="rating">
            <StarRating
              maxRating={10}
              color={"#fcc419"}
              onChangeRating={setUserRating}
            />
            {userRating > 0 && (
              <button className="btn-add" onClick={handleAddToWatched}>
                + Add To List
              </button>
            )}
          </div>
        )}

        <p>
          <em>{movieData.Plot}</em>
        </p>
        <p>Starring {movieData.Actors}</p>
        <p>Directed by {movieData.Director}</p>
      </section>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
}

function Error() {
  return (
    <div className="error">
      <span>⚠️</span>
      <p>Somthing Went Wrong, Please Try Again 😁</p>
    </div>
  );
}
