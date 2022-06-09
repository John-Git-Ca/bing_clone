import React, { useEffect, useState } from 'react';
import { Container, Col, Row, FormControl, Button } from 'react-bootstrap';
import Navigate from './Navigate';
import SearchBox from './SearchBox';
import axios from 'axios';
import { TranslateOptions } from '../utils/searchOptions';

const TranslateScreen = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = () => {
    axios
      .request(TranslateOptions(input, 'zh', 'en'))
      .then((response) => {
        console.log(response.data.data.translations[0].translatedText);
        setResult(response.data.data.translations[0].translatedText);
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container fluid="sm">
      <SearchBox />
      <Navigate disabled="translate" />
      <Row>
        <Col>Languages Detected</Col>
        <Col>Languages Detected</Col>
      </Row>
      <Row>
        <Col>
          <FormControl
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></FormControl>
        </Col>
        <Col>
          <Button onClick={handleSearch}>Translate</Button>
        </Col>
        <Col>{result}</Col>
      </Row>
    </Container>
  );
};

export default TranslateScreen;
