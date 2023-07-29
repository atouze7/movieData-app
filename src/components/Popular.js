import { useEffect, useState, createElement } from "react";
import "./Popular.css";
import { render } from "@testing-library/react";

const Popular = () => {
  const [state, setState] = useState(false);
  const [topMovies, setTopMovies] = useState({});
  const [topTV, setTopTV] = useState({});
  //require("dotenv").config();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_KEY,
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/top_rated", options)
      .then((response) => response.json())
      .then((data) => setTopMovies(data))
      .catch((err) => console.error(err));
  }, []);
  //console.log(topMovies);

  const options2 = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_KEY,
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/tv/top_rated", options2)
      .then((response) => response.json())
      .then((data) => setTopTV(data))
      .catch((err) => console.error(err));
  }, []);
  //console.log(topTV);

  const btnClickHandler1 = () => {
    document.querySelector(".modal-div").remove();
    document.querySelector(".modal-btn").remove();
    document.querySelector(".modal-img").remove();
  };

  const allTopMovies = [];
  const allTopTv = [];

  for (let i = 0; i < topTV.results?.length; i++) {
    allTopTv.push({
      title: topTV.results?.[i].original_name,
      overView: topTV.results?.[i].overview,
      poster: topTV.results?.[i].poster_path,
    });
  }

  for (let i = 0; i < topMovies.results?.length; i++) {
    allTopMovies.push({
      title: topMovies.results?.[i].title,
      overView: topMovies.results?.[i].overview,
      releaseDate: topMovies.results?.[i].release_date,
      posterPath: topMovies.results?.[i].poster_path,
    });
  }
  //console.log(allTopMovies);

  const outputTopMovies = allTopMovies.map((obj, id) => {
    const pOverView = <p className="tag-overview">{obj.overView}</p>;
    const pTitle = <p className="tag-title">{obj.title}</p>;
    const poserPath = `https://image.tmdb.org/t/p/w185/${obj.posterPath}`;
    return (
      <div key={id} className="output-movies">
        <img src={poserPath} className="posters"></img>
        <button
          className="info-btn"
          onClick={() => {
            let div1 = createElement(
              "div",
              { className: "modal-div" },
              pOverView,
              pTitle
            );
            render(div1, document.querySelector(".main-div"));

            let img2 = createElement(
              "img",
              { src: poserPath, className: "modal-img" },
              null
            );
            render(img2, document.querySelector(".main-div"));

            let btn1 = createElement(
              "button",
              { onClick: btnClickHandler1, className: "modal-btn" },
              "X"
            );
            render(btn1, document.querySelector(".main-div"));
          }}
        >
          …
        </button>
        <h4 className="h4">{obj.title}</h4>
      </div>
    );
  });

  const outputTopTV = allTopTv.map((obj, id) => {
    const pOverView = <p className="tag-overview">{obj.overView}</p>;
    const pTitle = <p className="tag-title">{obj.title}</p>;
    const poserPath = `https://image.tmdb.org/t/p/w185/${obj.poster}`;
    return (
      <div key={id} className="output-movies">
        <img src={poserPath} className="posters"></img>
        <button
          className="info-btn"
          onClick={() => {
            let div1 = createElement(
              "div",
              { className: "modal-div" },
              pOverView,
              pTitle
            );
            render(div1, document.querySelector(".main-div"));

            let img2 = createElement(
              "img",
              { src: poserPath, className: "modal-img" },
              null
            );
            render(img2, document.querySelector(".main-div"));

            let btn1 = createElement(
              "button",
              { onClick: btnClickHandler1, className: "modal-btn" },
              "X"
            );
            render(btn1, document.querySelector(".main-div"));
          }}
        >
          …
        </button>
        <h4 className="h4">{obj.title}</h4>
      </div>
    );
  });

  const movieClickHandler = () => {
    setState(false);
  };

  const tvClickHandler = () => {
    setState(true);
  };

  const movieClass = !state ? "pop-movie-btn" : "pop-movie-btn2";

  const tvClass = state ? "pop-tv-btn" : "pop-tv-btn2";
  return (
    <div>
      <div className="popular-div">
        <h2>Top Rated</h2>
        <button className={movieClass} onClick={movieClickHandler}>
          Movies
        </button>
        <button className={tvClass} onClick={tvClickHandler}>
          TV shows
        </button>
        <div className="output">{!state ? outputTopMovies : outputTopTV}</div>
      </div>
    </div>
  );
};

export default Popular;
