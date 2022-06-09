import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigate = ({ disabled }) => {
  return (
    <Row>
      <Col>
        <Link to="/web">
          <Button className="mx-2" disabled={disabled === 'web'}>
            Web
          </Button>
        </Link>
        <Link to="/image">
          <Button className="mx-2" disabled={disabled === 'image'}>
            Images
          </Button>
        </Link>
        <Link to="/map">
          <Button className="mx-2" disabled={disabled === 'translate'}>
            Translate
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Navigate;
