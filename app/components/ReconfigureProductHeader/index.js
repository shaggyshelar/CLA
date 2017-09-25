/**
*
* ReconfigureProductHeader
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import screenfull from 'screenfull';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import Helmet from 'react-helmet';
import ReconfigureProductHeaderCard from 'components/ReconfigureProductHeaderCard';
import messages from './messages';

class ReconfigureProductHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
            <Button onClick={this.props.cancelReconfiguration}>{this.context.intl.formatMessage({ ...messages.cancel })}</Button>
            <Button bsStyle="primary" onClick={this.props.saveProducts}>{this.context.intl.formatMessage({ ...messages.save })}</Button>
          </ButtonGroup>
          <select className="lang" onChange={this.languageChange} value={this.props.language}>
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </select>
        </Col>

      </Row>
    );
  }
}

ReconfigureProductHeader.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

ReconfigureProductHeader.propTypes = {
  saveProducts: PropTypes.func,
  quoteName: PropTypes.any,
  addProducts: PropTypes.any,
  languageChange: React.PropTypes.func,
  language: React.PropTypes.any,
  cancelReconfiguration: React.PropTypes.any,
};

export default ReconfigureProductHeader;
