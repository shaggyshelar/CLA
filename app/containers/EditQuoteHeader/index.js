/*
 *
 * EditQuoteHeader
 *
 */
// import React, { PropTypes } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import screenfull from 'screenfull';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
// import { makeSelectData, makeSelectError, makeSelectLoading } from './selectors';
import AddProductsDropdown from '../../components/AddProductsDropdown';
import AddGroupDropdown from '../../components/AddGroupDropdown';
import EditQuoteHeaderCard from '../../components/EditQuoteHeaderCard';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';

export class EditQuoteHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
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
            title="TableHeader"
            meta={[
              { name: 'description', content: 'Description of TableHeader' },
            ]}
          />
          <EditQuoteHeaderCard />
        </Col>
        <Col xs={12} md={9} style={{ textAlign: 'right' }}>
          <AddProductsDropdown />
          <AddGroupDropdown />

          <ButtonGroup className="margin">
            <Button onClick={this.props.deleteLine} bsStyle="danger">Delete Lines</Button>
            <Button >Cancel</Button>

          </ButtonGroup>
          <Button className="margin" bsStyle="primary" onClick={this.handleFullScreen}><Glyphicon glyph="fullscreen" /></Button>
          <ButtonGroup className="margin">
            <Button onClick={this.props.calculateTotal}>Calculate</Button>

            <Button bsStyle="primary" onClick={this.props.quickSave}>Save</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

EditQuoteHeader.propTypes = {
  data: React.PropTypes.any,
  calculateTotal: React.PropTypes.func,
  deleteLine: React.PropTypes.func,
  quickSave: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuoteHeader);
