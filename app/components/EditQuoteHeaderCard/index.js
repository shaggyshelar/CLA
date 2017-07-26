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
      <div className="card  margin" >
        <div className="card-icon"><Glyphicon className="cartIcon" glyph='shopping-cart' /></div>
        <div className="card-detail">
          <div>
            <div  className="cartFont">Q-00116|Edit Quote</div>
          </div>
          <div>
            <div className="cartFont" ><h4 style={{marginTop: '0px'}}>Total: $150,000.00</h4></div>
          </div>
        </div>
      </div>
      
    );
  }
}

EditQuoteHeaderCard.propTypes = {

};

export default EditQuoteHeaderCard;
