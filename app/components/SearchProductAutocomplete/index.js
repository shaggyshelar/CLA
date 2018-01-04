/**
*
* SearchProductAutocomplete
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap/lib';
import { SERVER_URL, EntityURLs, tempPriceBookId } from 'containers/App/constants';
class SearchProductAutocomplete extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      disableSearch: false,
      options: [],
      isLoding: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSearchClick() {
    const searchInputValue = ReactDOM.findDOMNode(this).getElementsByClassName('rbt-input-main')[0].value;
    this.props.onSearchClick(searchInputValue);
  }

  handleChange(selection) {
    this.props.onSearchItemSelected(selection[0]);
  }

  handleInputChange(selection) {
    if (this.state.options.length > 0) {
      this.setState({
        options: [],
        isLoding: true,
      });
    }
    //let priceBookId = 'C0FE4869-0F78-E711-811F-C4346BDC0E01';
   // let priceBookId = 'e171145c-86b9-e711-8131-c4346bdcdf81';
    let priceBookId = '';
    if (process.env.NODE_ENV === 'production') {
      priceBookId = this.props.location.query.PriceBookId;
    } else {
      priceBookId = tempPriceBookId;
    }
    const searchObj = {
      searchValue: selection,
      fromSearch: false,
      groupId: this.props.location.query.groupId,
      priceBookId,
      quoteId: this.props.location.query.QuoteId,
    };
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/GetProducts?PriceListId=${searchObj.priceBookId}&QuoteId=${searchObj.quoteId}&SearchValue=${searchObj.searchValue}`}`;
    fetch(requestURL).then((response) => response.json()).then((json) => {
      this.setState({
        options: json.products.map((item) => item.name),
        isLoding: false,
      });
    });
    //this.props.searchInputChange(selection);
  }
  onInputChange(text) {
    if (text === '') {
      this.props.onSearchClick(text);
    }
  }

  render() {
    return (
      <ButtonGroup className="margin" style={{ display: 'inline-flex', width: '90%' }} id="searchId">
        <Typeahead
          options={this.props.data}
          onChange={this.handleChange}
          placeholder={this.props.place}
          onInputChange={this.onInputChange}
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
