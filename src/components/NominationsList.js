import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./NominationsList.css";
import { Award, X, Trash } from "react-bootstrap-icons";

const NominationItem = (movie) => {
  console.log(movie.movie);
  return (
    <ListGroup.Item
      onClick={() => movie.setSelected(movie.movie.imdbID)}
      action
    >
      <div className="nominationItem">
        <h5 className="listInfo">{movie.movie.Title}</h5>
        <Badge pill variant="info" className="nominationBadge">
          {movie.movie.Year}
        </Badge>
        <Button
          onClick={() => movie.onRemove()}
          variant="outline-danger"
          className="deleteButton"
        >
          <X size={30} />
        </Button>
      </div>
    </ListGroup.Item>
  );
};

const NominationsList = (data) => {
  console.log(data.nominations);
  const count = Object.keys(data.nominations).length;

  const items = Object.entries(data.nominations).map(([key, value]) => {
    console.log(value);
    return (
      <NominationItem
        key={key}
        movie={value}
        onRemove={() => data.removeOne(key)}
        setSelected={data.setSelected}
      />
    );
  });
  return (
    <ListGroup className="nominationsList">
      <ListGroup.Item>
        <h5>
          <Award /> {count}/5 nominations <Award />
          <Button
            onClick={() => data.onClear()}
            variant="outline-danger"
            className="deleteButton"
          >
            <Trash size={20} />
          </Button>
        </h5>
      </ListGroup.Item>
      {items}
    </ListGroup>
  );
};
export default NominationsList;
