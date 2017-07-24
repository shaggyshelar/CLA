/*
 *
 * ProductSelectionHeader
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import makeSelectProductSelectionHeader from './selectors';
import messages from './messages';
import ProductSelectionGrid from '../../components/ProductSelectionGrid';
import ProductSelectionHeaderCard from '../../components/ProductSelectionHeaderCard';
import SearchProductAutocomplete from '../../components/SearchProductAutocomplete';

export class ProductSelectionHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
         <Col xs={12} md={4} style={{textAlign:"left"}}>
          <SearchProductAutocomplete />
         </Col>
        <Col xs={12} md={5} style={{textAlign:"right"}}>
          <ButtonGroup className="margin">
            <Button><Glyphicon glyph='filter' /></Button>
            <Button><Glyphicon glyph='star' /></Button>
          </ButtonGroup>
          <ButtonGroup className="margin">
            <Button>Select</Button>
            <Button>Select and Add More</Button>
            <Button>Cancel</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

ProductSelectionHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ProductSelectionHeader: makeSelectProductSelectionHeader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionHeader);
