import PropTypes from "prop-types";
import React from "react";
import { Badge } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Award, Check } from "react-bootstrap-icons";
import "./MovieInfo.css";
const MovieInfo = (props) => {
  const data = props.data;
  const genres = data.Genre.split(",");
  const genreBadges =
    genres.map((genre) => (
      <Badge className="genres" pill variant="secondary" key={genre}>
        {genre}
      </Badge>
    )) || null;
  const image =
    data.Poster != "N/A" ? (
      <Card.Img variant="left" src={data.Poster} className="image" />
    ) : null;

  const year =
    data.Year != "N/A" ? <p className="oneLineContent">{data.Year} -</p> : null;

  const rating =
    data.imdbRating != "N/A" ? (
      <p className="oneLineContent">IMDb {data.imdbRating} -</p>
    ) : null;

  const runTime =
    data.Runtime != "N/A" ? (
      <p className="oneLineContent">{data.Runtime}</p>
    ) : null;

  const awards =
    data.Awards != "N/A" ? (
      <p className="otherDetails">Awards: {data.Awards}</p>
    ) : null;

  const language =
    data.language != "N/A" ? (
      <p className="otherDetails">Language: {data.Language} </p>
    ) : null;
  return (
    <Card className="infoCard">
      <div className="flexBox">
        <div className="content">
          <div className="headerDiv">
            <h1 className="title">{data.Title} </h1>
            <Button
              className="nominateButton"
              onClick={() => props.onNomination(data)}
              variant="warning"
              disabled={props.isNominated}
            >
              {!props.isNominated ? <Award size={34} /> : <Check size={34} />}
            </Button>
          </div>

          <div className="oneLine">
            {year}
            {rating}
            {runTime}
          </div>
          <div>{genreBadges}</div>

          <br />

          <p className="plot">{data.Plot}</p>
          {awards}
          <p className="otherDetails">Directors: {data.Director}</p>
          <p className="otherDetails">Starring: {data.Actors}</p>
          {language}
        </div>

        {image}
      </div>
    </Card>
  );
};

MovieInfo.propTypes = {
  data: PropTypes.object,
  isNominated: PropTypes.bool,
  onNomination: PropTypes.func,
};
export default MovieInfo;
