/*
 *
 * ProductSelectionHeader
 *
 */

import React, { PropTypes } from 'react';
import screenfull from 'screenfull';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import ProductSelectionHeaderCard from 'components/ProductSelectionHeaderCard';
import SearchProductAutocomplete from 'components/SearchProductAutocomplete';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';

export class ProductSelectionHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.handleFullScreen = this.handleFullScreen.bind(this);
  }
  handleFullScreen() {
    screenfull.toggle(document.getElementById('app'));
  }
  render() {
    return (
      <Row className="show-grid">
        <Col xs={12} md={3}>
          <Helmet
            title="ProductSelectionHeader"
            meta={[
              { name: 'description', content: 'Description of ProductSelectionHeader' },
            ]}
          />

          <ProductSelectionHeaderCard />
        </Col>
        <Col xs={12} md={4} style={{ textAlign: 'left' }}>
          <SearchProductAutocomplete
            data={this.props.data}
            searchInputChange={this.props.searchInputChange}
            onSearchClick={this.props.onSearchClick}
            onSearchItemSelected={this.props.onSearchItemSelected}
          />
        </Col>
        <Col xs={12} md={5} style={{ textAlign: 'right' }}>
          <ButtonGroup className="margin">
            <Button title="Filter" onClick={this.props.toggleFilter}><Glyphicon glyph="filter" /></Button>
            <Button title="Favourites" onClick={() => { browserHistory.push('/favourites'); }} ><Glyphicon glyph="star" /></Button>
          </ButtonGroup>
          {/* <Button className="margin" bsStyle="primary" onClick={this.handleFullScreen}><Glyphicon glyph="fullscreen" /></Button> */}
          <ButtonGroup className="margin">
            <Button title="Select" onClick={this.props.addProducts}>Select</Button>
            <Button title="Select and add more" onClick={this.props.addProductsWait}>Select and Add More</Button>
            <Button title="Cancel" onClick={() => { browserHistory.push('/EditQuote'); }}>Cancel</Button>
          </ButtonGroup>

        </Col>

      </Row>
    );
  }
}

ProductSelectionHeader.propTypes = {
  data: PropTypes.array,
  addProducts: PropTypes.func,
  addProductsWait: PropTypes.func,
  searchInputChange: React.PropTypes.func,
  onSearchClick: React.PropTypes.func,
  onSearchItemSelected: React.PropTypes.func,
  toggleFilter: React.PropTypes.any,
};
export default ProductSelectionHeader;
