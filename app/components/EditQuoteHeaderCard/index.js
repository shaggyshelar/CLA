/**
*
* EditQuoteHeaderCard
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap/lib';

class EditQuoteHeaderCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="card  margin" >
        {/* <div className="card-icon"><Glyphicon className="cartIcon" glyph="shopping-cart" /></div> */}
        <div className="card-detail">
          <div>
            <div className="cartFont"><span>Grand Total: {this.props.currency} {this.props.total.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          </div>
        </div>
      </div>

    );
  }
}

EditQuoteHeaderCard.propTypes = {
  name: React.PropTypes.any,
  currency: React.PropTypes.any,
  total: React.PropTypes.any,

};

export default EditQuoteHeaderCard;
