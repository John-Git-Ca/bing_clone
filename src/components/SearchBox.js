import React, { useState } from 'react';
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateKeyword } from '../reducer/stateReducer';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword } = useSelector((state) => state.stateReducer);
  const [searchKey, setSearchKey] = useState(keyword);
  const dispatch = useDispatch();

  const handleToHome = () => {
    localStorage.removeItem('keyword');
    setSearchKey('');
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateKeyword(searchKey));
    navigate('/web');
  };

  return (
    <Row className="justify-content-center">
      <Col md={10} className="d-flex justify-content-center">
        <Link to="/" onClick={handleToHome}>
          <h3 className="me-3">Bing Clone</h3>
        </Link>
        <Form style={{ width: '50%' }} onSubmit={handleSearch}>
          <FormControl
            type="text"
            value={searchKey}
            onChange={(e) => e.keyCode === setSearchKey(e.target.value)}
          ></FormControl>
        </Form>
        <Link to="/web">
          <Button
            type="submit"
            variant=""
            className="searchBtn"
            onClick={handleSearch}
          >
            🔎
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default SearchBox;
