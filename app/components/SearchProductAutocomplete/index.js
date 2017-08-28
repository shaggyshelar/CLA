/**
*
* SearchProductAutocomplete
*
*/

import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap/lib';
class SearchProductAutocomplete extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      disableSearch: false,
      onChange: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onSearchClick() {
    this.props.onSearchClick(this.state.selectedValue);
  }

  handleChange(selection) {
    this.state.onChange = true;
    this.props.onSearchItemSelected(selection[0]);
  }

  handleInputChange(selection) {
    if (!this.state.onChange) {
      this.state.selectedValue = selection;
      this.props.searchInputChange(this.state.selectedValue);
    }
    this.state.onChange = false;
  }

  render() {
    return (
      <ButtonGroup className="margin" style={{ display: 'inline-flex', width: '90%' }} id="searchId">
        <Typeahead
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          placeholder="Search Products"
          options={this.props.data.map((item) => item.name)}
          clearButton
        />
        <Button bsStyle="primary" onClick={this.onSearchClick}><Glyphicon glyph="search" /></Button>
      </ButtonGroup>
    );
  }
}

SearchProductAutocomplete.propTypes = {
  data: React.PropTypes.array,
  searchInputChange: React.PropTypes.func,
  onSearchClick: React.PropTypes.func,
  onSearchItemSelected: React.PropTypes.func,
};

export default SearchProductAutocomplete;
