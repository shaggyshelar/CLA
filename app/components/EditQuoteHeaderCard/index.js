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
      <div>
        <div>
          <div>
            <div className="cartFont">
              <span style={{ marginTop: '0px', fontSize: '20px' }}>
                Grand Total: {this.props.currency} {this.props.total.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </span>
              {this.props.dataChanged ? <Glyphicon title="Please Calculate to get updated values" className="calculateSign" glyph="warning-sign" /> : ''}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

EditQuoteHeaderCard.propTypes = {
  // name: React.PropTypes.any,
  currency: React.PropTypes.any,
  total: React.PropTypes.any,
  dataChanged: React.PropTypes.any,
};

export default EditQuoteHeaderCard;
