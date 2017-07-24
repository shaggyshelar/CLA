/**
*
* EditQuoteHeaderCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import {Row, Col,Grid,Glyphicon } from 'react-bootstrap/lib';

class EditQuoteHeaderCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Row className="show-grid  margin" >
        <Col xs={1} md={4} ><Glyphicon className="cartIcon" glyph='shopping-cart' /></Col>
        <Col xs={8}>
          <Row>
            <Col sm={12} className="cartFont">Q-00116|Edit Quote</Col>
          </Row>
          <Row>
            <Col sm={12} className="cartFont">Total: $150,000.00</Col>
          </Row>
        </Col>
      </Row>
      
    );
  }
}

EditQuoteHeaderCard.propTypes = {

};

export default EditQuoteHeaderCard;
