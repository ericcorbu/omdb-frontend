import PropTypes from "prop-types";
import React from "react";
import { Badge } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./MovieInfo.css";
const MovieInfo = (props) => {
  const data = props.data;
  // console.log(data);
  const genres = data.Genre.split(",");
  const genreBadges =
    genres.map((genre) => (
      <Badge pill variant="secondary" key={genre}>
        {genre}
      </Badge>
    )) || null;
  const image =
    data.Poster != "N/A" ? (
      <Card.Img variant="left" src={data.Poster} className="image" />
    ) : null;
  return (
    <Card className="infoCard">
      <div className="flexBox">
        <div>
          <Card.Title>
            <h1 className="title">{data.Title} </h1>
          </Card.Title>
          {genreBadges}
          <br />
          <Card.Subtitle>Year: {data.Year}</Card.Subtitle>
          <p>Runtime: {data.Runtime}</p>
          <p className="plot">{data.Plot}</p>
        </div>

        <Card.Body></Card.Body>
        {image}
      </div>
    </Card>
  );
};

MovieInfo.propTypes = {
  data: PropTypes.object,
};
export default MovieInfo;
