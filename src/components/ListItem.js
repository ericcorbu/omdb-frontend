import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Award, Check } from "react-bootstrap-icons";
import "./ListItem.css";
const MovieCard = (data) => {
  // console.log(data)
  const [hover, setHover] = useState(false);
  const noImg =
    data.data.Poster !== "N/A" ? null : (
      <Badge variant="light">No image for this title</Badge>
    );
  /*
  const nominateButton = hover ? (
    //

    <Button
      variant="warning"
      className="nominate"
      onClick={() => data.onNomination(data.data)}
      disabled={data.isNominated}
    >
      Nominate <Award />
    </Button>
  ) : null;
  */
  // console.log(nominateButton);
  const btn =
    data.isNominated || data.isFull ? (
      <Button
        variant={data.isNominated ? "warning" : "secondary"}
        className="nominate"
        disabled={true}
      >
        {data.isNominated ? "Nominated " : "Nominations full "}
        {data.isNominated ? <Check /> : null}
      </Button>
    ) : (
      <Button
        variant="warning"
        className="nominate"
        onClick={() => data.onNomination(data.data)}
      >
        Nominate <Award />
      </Button>
    );
  const nominateButton = hover ? btn : null;
  return (
    <div
      className="listItem"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <Card
        style={{ width: "11rem", height: "26rem" }}
        className="listItemCard"
        onClick={() => data.onSelected(data.data.imdbID)}
      >
        <div>
          <Card.Img
            variant="top"
            src={data.data.Poster !== "N/A" ? data.data.Poster : null}
          />
          <br />
          {nominateButton}
        </div>

        <Card.Body className="cardBody">
          <div className="cardContent">
            {noImg}

            <Card.Title className="cardTitle">{data.data.Title}</Card.Title>
            <Badge pill className="year" variant="info">
              {data.data.Year}
            </Badge>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default MovieCard;
