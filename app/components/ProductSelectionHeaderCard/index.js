/**
*
* EditQuoteHeaderCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import {Row, Col,Grid,Glyphicon } from 'react-bootstrap/lib';

class ProductSelectionHeaderCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Row className="show-grid  margin" >
        <Col xs={1} md={4} ><Glyphicon className="cartIcon" glyph='barcode' /></Col>
        <Col xs={8}>
          <Row>
            <Col sm={12} className="cartFont">Q-00116</Col>
          </Row>
          <Row>
            <Col sm={12} className="cartFontTitle">Product Selection</Col>
          </Row>
        </Col>
      </Row>
      
    );
  }
}

ProductSelectionHeaderCard.propTypes = {

};

export default ProductSelectionHeaderCard;
