import { createElement, useEffect, useState } from "react";
import "./Trending.css";
import Popular from "./Popular";
import { render } from "@testing-library/react";

const Trending = (props) => {
  //require("dotenv").config();
  const trendingMovies = props.trendingMovies;
  const [trendingTV, setTrendingTV] = useState({});
  const [state, setState] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_KEY,
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/tv/day", options)
      .then((response) => response.json())
      .then((data) => setTrendingTV(data))
      .catch((err) => console.error(err));
  }, []);
  //console.log(trendingTV);

  const allTrendingMovies = [];
  const allTrendingTV = [];

  for (let i = 0; i < trendingTV.results?.length; i++) {
    allTrendingTV.push({
      title: trendingTV.results[i].original_name,
      overView: trendingTV.results[i].overview,
      releaseDate: trendingTV.results[i].first_air_date,
      poster: trendingTV.results[i].poster_path,
    });
  }

  for (let i = 0; i < trendingMovies.results?.length; i++) {
    allTrendingMovies.push({
      title: trendingMovies.results[i].title,
      overView: trendingMovies.results[i].overview,
      releaseDate: trendingMovies.results[i].release_date,
      poster: trendingMovies.results[i].poster_path,
    });
  }

  const btnClickHandler = () => {
    document.querySelector(".modal-div").remove();
    document.querySelector(".modal-img").remove();
    document.querySelector(".modal-btn").remove();
  };
  //console.log(allTrendingMovies);

  const outputTrendingTv = allTrendingTV.map((obj, id) => {
    const pOverView = <p className="tag-overview">{obj.overView}</p>;
    const pTitle = <p className="tag-title">{obj.title}</p>;
    const clickHandler = () => {
      let div1 = createElement(
        "div",
        { className: "modal-div" },
        pOverView,
        obj.releaseDate,
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
        { onClick: btnClickHandler, className: "modal-btn" },
        "X"
      );
      render(btn1, document.querySelector(".main-div"));
    };

    const poserPath = `https://image.tmdb.org/t/p/w185/${obj.poster}`;
    return (
      <div key={id} className="output-movies">
        <img src={poserPath} className="posters"></img>
        <button className="info-btn" onClick={clickHandler}>
          …
        </button>
        <h4 className="h4">{obj.title}</h4>
      </div>
    );
  });

  const outPutTrendingMovies = allTrendingMovies.map((obj, id) => {
    const poserPath = `https://image.tmdb.org/t/p/w185/${obj.poster}`;

    const clickHandler = () => {
      let div1 = createElement(
        "div",
        { className: "modal-div" },
        pOverView,
        obj.releaseDate,
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
        { onClick: btnClickHandler, className: "modal-btn" },
        "X"
      );
      render(btn1, document.querySelector(".main-div"));
    };
    const pOverView = <p className="tag-overview">{obj.overView}</p>;
    const pTitle = <p className="tag-title">{obj.title}</p>;
    return (
      <div key={id} className="output-movies">
        <img src={poserPath} className="posters"></img>
        <button className="info-btn" onClick={clickHandler}>
          {" "}
          …
        </button>
        <h4 className="h4">{obj.title}</h4>
      </div>
    );
  });

  const tvClickHandler = () => {
    setState(true);
  };

  const movieClickHandler = () => {
    setState(false);
  };

  const movieBtnClass = !state ? "movie-btn" : "movie-btn2";

  const tvBtnClass = state ? "tv-btn" : "tv-btn2";

  return (
    <div className="main-div">
      <div className="trend-div">
        <h2>Trending Today</h2>
        <button className={movieBtnClass} onClick={movieClickHandler}>
          Movies
        </button>
        <button className={tvBtnClass} onClick={tvClickHandler}>
          TV shows
        </button>
        <div className="output">
          {!state ? outPutTrendingMovies : outputTrendingTv}
        </div>
      </div>
      <Popular></Popular>
    </div>
  );
};

export default Trending;
