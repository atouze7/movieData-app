import "./Results.css";
import { createElement } from "react";
import { render } from "@testing-library/react";

const Results = (props) => {
  const results = props.results;

  const btnClickHandler = () => {
    const modalDiv = document.querySelector(".modal-div").remove();
    const imgDiv = document.querySelector(".modal-imgs").remove();
    const btnsDiv = document.querySelector(".modal-btns").remove();
  };

  const output = results.map((obj, id) => {
    const pOverView = <p className="tag-overview">{obj.overView}</p>;
    const pTitle = <p className="tag-title">{obj.title}</p>;
    const poserPath = `https://image.tmdb.org/t/p/w185/${obj.poster}`;

    const clickListener = () => {
      let div1 = createElement(
        "div",
        { className: "modal-div", id: "id-div" },
        pOverView,
        pTitle
      );
      render(div1, document.querySelector(".main-div"));

      let img2 = createElement(
        "img",
        { src: poserPath, className: "modal-imgs", id: "id-div" },
        null
      );
      render(img2, document.querySelector(".main-div"));

      let btn1 = createElement(
        "button",
        { onClick: btnClickHandler, className: "modal-btns", id: "id-div" },
        "X"
      );
      render(btn1, document.querySelector(".main-div"));
    };

    if (obj.media === "person" && obj.poster != null) {
      return (
        <div key={id} className="indiv-div">
          <img src={poserPath} className="img2"></img>
          <div className="h4-div">
            <h4> {obj.name}</h4>
          </div>
        </div>
      );
    } else if (obj.media === "tv" && obj.poster != null) {
      return (
        <div key={id} className="indiv-div">
          <button className="info-btns" onClick={clickListener}>
            …
          </button>
          <img src={poserPath} className="img2"></img>
          <div className="h4-div">
            <h4>{obj.name}</h4>
          </div>
        </div>
      );
    } else if (obj.media === "movie" && obj.poster != null) {
      return (
        <div key={id} className="indiv-div">
          <img src={poserPath} className="img2"></img>
          <button className="info-btns" onClick={clickListener}>
            …
          </button>
          <div className="h4-div">
            <h4>{obj.title}</h4>
          </div>
        </div>
      );
    }
  });

  return (
    <div className="main-div">
      <div className="header">
        <h1 className="database">Movie Database</h1>
      </div>
      <button
        className="home"
        onClick={() => {
          window.location.reload();
        }}
      >
        Home
      </button>
      <div className="results-div">{output}</div>
    </div>
  );
};

export default Results;
