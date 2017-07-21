/**
*
* SearchProductAutocomplete
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class SearchProductAutocomplete extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

SearchProductAutocomplete.propTypes = {

};

export default SearchProductAutocomplete;
