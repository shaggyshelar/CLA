/*
 *
 * ProductSelectionHeader
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Button, Glyphicon, Row, Col, ButtonGroup, FormControl } from 'react-bootstrap/lib';
import makeSelectProductSelectionHeader from './selectors';
import messages from './messages';
import ProductSelectionGrid from 'components/ProductSelectionGrid';
import ProductSelectionHeaderCard from 'components/ProductSelectionHeaderCard';
import SearchProductAutocomplete from 'components/SearchProductAutocomplete';
import Sidebar from 'components/Sidebar';
import { browserHistory } from 'react-router';
export class ProductSelectionHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
  	super(props, context);
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
          <SearchProductAutocomplete data={this.props.data} />
        </Col>
        <Col xs={12} md={5} style={{ textAlign: 'right' }}>
          <ButtonGroup className="margin">
            <Button><Glyphicon glyph="filter" onClick={this.props.toggleFilter} /></Button>
            <Button><Glyphicon glyph="star" onClick={() => { browserHistory.push('/favourites'); }} /></Button>
          </ButtonGroup>
          <ButtonGroup className="margin">
            <Button onClick={this.props.addProducts}>Select</Button>
            <Button onClick={this.props.addProductsWait}>Select and Add More</Button>
            <Button onClick={() => { browserHistory.push('/EditQuote'); }}>Cancel</Button>
          </ButtonGroup>

        </Col>

      </Row>
    );
  }
}

ProductSelectionHeader.propTypes = {
  data: React.PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  ProductSelectionHeader: makeSelectProductSelectionHeader(),
});

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionHeader);
