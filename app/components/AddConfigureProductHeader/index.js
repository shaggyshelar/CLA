import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import screenfull from 'screenfull';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import Helmet from 'react-helmet';
import ReconfigureProductHeaderCard from 'components/ReconfigureProductHeaderCard';
import { browserHistory } from 'react-router';
import messages from './messages';

class AddConfigureProductHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        <Col xs={12} md={6}>
          <Helmet
            title="CPQ - Product Selection"
            meta={[
              { name: 'description', content: 'Description of ProductSelectionHeader' },
            ]}
          />
          <ReconfigureProductHeaderCard
            quoteName={this.props.quoteName}
          />
        </Col>

        <Col xs={12} md={6} style={{ textAlign: 'right' }}>
          <ButtonGroup className="margin">
            <Button onClick={this.props.addProducts}><Glyphicon glyph="filter" /></Button>
          </ButtonGroup>
          <ButtonGroup className="margin">
            <Button onClick={() => { browserHistory.goBack(); }}>{this.context.intl.formatMessage({ ...messages.cancel })}</Button>
            <Button bsStyle="primary" onClick={this.props.addOptions}>{this.context.intl.formatMessage({ ...messages.add })}</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

AddConfigureProductHeader.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

AddConfigureProductHeader.propTypes = {
  addProducts: PropTypes.func,
  addOptions: PropTypes.func,
  quoteName: PropTypes.any,
};

export default AddConfigureProductHeader;
