import React, { useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Pagination,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFail,
  fetchStart,
  fetchSuccess,
  nextPage,
  previousPage,
  targetPage,
} from '../reducer/stateReducer';
import { webOptions } from '../utils/searchOptions';
import SearchBox from './SearchBox';
import Navigate from './Navigate';

const WebScreen = () => {
  const { isLoading, result, error, pages, keyword } = useSelector(
    (state) => state.stateReducer
  );
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchStart());
    axios
      .request(webOptions(keyword, (pages[0] - 1) * 20))
      .then((response) => {
        dispatch(fetchSuccess(response.data.webPages));
      })
      .catch((error) => {
        console.log(error);
        if (error && error.message) {
          dispatch(fetchFail(error.message));
        }
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [result, error]);

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    pages && handleSearch();
  }, [pages, keyword]);

  return (
    <Container fluid="sm">
      <SearchBox />
      <Navigate disabled={'web'} />
      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading && (
        <Row className="justify-content-center mt-3">
          <Spinner animation="border" />
        </Row>
      )}
      {result?.value && (
        <Row className="flex-column border-top mt-3">
          <p>About {result.totalEstimatedMatches} results</p>
          {result?.value.map((value, index) => (
            <Col key={index} className="py-3" md={8} lg={8}>
              <a href={value.url}>{value.name}</a>
              <p>{value.snippet}</p>
            </Col>
          ))}
          <Col>
            <Pagination>
              <Pagination.Prev onClick={() => dispatch(previousPage())} />
              {pages.map((item, index) => (
                <Pagination.Item
                  key={index}
                  active={index === 0}
                  onClick={() => dispatch(targetPage(item))}
                >
                  {item}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => dispatch(nextPage())} />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WebScreen;
