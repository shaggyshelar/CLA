import React, { PropTypes } from 'react';
import screenfull from 'screenfull';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import ProductSelectionHeaderCard from 'components/ProductSelectionHeaderCard';
import SearchProductAutocomplete from 'components/SearchProductAutocomplete';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import messages from './messages';
import GuidedSellingModal from '../../components/GuidedSellingModal';

export class ProductSelectionHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.handleFullScreen = this.handleFullScreen.bind(this);
    this.languageChange = this.languageChange.bind(this);
    this.toggleShowGuidedSellingModal = this.toggleShowGuidedSellingModal.bind(this);
    this.state = {
      isGuidedSellingModalOpen: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.guidedSellingQuestions.length > 0) {
      this.setState({
        isGuidedSellingModalOpen: true,
      });
    }
  }
  handleFullScreen() {
    screenfull.toggle(document.getElementById('app'));
  }
  languageChange(e) {
    this.props.languageChange(e.target.value);
  }
  toggleShowGuidedSellingModal() {
    this.setState({
      isGuidedSellingModalOpen: !this.state.isGuidedSellingModalOpen,
    });
  }
  renderGuidedSelling() {
    if (this.props.guidedSellingQuestions.length > 0) {
      return (
        <ButtonGroup className="margin">
          <Button title={this.context.intl.formatMessage({ ...messages.guidedSelling })} onClick={this.toggleShowGuidedSellingModal}><Glyphicon glyph="shopping-cart" /></Button>
        </ButtonGroup>
      );
    }
    return (
      <div></div>
    );
  }
  render() {
    return (
      <div>
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
            { this.renderGuidedSelling() }
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
        <GuidedSellingModal
          show={this.state.isGuidedSellingModalOpen} onHide={this.toggleShowGuidedSellingModal}
          data={this.props.guidedSellingQuestions}
          style={{
            display: 'inline-flex',
          }}
          onFilterSearchClicked={this.props.onFilterSearchClicked}
        />
      </div>
    );
  }
}
ProductSelectionHeader.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
ProductSelectionHeader.propTypes = {
  data: PropTypes.array,
  guidedSellingQuestions: PropTypes.any,
  addProducts: PropTypes.func,
  addProductsWait: PropTypes.func,
  searchInputChange: React.PropTypes.func,
  onSearchClick: React.PropTypes.func,
  onFilterSearchClicked: React.PropTypes.func,
  onSearchItemSelected: React.PropTypes.func,
  location: React.PropTypes.any,
  languageChange: React.PropTypes.func,
  // language: React.PropTypes.any,
  disabledButton: React.PropTypes.bool,
};
export default ProductSelectionHeader;
