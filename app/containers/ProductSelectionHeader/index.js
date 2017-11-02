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
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import messages from './messages';
export class ProductSelectionHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.handleFullScreen = this.handleFullScreen.bind(this);
    this.languageChange = this.languageChange.bind(this);
  }
  handleFullScreen() {
    screenfull.toggle(document.getElementById('app'));
  }
  languageChange(e) {
    this.props.languageChange(e.target.value);
  }
  render() {
    return (
      <Row className="show-grid headerFix">
        <Col xs={12} md={3}>
          <Helmet
            title="CPQ - Product Selection"
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
            location={this.props.location}
            onSearchItemSelected={this.props.onSearchItemSelected}
            place={this.context.intl.formatMessage({ ...messages.searchProducts })}
          />
        </Col>
        <Col xs={12} md={5} style={{ textAlign: 'right' }}>
          {/* <ButtonGroup className="margin">
            <Button title={this.context.intl.formatMessage({ ...messages.filter })} onClick={this.props.toggleFilter}><Glyphicon glyph="filter" /></Button>
            <Button title={this.context.intl.formatMessage({ ...messages.favourites })} onClick={() => { browserHistory.push('/favourites'); }} ><Glyphicon glyph="star" /></Button>
          </ButtonGroup> */}
          {/* <Button className="margin" bsStyle="primary" onClick={this.handleFullScreen}><Glyphicon glyph="fullscreen" /></Button> */}
          <ButtonGroup className="margin">
            <Button disabled={this.props.disabledButton} title={this.context.intl.formatMessage({ ...messages.select })} onClick={this.props.addProducts}>{this.context.intl.formatMessage({ ...messages.select })}</Button>
            <Button disabled={this.props.disabledButton} title={this.context.intl.formatMessage({ ...messages.selectMore })} onClick={this.props.addProductsWait}>{this.context.intl.formatMessage({ ...messages.selectMore })}</Button>
            <Button title={this.context.intl.formatMessage({ ...messages.cancel })} onClick={() => { browserHistory.push(`/EditQuote${this.props.location.search}`); }}>{this.context.intl.formatMessage({ ...messages.cancel })}</Button>
          </ButtonGroup>
          {/* <select className="lang" onChange={this.languageChange} value={this.props.language}>
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </select> */}
        </Col>

      </Row>
    );
  }
}
ProductSelectionHeader.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
ProductSelectionHeader.propTypes = {
  data: PropTypes.array,
  addProducts: PropTypes.func,
  addProductsWait: PropTypes.func,
  searchInputChange: React.PropTypes.func,
  onSearchClick: React.PropTypes.func,
  onSearchItemSelected: React.PropTypes.func,
  location: React.PropTypes.any,
  languageChange: React.PropTypes.func,
  language: React.PropTypes.any,
  disabledButton: React.PropTypes.bool,
};
export default ProductSelectionHeader;
