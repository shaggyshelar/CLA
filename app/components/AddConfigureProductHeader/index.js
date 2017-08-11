import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import screenfull from 'screenfull';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import Helmet from 'react-helmet';
import ReconfigureProductHeaderCard from 'components/ReconfigureProductHeaderCard';
import { browserHistory } from 'react-router';

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
        <Col xs={12} md={3}>
          <Helmet
            title="ProductSelectionHeader"
            meta={[
              { name: 'description', content: 'Description of ProductSelectionHeader' },
            ]}
          />
          <ReconfigureProductHeaderCard />
        </Col>

        <Col xs={12} md={9} style={{ textAlign: 'right' }}>
          <ButtonGroup className="margin">
            <Button onClick={this.props.addProducts}><Glyphicon glyph="filter" /></Button>
          </ButtonGroup>
          <ButtonGroup className="margin">
            <Button onClick={() => { browserHistory.push('/reconfigureproducts'); }}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.props.addProducts}>Add</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

AddConfigureProductHeader.propTypes = {
  addProducts: PropTypes.func,
};

export default AddConfigureProductHeader;
