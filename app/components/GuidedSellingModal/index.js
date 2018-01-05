import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Modal, Button, Glyphicon, Tab, Row, Col, Nav, NavItem, FormGroup, Radio, Checkbox, ControlLabel, FormControl, FieldGroup } from 'react-bootstrap/lib';

class GuidedSellingModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.renderQuoteProcessColumns = this.renderQuoteProcessColumns.bind(this);
    this.renderQuoteProcessContents = this.renderQuoteProcessContents.bind(this);
    this.renderCheckBoxAnswer = this.renderCheckBoxAnswer.bind(this);
    this.renderRadioButtonAnswer = this.renderRadioButtonAnswer.bind(this);
    this.renderDateTimeAnswer = this.renderDateTimeAnswer.bind(this);
    this.renderConfigAttribute = this.renderConfigAttribute.bind(this);
    this.renderProcessInput = this.renderProcessInput.bind(this);
    this.renderQuoteProcess = this.renderQuoteProcess.bind(this);
    this.onToggleCheckBox = this.onToggleCheckBox.bind(this);
    this.onTextOrNumberBoxChange = this.onTextOrNumberBoxChange.bind(this);
    this.state = {
      selectedRadioControlName: '',
    };
  }

  onTextOrNumberBoxChange(event, configAttribute) {
    configAttribute.values = [event.target.value];
  }

  onToggleCheckBox(event, configAttribute) {
    const foundCheckbox = _.find(configAttribute.values, { value: event.target.value });
    foundCheckbox.isSelected = event.target.checked;
  }

  onToggleSelect(event, configAttribute) {
    _.forEach(configAttribute.values, (value) => {
      value.isSelected = false;
    });
    const foundItem = _.find(configAttribute.values, { value: event.target.value });
    foundItem.isSelected = true;
  }

  onRadioChange(event, configAttribute) {
    _.forEach(configAttribute.values, (value) => {
      value.isSelected = false;
    });
    const foundItem = _.find(configAttribute.values, { value: event.target.value });
    foundItem.isSelected = true;
    this.setState({
      selectedRadioControlName: event.target.value,
    });
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
          placeholder="Enter text"
          onChange={(event) => this.onTextOrNumberBoxChange(event, configAttribute)}
        />
      </FormGroup>
    );
  }

  renderCheckBoxAnswer(configAttribute) {
    return (
      <FormGroup key={configAttribute.id}>
        {
          configAttribute.values.map((option) => (
            <Checkbox key={option.value} value={option.value} inline onChange={(event) => this.onToggleCheckBox(event, configAttribute)}>
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
        <FormControl componentClass="select" placeholder="select" onChange={(event) => this.onToggleSelect(event, configAttribute)}>
          {
            configAttribute.values.map((option) => (
              <option key={option.value} value={option.value}>{ option.value }</option>
            ))
          }
        </FormControl>
      </FormGroup>
    );
  }

  renderRadioButtonAnswer(configAttribute) {
    return (
      <FormGroup key={configAttribute.id} onChange={(event) => this.onRadioChange(event, configAttribute)}>
        {
          configAttribute.values.map((option) => (
            <Radio key={option.value} name="radioGroup" value={option.value} checked={this.state.selectedRadioControlName === option.value} inline>
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
        onChange={(event) => this.onTextOrNumberBoxChange(event, configAttribute)}
      />
    );
  }

  renderNumericAnswer(configAttribute) {
    return (
      <FormGroup key={configAttribute.id}>
        <FormControl
          type="number"
          placeholder="Enter number"
          onChange={(event) => this.onTextOrNumberBoxChange(event, configAttribute)}
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
