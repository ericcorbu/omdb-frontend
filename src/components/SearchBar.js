import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Search } from "react-bootstrap-icons";
const SearchBar = (onChange) => {
  return (
    <div>
      <Form>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type="search" onChange={onChange} />
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchBar;
