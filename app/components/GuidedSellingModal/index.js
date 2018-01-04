import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Modal, Button, Glyphicon, Tab, Row, Col, Nav, NavItem, FormGroup, Radio, Checkbox, ControlLabel, FormControl, FieldGroup } from 'react-bootstrap/lib';

class GuidedSellingModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.renderQuoteProcessColumns = this.renderQuoteProcessColumns.bind(this);
    this.renderQuoteProcessContents = this.renderQuoteProcessContents.bind(this);
    this.renderCheckBoxAnswer = this.renderCheckBoxAnswer.bind(this);
    this.renderRangeAnswer = this.renderRangeAnswer.bind(this);
    this.renderRadioButtonAnswer = this.renderRadioButtonAnswer.bind(this);
    this.renderDateTimeAnswer = this.renderDateTimeAnswer.bind(this);
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
          <NavItem key={quoteProcess.id} eventKey={quoteProcess.id}>
            { quoteProcess.name }
          </NavItem>
        ))}
      </Nav>
    );
  }

  renderTextBoxAnswer() {
    return (
      <FormGroup>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Text"
          placeholder="Enter text"
        />
      </FormGroup>
    );
  }

  renderCheckBoxAnswer(options) {
    return (
      <FormGroup>
        {
          options.map((option) => (
            <Checkbox inline>
              { option.value }
            </Checkbox>
          ))
        }
      </FormGroup>
    );
  }

  renderSelectAnswer(options) {
    return (
      <FormGroup>
        <ControlLabel>Select</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          {
            options.map((option) => (
              <option value={option.value}>{ option.value }</option>
            ))
          }
        </FormControl>
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
              { option.value }
            </Radio>
          ))
        }
      </FormGroup>
    );
  }

  renderDateTimeAnswer() {
    return (
      <FormControl
        type="date"
        name="startDate"
        className="customSegmentsInput"
      />
    );
  }

  renderNumericAnswer() {
    return (
      <FormGroup>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Text"
          placeholder="Enter text"
        />
      </FormGroup>
    );
  }

  renderConfigAttribute(configAttribute) {
    if (configAttribute.dataType === 'TextBox') {
      return this.renderTextBoxAnswer(configAttribute.values);
    }
    if (configAttribute.dataType === 'Checkbox') {
      return this.renderCheckBoxAnswer(configAttribute.values);
    }
    if (configAttribute.dataType === 'Select') {
      return this.renderSelectAnswer(configAttribute.values);
    }
    if (configAttribute.dataType === 'RadioButton') {
      return this.renderRadioButtonAnswer(configAttribute.values);
    }
    if (configAttribute.dataType === 'Range') {
      return this.renderCheckBoxAnswer(configAttribute.values);
    }
    if (configAttribute.dataType === 'DateTime') {
      return this.renderDateTimeAnswer(configAttribute.values);
    }
    // It is 'Numeric'
    return this.renderNumericAnswer(configAttribute.values);
  }

  renderProcessInput(processInput) {
    return (
      <FormGroup>
        <ControlLabel>{ processInput.Label} </ControlLabel>
        { this.renderConfigAttribute(processInput.configAttribute) }
      </FormGroup>
    );
  }

  renderQuoteProcess(quoteProcess) {
    return (
      <Tab.Pane key={quoteProcess.id} eventKey={quoteProcess.id}>
        {
          quoteProcess.processInputs.map((processInput) => (
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
      className="guidedSellingModal">
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="shopping-cart" /> <strong> Guided Selling </strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row className="clearfix">
                <Col sm={2}>
                  { this.renderQuoteProcessColumns() }
                </Col>
                <Col sm={10} className="guidedSellingModalContent">
                  { this.renderQuoteProcessContents() }
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} className="fiterBtn"><Glyphicon glyph="filter" /> Filter</Button>
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
