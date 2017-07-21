/**
*
* ProductSelectionHeaderCard
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class ProductSelectionHeaderCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ProductSelectionHeaderCard.propTypes = {

};

export default ProductSelectionHeaderCard;
