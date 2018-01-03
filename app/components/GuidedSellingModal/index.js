import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Modal, Button, Glyphicon, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap/lib';

class GuidedSellingModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.renderQuoteProcessColumns = this.renderQuoteProcessColumns.bind(this);
    this.renderQuoteProcessContents = this.renderQuoteProcessContents.bind(this);
    this.state = {
      isDirty: false,
    };
  }

  renderQuoteProcessColumns() {
    return (
      <Nav bsStyle="pills" stacked>
        {this.props.data.map((quoteProcess) => (
          <NavItem key={quoteProcess.id} eventKey={quoteProcess.QuoteProcessName}>
            { quoteProcess.QuoteProcessName }
          </NavItem>
        ))}
      </Nav>
    );
  }

  renderQuoteProcessContents() {
    return (
      <Tab.Content animation>
        {this.props.data.map((quoteProcess) => (
          <Tab.Pane key={quoteProcess.id} eventKey={quoteProcess.QuoteProcessName}>
            { quoteProcess.QuoteProcessName }
          </Tab.Pane>
        ))}
      </Tab.Content>
    );
  }

  render() {
    return (
      <Modal
        show={this.props.show} onHide={this.props.onHide}
        style={{ display: 'inline-flex' }}
      >
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="calendar" /> <strong> Guided Selling </strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row className="clearfix">
                <Col sm={2}>
                  { this.renderQuoteProcessColumns() }
                </Col>
                <Col sm={10}>
                  { this.renderQuoteProcessContents() }
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} >Filter</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

GuidedSellingModal.propTypes = {
  onHide: React.PropTypes.func,
  show: React.PropTypes.bool,
  data: PropTypes.any,
};

export default GuidedSellingModal;
