import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Modal, Button, Glyphicon, Tab, Row, Col, Nav, NavItem, FormGroup, Radio, Checkbox, ControlLabel, FormControl } from 'react-bootstrap/lib';

class GuidedSellingModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.renderQuoteProcessColumns = this.renderQuoteProcessColumns.bind(this);
    this.renderQuoteProcessContents = this.renderQuoteProcessContents.bind(this);
    this.renderCheckBoxAnswer = this.renderCheckBoxAnswer.bind(this);
    this.renderRangeAnswer = this.renderRangeAnswer.bind(this);
    this.renderRadioButtonAnswer = this.renderRadioButtonAnswer.bind(this);
    this.renderOptionSetAnswer = this.renderOptionSetAnswer.bind(this);
    this.renderConfigAttribute = this.renderConfigAttribute.bind(this);
    this.renderProcessInput = this.renderProcessInput.bind(this);
    this.renderQuoteProcess = this.renderQuoteProcess.bind(this);
    this.state = {
      isDirty: false,
    };
  }

  renderQuoteProcessColumns() {
    return (
      <Nav bsStyle="pills" stacked>
        {this.props.data.map((quoteProcess) => (
          <NavItem key={quoteProcess.Id} eventKey={quoteProcess.Name}>
            { quoteProcess.Name }
          </NavItem>
        ))}
      </Nav>
    );
  }

  renderCheckBoxAnswer(options) {
    return (
      <FormGroup>
        {
          options.map((option) => (
            <Checkbox inline>
              { option.Value }
            </Checkbox>
          ))
        }
      </FormGroup>
    );
  }

  renderRangeAnswer() {
  }

  renderRadioButtonAnswer(options) {
    return (
      <FormGroup>
        {
          options.map((option) => (
            <Radio name="radioGroup" inline>
              { option.Value }
            </Radio>
          ))
        }
      </FormGroup>
    );
  }

  renderOptionSetAnswer() {
  }

  renderConfigAttribute(configAttribute) {
    if (configAttribute.DataType === 'Checkbox') {
      return this.renderCheckBoxAnswer(configAttribute.Value);
    }
    return this.renderRadioButtonAnswer(configAttribute.Value);
  }

  renderProcessInput(processInput) {
    return (
      <FormGroup>
        <ControlLabel>{ processInput.Label} </ControlLabel>
        { this.renderConfigAttribute(processInput.ConfigAttribute) }
      </FormGroup>
    );
  }

  renderQuoteProcess(quoteProcess) {
    return (
      <Tab.Pane key={quoteProcess.Id} eventKey={quoteProcess.Name}>
        {
          quoteProcess.ProcessInputs.map((processInput) => (
            this.renderProcessInput(processInput)
          ))
        }
      </Tab.Pane>
    );
  }

  renderQuoteProcessContents() {
    return (
      <Tab.Content animation>
        {this.props.data.map((quoteProcess) => (
          this.renderQuoteProcess(quoteProcess)
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
