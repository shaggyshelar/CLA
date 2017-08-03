/**
*
* SearchProductAutocomplete
*
*/

import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap/lib';
class SearchProductAutocomplete extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ButtonGroup className="margin" style={{ display: 'inline-flex', width: '90%' }}>
        <Typeahead
          labelKey="name"
          bsSize="small"
          options={this.props.data.map((item) => item['PRODUCT NAME'])}
          placeholder="Search Products"
          className="autoCompleteWidth"
          clearButton
        />
        <Button bsStyle="primary"><Glyphicon glyph="search" /></Button>
      </ButtonGroup>
    );
  }
}

SearchProductAutocomplete.propTypes = {
  data: React.PropTypes.array,
};

export default SearchProductAutocomplete;
