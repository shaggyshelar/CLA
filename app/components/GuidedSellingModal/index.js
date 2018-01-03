import React from 'react';
import { Modal, Button, Glyphicon, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap/lib';

class GuidedSellingModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.handleFullScreen = this.handleFullScreen.bind(this);
    this.state = {
      isDirty: false,
    };
  }

  renderQuoteProcessColumns() {
    return (
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="first">
          Category 1
        </NavItem>
        <NavItem eventKey="second">
          Category 2
        </NavItem>
        <NavItem eventKey="third">
          Category 3
        </NavItem>
        <NavItem eventKey="forth">
          Category 4
        </NavItem>
      </Nav>
    );
  }

  renderQuoteProcessContents() {
    return (
      <Tab.Content animation>
        <Tab.Pane eventKey="first">
        11 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Tab.Pane>
        <Tab.Pane eventKey="second">
        22 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Tab.Pane>
        <Tab.Pane eventKey="third">
        33 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Tab.Pane>
        <Tab.Pane eventKey="forth">
        4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Tab.Pane>
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
};

export default GuidedSellingModal;
