import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from './SearchBox';
import { fetchStart, fetchFail, fetchSuccess } from '../reducer/stateReducer';
import { imageOptions } from '../utils/searchOptions';
import axios from 'axios';
import { Row, Col, Alert, Spinner, Pagination } from 'react-bootstrap';
import './imageScreen.css';
import { previousPage, targetPage, nextPage } from '../reducer/stateReducer';
import Navigate from './Navigate';

const ImageScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pages, error, isLoading, result } = useSelector(
    (state) => state.stateReducer
  );

  const handleSearch = () => {
    dispatch(fetchStart());
    axios
      .request(imageOptions(keyword, (pages[0] - 1) * 20))
      .then((response) => {
        dispatch(fetchSuccess(response.data));
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
    pages && handleSearch();
  }, [pages, keyword]);
  console.log(result);

  return (
    <Container fluid="sm">
      <SearchBox />
      <Navigate disabled={'image'} />
      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading && (
        <Row className="justify-content-center mt-3">
          <Spinner animation="border" />
        </Row>
      )}
      {result?.value && (
        <Row>
          <p>About {result.totalEstimatedMatches} results</p>
          {result.value.map((value, index) => {
            if (value)
              return (
                <Col key={index}>
                  <Card className="cardBox">
                    <a
                      href={value.hostPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Card.Img
                        variant="top"
                        src={value.contentUrl}
                        className="cardImage"
                      ></Card.Img>
                    </a>
                    <Card.Text className="cardText">{value.name}</Card.Text>
                  </Card>
                </Col>
              );
          })}
          <Col xs={12} sm={12}>
            <Pagination className="justify-content-center">
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

export default ImageScreen;
