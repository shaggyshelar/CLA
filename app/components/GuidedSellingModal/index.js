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
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.state = {
      isDirty: false,
    };
  }

  toggleCheckBox(event, configAttribute) {
    const foundCheckbox = _.find(configAttribute.values, { value: event.target.value });
    foundCheckbox.isSelected = event.target.checked;
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

  renderTextBoxAnswer(configAttribute) {
    return (
      <FormGroup key={configAttribute.id}>
        <FormControl
          type="text"
          value={configAttribute.value}
          placeholder="Enter text"
        />
      </FormGroup>
    );
  }

  renderCheckBoxAnswer(configAttribute) {
    return (
      <FormGroup key={configAttribute.id}>
        {
          configAttribute.values.map((option) => (
            <Checkbox key={option.value} value={option.value} inline onChange={(event) => this.toggleCheckBox(event, configAttribute)}>
              { option.value }
            </Checkbox>
          ))
        }
      </FormGroup>
    );
  }

  renderSelectAnswer(configAttribute) {
    return (
      <FormGroup key={configAttribute.id}>
        <FormControl componentClass="select" placeholder="select">
          {
            configAttribute.values.map((option) => (
              <option key={option.value} value={option.value}>{ option.value }</option>
            ))
          }
        </FormControl>
      </FormGroup>
    );
  }

  renderRangeAnswer() {
  }

  renderRadioButtonAnswer(configAttribute) {
    return (
      <FormGroup key={configAttribute.id}>
        {
          configAttribute.values.map((option) => (
            <Radio key={option.value} name="radioGroup" inline>
              { option.value }
            </Radio>
          ))
        }
      </FormGroup>
    );
  }

  renderDateTimeAnswer(configAttribute) {
    return (
      <FormControl
        key={configAttribute.id}
        type="date"
        name="startDate"
        className="customSegmentsInput"
      />
    );
  }

  renderNumericAnswer(configAttribute) {
    return (
      <FormGroup key={configAttribute.id}>
        <FormControl
          type="number"
          value={configAttribute.value}
          placeholder="Enter number"
        />
      </FormGroup>
    );
  }

  renderConfigAttribute(configAttribute) {
    if (configAttribute.dataType === 'TextBox') {
      return this.renderTextBoxAnswer(configAttribute);
    }
    if (configAttribute.dataType === 'Checkbox') {
      return this.renderCheckBoxAnswer(configAttribute);
    }
    if (configAttribute.dataType === 'Select') {
      return this.renderSelectAnswer(configAttribute);
    }
    if (configAttribute.dataType === 'RadioButton') {
      return this.renderRadioButtonAnswer(configAttribute);
    }
    // if (configAttribute.dataType === 'Range') {
    //   return this.renderCheckBoxAnswer(configAttribute);
    // }
    if (configAttribute.dataType === 'DateTime') {
      return this.renderDateTimeAnswer(configAttribute);
    }
    // It is 'Numeric'
    return this.renderNumericAnswer(configAttribute.values);
  }

  renderProcessInput(processInput) {
    return (
      <FormGroup key={processInput.id}>
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
    let defaultTabId = _.head(this.props.data);
    defaultTabId = defaultTabId ? defaultTabId.id : '';
    return (
      <Modal
        show={this.props.show} onHide={this.props.onHide}
        style={{ display: 'inline-flex' }}
        className="guidedSellingModal"
      >
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="shopping-cart" /> <strong> Guided Selling </strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Container id="left-tabs-example" defaultActiveKey={defaultTabId}>
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
