/**
*
* SearchProductAutocomplete
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap/lib';
class SearchProductAutocomplete extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      disableSearch: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onSearchClick() {
    const searchInputValue = ReactDOM.findDOMNode(this).getElementsByClassName('rbt-input-main')[0].value;
    this.props.onSearchClick(searchInputValue);
  }

  handleChange(selection) {
    this.props.onSearchItemSelected(selection[0]);
  }

  handleInputChange(selection) {
    this.props.searchInputChange(selection);
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
