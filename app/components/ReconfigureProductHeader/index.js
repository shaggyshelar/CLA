/**
*
* ReconfigureProductHeader
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import screenfull from 'screenfull';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import Helmet from 'react-helmet';
import ReconfigureProductHeaderCard from 'components/ReconfigureProductHeaderCard';
import { browserHistory } from 'react-router';


class ReconfigureProductHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

          <ReconfigureProductHeaderCard />
        </Col>
        {/* <Col xs={12} md={4} style={{ textAlign: 'left' }}>
          <SearchProductAutocomplete data={this.props.data} />
        </Col> */}
        <Col xs={12} md={9} style={{ textAlign: 'right' }}>
          <ButtonGroup className="margin">
            <Button onClick={this.props.addProducts}><Glyphicon glyph="filter" /></Button>
            {/* <Button onClick={() => { browserHistory.push('/favourites'); }} ><Glyphicon glyph="star" /></Button> */}
          </ButtonGroup>
          {/* <Button className="margin" bsStyle="primary" onClick={this.handleFullScreen}><Glyphicon glyph="fullscreen" /></Button> */}
          <ButtonGroup className="margin">
            <Button onClick={() => { browserHistory.push('/EditQuote'); }}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.props.addProducts}>Save</Button>
          </ButtonGroup>

        </Col>

      </Row>
    );
  }
}

ReconfigureProductHeader.propTypes = {
  data: PropTypes.any,
  addProducts: PropTypes.func,
};

export default ReconfigureProductHeader;
