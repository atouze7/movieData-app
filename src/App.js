import Homepage from "./components/Homepage";
import "./App.css";
import { useState } from "react";
import Results from "./components/Results";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState({});
  const [state, setState] = useState(false);
  const allResults = [];

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const clickHandler = () => {
    setState(true);
    console.log(inputValue);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_KEY,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${inputValue}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setResults(response))
      .catch((err) => console.error(err));
  };

  const keyEvent = (e) => {
    if (e.key === "Enter") {
      clickHandler();
    }
  };
  //console.log(results);

  for (let i = 0; i < results.results?.length; i++) {
    if (results.results[i]?.media_type === "movie") {
      allResults.push({
        title: results.results[i].title,
        overView: results.results[i].overview,
        releaseDate: results.results[i].release_date,
        poster: results.results[i].poster_path,
        media: results.results[i].media_type,
      });
    } else if (results.results[i]?.media_type === "person") {
      allResults.push({
        name: results.results[i].name,
        poster: results.results[i].profile_path,
        knownFor: results.results[i].known_for,
        media: results.results[i].media_type,
      });
    } else if (results.results[i]?.media_type === "tv") {
      allResults.push({
        name: results.results[i].name,
        overView: results.results[i].overview,
        poster: results.results[i].poster_path,
        releaseDate: results.results[i].first_air_date,
        media: results.results[i].media_type,
      });
    }
  }
  //console.log(allResults);

  return (
    <div className="app">
      {!state ? (
        <Homepage></Homepage>
      ) : (
        <Results results={allResults}></Results>
      )}
      <div className="search">
        <input
          placeholder="Search for a Movie or TV show..."
          onChange={changeHandler}
          onKeyDown={keyEvent}
        ></input>
        <button onClick={clickHandler} className="searchbtn">
          Search
        </button>
      </div>
    </div>
  );
}

export default App;
