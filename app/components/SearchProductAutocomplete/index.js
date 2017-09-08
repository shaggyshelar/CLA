/**
*
* SearchProductAutocomplete
*
*/

import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
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
    this.props.onSearchItemSelected(selection[0]);
  }

  handleInputChange(selection) {
    this.props.searchInputChange(selection);
    this.setState({
      selectedValue: selection,
    });
  }

  render() {
    let data = [];
    if (this.props.data) {
      data = this.props.data.map((item) => item.name);
    } else {
      data = [];
    }
    return (
      <ButtonGroup className="margin" style={{ display: 'inline-flex', width: '90%' }} id="searchId">
        <AsyncTypeahead
          options={data}
          labelKey="login"
          onSearch={this.handleInputChange}
          onChange={this.handleChange}
          placeholder={this.props.place}
          clearButton
        />
        <Button bsStyle="primary" onClick={this.onSearchClick}><Glyphicon glyph="search" /></Button>
      </ButtonGroup>
    );
  }
}

SearchProductAutocomplete.propTypes = {
  data: React.PropTypes.array,
  place: React.PropTypes.any,
  searchInputChange: React.PropTypes.func,
  onSearchClick: React.PropTypes.func,
  onSearchItemSelected: React.PropTypes.func,
};

export default SearchProductAutocomplete;
