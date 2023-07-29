import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Trending from "./Trending";

const Homepage = () => {
  const [trendingMovies, setTrendingMovies] = useState({});
  //require("dotenv").config();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_KEY,
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/movie/day", options)
      .then((response) => response.json())
      .then((data) => {
        setTrendingMovies(data);
      })
      .catch((err) => console.error(err));
  }, []);
  //console.log(trendingMovies);

  return (
    <React.Fragment>
      <div className="header">
        <h1 className="database">Movie Database</h1>
      </div>
      <div className="img">
        <img src="https://w0.peakpx.com/wallpaper/105/238/HD-wallpaper-spider-man-into-the-spider-verse-movie-marvel-super-miles-morales-avengers-silverbull.jpg"></img>
        <h3 className="text">
          Explore millions of different movies and TV shows.
        </h3>
      </div>
      <Trending trendingMovies={trendingMovies}></Trending>
    </React.Fragment>
  );
};

export default Homepage;
