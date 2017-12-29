import React from 'react';
// import styled from 'styled-components';

import { Button, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import messages from './messages';

class SuggestionHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Row className="show-grid">
        <Col xs={12} sm={6} md={6}>

          <div className="card" >
            <div className="card-detail">
              <div>
                <div className="cartFont"><span style={{ marginTop: '0px', fontSize: '20px' }}>{this.context.intl.formatMessage({ ...messages.suggestions })}</span></div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={12} sm={6} md={6} style={{ textAlign: 'right' }}>
          <ButtonGroup className="margin">
            <Button onClick={this.props.cancelSuggestion}>{this.context.intl.formatMessage({ ...messages.cancel })}</Button>
            <Button bsStyle="primary" onClick={this.props.saveSuggestions}>{this.context.intl.formatMessage({ ...messages.save })}</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

SuggestionHeader.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

SuggestionHeader.propTypes = {
  saveSuggestions: React.PropTypes.func,
  cancelSuggestion: React.PropTypes.any,
};

export default SuggestionHeader;
