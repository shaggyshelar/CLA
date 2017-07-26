/**
*
* SearchProductAutocomplete
*
*/

import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import options from 'exampleData';
import { Button, ButtonGroup,Glyphicon } from 'react-bootstrap/lib';

class SearchProductAutocomplete extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ButtonGroup className="margin" style={{display: 'inline-flex',width:'90%'}}>
      <Typeahead
          labelKey="name"
          bsSize="small"
          options={options}
          placeholder="Search Products"
          className="autoCompleteWidth"
          clearButton={true}
        />
        <Button bsStyle='primary'><Glyphicon glyph='search' /></Button>
      </ButtonGroup>
    );
  }
}

SearchProductAutocomplete.propTypes = {

};

export default SearchProductAutocomplete;
