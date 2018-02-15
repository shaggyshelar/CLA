/**
*
* ReconfigureProductHeaderCard
*
*/

import React from 'react';
// import styled from 'styled-components';
// import { Glyphicon } from 'react-bootstrap/lib';
import messages from './messages';

class ReconfigureProductHeaderCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {/* <div className="card-icon"><Glyphicon className="cartIcon" glyph="wrench" /></div> */}
        <div className="topPadding">
          <div>
            <div className="cartFont"><span style={{ marginTop: '0px', fontSize: '20px' }}>{this.context.intl.formatMessage({ ...messages.configureProducts })}</span></div>
          </div>
        </div>
      </div>
    );
  }
}

ReconfigureProductHeaderCard.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

ReconfigureProductHeaderCard.propTypes = {
  quoteName: React.PropTypes.any,
};

export default ReconfigureProductHeaderCard;
