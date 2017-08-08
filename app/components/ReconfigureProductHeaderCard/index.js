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
            <div className="cartFont" style={{ marginTop: '5px' }}>Q-00116</div>
          </div>
        </div>
      </div>
    );
  }
}

ReconfigureProductHeaderCard.propTypes = {

};

export default ReconfigureProductHeaderCard;
