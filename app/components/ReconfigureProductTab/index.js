/**
*
* ReconfigureProductTab
*
*/

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Col, Row, Tab, Tabs, FormGroup, FormControl, Checkbox, Radio } from 'react-bootstrap/lib';
import { generateGuid } from 'containers/App/constants';
import ReconfigureFeaturePanel from 'components/ReconfigureFeaturePanel';

class ReconfigureProductTab extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      panelExpanderStates: [],
    };
    this.onTabSelect = this.onTabSelect.bind(this);
    this.onTogglePanelExpander = this.onTogglePanelExpander.bind(this);
  }
  componentWillMount() {
    if (this.props.reConfigureData && this.props.reConfigureData.features && this.props.reConfigureData.features.length > 0) {
      const panelExpanderStates = [];
      _.forEach(this.props.reConfigureData.features, (feature, index) => {
        panelExpanderStates[index] = true;
      });
      this.setState({ panelExpanderStates });
    }
    this.setState({ activeTab: this.props.activeTab });
  }

  onTabSelect(e) {
    this.setState({ activeTab: e });
  }

  onTextOrNumberBoxChange(event, configAttribute) {
    configAttribute.values = [{ id: '', value: event.target.value, isSelected: true }];
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

  returnReactTab(item, index) {
    return (<Tab key={index} eventKey={index} title={item.name}>
      <ReconfigureFeaturePanel
        dataProd={this.props.dataProd}
        showFilter={this.props.showFilter}
        toggleSidebar={this.toggleSidebar}
        toggleCheckboxChange={this.props.toggleCheckboxChange}
        addProductsWait={this.addProductsWait}
        checkAll={this.props.checkAll}
        features={item.features}
        categoryId={item.id}
        deleteProduct={this.props.deleteProduct}
        expanderStates={this.state.panelExpanderStates}
        onTogglePanelExpander={this.onTogglePanelExpander}
        updateField={this.props.updateField}
        params={this.props.params}
        toggleAddOptionsState={this.props.toggleAddOptionsState}
        activeTab={this.state.activeTab}
        currency={this.props.currency}
      />
    </Tab>);
  }

  returnFeaturePanel(features) {
    return (
      <ReconfigureFeaturePanel
        key={generateGuid()}
        dataProd={this.props.dataProd}
        showFilter={this.props.showFilter}
        toggleSidebar={this.toggleSidebar}
        toggleCheckboxChange={this.props.toggleCheckboxChange}
        addProductsWait={this.addProductsWait}
        checkAll={this.props.checkAll}
        features={features}
        deleteProduct={this.props.deleteProduct}
        updateField={this.props.updateField}
        params={this.props.params}
        expanderStates={this.state.panelExpanderStates}
        onTogglePanelExpander={this.onTogglePanelExpander}
        toggleAddOptionsState={this.props.toggleAddOptionsState}
        activeTab={this.state.activeTab}
        currency={this.props.currency}
      />);
  }

  onTogglePanelExpander(event, index) {
    const exapnderStates = this.state.panelExpanderStates;
    exapnderStates[index] = event;
    this.setState({ panelExpanderStates: exapnderStates });
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
            <Checkbox key={option.id} value={option.value} inline onChange={(event) => this.onToggleCheckBox(event, configAttribute)}>
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
              <option key={option.id} value={option.value}>{ option.value }</option>
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
            <Radio key={option.id} name="radioGroup" value={option.value} checked={this.state.selectedRadioControlName === option.value} inline>
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
    if (configAttribute.dataType === 'DateTime') {
      return this.renderDateTimeAnswer(configAttribute);
    }
    return this.renderNumericAnswer(configAttribute.values);
  }

  render() {
    const tabtitleList = [];
    let showTabView = true;
    if (!_.isUndefined(this.props.reConfigureData)) {
      if (!_.isUndefined(this.props.reConfigureData.categories) && this.props.reConfigureData.categories.length > 0) {
        showTabView = true;
        this.props.reConfigureData.categories.map((categoryItem, categoryIndex) => {
          tabtitleList.push(this.returnReactTab(categoryItem, categoryIndex, true));
          return categoryIndex;
        });
      } else if (!_.isUndefined(this.props.reConfigureData.features) && this.props.reConfigureData.features.length > 0) {
        // if there are no categories bind features
        showTabView = false;
        tabtitleList.push(this.returnFeaturePanel(this.props.reConfigureData.features));
      }
    }
    return (
      <div className="quote-container reconfigureContainer">
        <div className="margin-tabs">
          <Row className="configureRow">
            <Col md={12} sm={12} xs={12}>
              <span className="categoryLabel">{this.props.reConfigureData.productBundleName}</span>
            </Col>
          </Row>
        </div>
        <div className="margin-tabs">
          <Row className="configureRow">
            <Col md={12} sm={12} xs={12}>
              {
                this.props.quoteLine && this.props.quoteLine.configAttribute
                ?
                  this.props.quoteLine.configAttribute.map((configAttribute) => (
                    <div>
                      <span className="categoryLabel">{configAttribute.name}</span>
                      { this.renderConfigAttribute(configAttribute) }
                    </div>
                  ))
                :
                    <div></div>
              }
            </Col>
          </Row>
        </div>
        <div>
          {showTabView ?
            <Tabs defaultActiveKey={this.props.activeTab} id="configureProductsList" onSelect={this.onTabSelect}>
              {tabtitleList}
            </Tabs>
        : <div className="reconfigureDivScroll">{ tabtitleList }</div>
        }
        </div>
      </div>
    );
  }
}

ReconfigureProductTab.propTypes = {
  showFilter: PropTypes.any,
  reConfigureData: PropTypes.any,
  dataProd: PropTypes.any,
  deleteProduct: PropTypes.func,
  updateField: PropTypes.func,
  checkAll: PropTypes.func,
  toggleCheckboxChange: PropTypes.func,
  toggleAddOptionsState: PropTypes.any,
  params: PropTypes.any,
  activeTab: PropTypes.any,
  quoteLine: PropTypes.any,
  currency: PropTypes.any,
};

export default ReconfigureProductTab;

