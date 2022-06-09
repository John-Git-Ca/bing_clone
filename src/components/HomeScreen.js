import React from 'react';
import SearchBox from './SearchBox';
import { Container } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <Container fluid="sm">
      <SearchBox />
    </Container>
  );
};

export default HomeScreen;
