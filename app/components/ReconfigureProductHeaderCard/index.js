/**
*
* ReconfigureProductHeaderCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap/lib';

class ReconfigureProductHeaderCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="card  margin" >
        <div className="card-icon"><Glyphicon className="cartIcon" glyph="wrench" /></div>
        <div className="card-detail">
          <div>
            <div className="cartFont">{this.props.quoteName} - <span style={{ marginTop: '0px', fontSize: '20px' }}>Configure Products</span></div>
          </div>
        </div>
      </div>
    );
  }
}

ReconfigureProductHeaderCard.propTypes = {
  quoteName: React.PropTypes.any,
};

export default ReconfigureProductHeaderCard;
