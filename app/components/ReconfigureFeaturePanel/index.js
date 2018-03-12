/**
*
* ReconfigureFeaturePanel
*
*/

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Button, Panel, FormGroup, Radio, Checkbox, FormControl } from 'react-bootstrap/lib';
import ReconfigureGrid from 'components/ReconfigureGrid';
import { browserHistory } from 'react-router';
import messages from './messages';

class ReconfigureFeaturePanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.renderCheckBoxAnswer = this.renderCheckBoxAnswer.bind(this);
    this.renderRadioButtonAnswer = this.renderRadioButtonAnswer.bind(this);
    this.renderDateTimeAnswer = this.renderDateTimeAnswer.bind(this);
    this.renderConfigAttribute = this.renderConfigAttribute.bind(this);
    this.onToggleCheckBox = this.onToggleCheckBox.bind(this);
    this.onTextOrNumberBoxChange = this.onTextOrNumberBoxChange.bind(this);

    this.state = {
      products: [],
    };
  }

  renderMinMaxMessage(feature) {
    let text = '';
    if (feature.minOption !== undefined && feature.maxOption !== undefined) {
      if (feature.minOption !== null && feature.minOption !== 0 && (feature.maxOption == null || feature.maxOption === 0)) {
        text = `Add at least ${feature.minOption} of the following`;
      } else if (feature.maxOption !== null && feature.maxOption !== 0 && (feature.minOption == null || feature.minOption === 0)) {
        text = `Add at most ${feature.maxOption} of the following`;
      } else if (feature.minOption !== null && feature.minOption !== 0 && feature.maxOption !== null && feature.maxOption !== 0) {
        text = `Add at least ${feature.minOption} but no more than ${feature.maxOption} of the following`;
      }
    }
    return (<span className="minMaxMessage">{text}</span>);
  }

  renderTextBoxAnswer(configAttribute, featureId) {
    return (
      <FormGroup key={configAttribute.id}>
        <FormControl
          type="text"
          placeholder="Enter text"
          onChange={(event) => this.onTextOrNumberBoxChange(event, configAttribute, featureId)}
        />
      </FormGroup>
    );
  }

  renderCheckBoxAnswer(configAttribute, featureId) {
    return (
      <FormGroup key={configAttribute.id}>
        {
          configAttribute.values.map((option) => (
            <Checkbox key={option.id} value={option.value} inline onChange={(event) => this.onToggleCheckBox(event, configAttribute, featureId)}>
              { option.value }
            </Checkbox>
          ))
        }
      </FormGroup>
    );
  }

  renderSelectAnswer(configAttribute, featureId) {
    return (
      <FormGroup key={configAttribute.id}>
        <FormControl componentClass="select" placeholder="select" onChange={(event) => this.onToggleSelect(event, configAttribute, featureId)}>
          {
            configAttribute.values.map((option) => (
              <option key={option.id} value={option.value}>{ option.value }</option>
            ))
          }
        </FormControl>
      </FormGroup>
    );
  }

  renderRadioButtonAnswer(configAttribute, featureId) {
    return (
      <FormGroup key={configAttribute.id} onChange={(event) => this.onRadioChange(event, configAttribute, featureId)}>
        {
          configAttribute.values.map((option) => (
            <Radio key={option.id} name="radioGroup" value={option.value} checked={option.isSelected} inline>
              { option.value }
            </Radio>
          ))
        }
      </FormGroup>
    );
  }

  renderDateTimeAnswer(configAttribute, featureId) {
    return (
      <FormControl
        key={configAttribute.id}
        type="date"
        name="startDate"
        className="customSegmentsInput"
        onChange={(event) => this.onTextOrNumberBoxChange(event, configAttribute, featureId)}
      />
    );
  }

  renderNumericAnswer(configAttribute, featureId) {
    return (
      <FormGroup key={configAttribute.id}>
        <FormControl
          type="number"
          placeholder="Enter number"
          onChange={(event) => this.onTextOrNumberBoxChange(event, configAttribute, featureId)}
        />
      </FormGroup>
    );
  }

  renderConfigAttribute(configAttribute, featureId) {
    if (configAttribute.dataType === 'TextBox') {
      return this.renderTextBoxAnswer(configAttribute, featureId);
    }
    if (configAttribute.dataType === 'Checkbox') {
      return this.renderCheckBoxAnswer(configAttribute, featureId);
    }
    if (configAttribute.dataType === 'Select') {
      return this.renderSelectAnswer(configAttribute, featureId);
    }
    if (configAttribute.dataType === 'RadioButton') {
      return this.renderRadioButtonAnswer(configAttribute, featureId);
    }
    if (configAttribute.dataType === 'DateTime') {
      return this.renderDateTimeAnswer(configAttribute, featureId);
    }
    if (configAttribute.dataType === 'Numeric') {
      return this.renderNumericAnswer(configAttribute.values, featureId);
    }
    // It is 'Numeric'
    return '';
  }

  onTextOrNumberBoxChange(event, configAttribute, featureId) {
    configAttribute.values = [{ id: '', value: event.target.value, isSelected: true }];
    configAttribute.value = event.target.value;
    this.props.onFeatureConfigTextValueChange(configAttribute, this.props.isCategory, this.props.categoryId, featureId);
  }

  onToggleCheckBox(event, configAttribute, featureId) {
    // const foundCheckbox = _.find(configAttribute.values, { value: event.target.value });
    // foundCheckbox.isSelected = event.target.checked;
    this.props.onFeatureConfigCheckBoxValueChange(configAttribute, this.props.isCategory, this.props.categoryId, featureId, event.target.value, event.target.checked);
  }

  onToggleSelect(event, configAttribute, featureId) {
    _.forEach(configAttribute.values, (value) => {
      value.isSelected = false;
    });
    const foundItem = _.find(configAttribute.values, { value: event.target.value });
    foundItem.isSelected = true;
    this.props.onFeatureConfigRadioValueChange(configAttribute, this.props.isCategory, this.props.categoryId, featureId);
  }

  onRadioChange(event, configAttribute, featureId) {
    _.forEach(configAttribute.values, (value) => {
      value.isSelected = false;
    });
    const foundItem = _.find(configAttribute.values, { value: event.target.value });
    foundItem.isSelected = true;
    // this.setState({
    //   selectedRadioControlName: event.target.value,
    // });
    this.props.onFeatureConfigRadioValueChange(configAttribute, this.props.isCategory, this.props.categoryId, featureId);
  }

  renderAddButton(feature, index) {
    if (feature.dynamicAddEnabled) {
      if (feature.categoryId) {
        return (<Button key={index} bsStyle="link" onClick={() => { this.props.toggleAddOptionsState(true, this.props.activeTab); browserHistory.push(`/addConfigureproducts?featureId=${feature.id}&featureName=${feature.name}&categoryId=${feature.categoryId}&quoteName=${this.props.params.quoteName}&bundleId=${this.props.params.bundleId}&priceBookId=${this.props.params.priceBookId}&quoteId=${this.props.params.quoteId}&bundleLineId=${this.props.params.bundleLineId}&groupId=${this.props.params.groupId}&isDynamic=${feature.isDynamic}`); }} >{this.context.intl.formatMessage({ ...messages.addOptions })}</Button>);
      }
      return (<Button key={index} bsStyle="link" onClick={() => { this.props.toggleAddOptionsState(true, this.props.activeTab); browserHistory.push(`/addConfigureproducts?featureId=${feature.id}&featureName=${feature.name}&quoteName=${this.props.params.quoteName}&bundleId=${this.props.params.bundleId}&priceBookId=${this.props.params.priceBookId}&quoteId=${this.props.params.quoteId}&bundleLineId=${this.props.params.bundleLineId}&groupId=${this.props.params.groupId}&isDynamic=${feature.isDynamic}`); }} >{this.context.intl.formatMessage({ ...messages.addOptions })}</Button>);
    }
    return (<span></span>);
  }

  renderFeatureConfigs(feature) {
    if (feature.configAttribute && feature.configAttribute.length > 0) {
      const featureConfigs = [];
      feature.configAttribute.map((configAttribute, configIndex) => (
        featureConfigs.push(<div key={configIndex}>
          <span className="categoryLabel">{configAttribute.name}</span>
          { this.renderConfigAttribute(configAttribute, feature.id) }
        </div>)
      ));
      return featureConfigs;
    }
    return '';
  }

  renderFeatureGrid(feature, index) {
    let addButton = {};
    if (feature !== undefined) {
      addButton = this.renderAddButton(feature, index);
      const filteredProducts = feature.products.length > 0 ? _.filter(feature.products, { isDeleted: false }) : [];
      const panelId = `panel-${index}`;
      return (
        <div>
          <Panel id={panelId} key={panelId} className="reconfigurePanel" expanded={this.props.expanderStates[index]} onToggle={(event) => this.props.onTogglePanelExpander(event, index)} >
            <Panel.Heading>
              <Panel.Title toggle>
                <h4 className="panel-title suggestionProductLabel">
                  {feature.name} {this.renderMinMaxMessage(feature)}
                </h4>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                { this.renderFeatureConfigs(feature) }
                <br /><br />
                <ReconfigureGrid
                  products={filteredProducts}
                  showFilter={this.props.showFilter}
                  toggleFilter={this.props.toggleSidebar}
                  toggleCheckboxChange={this.props.toggleCheckboxChange}
                  data={feature.products.length > 0 ? feature.products : []}
                  addProductsWait={this.props.addProductsWait}
                  checkAll={this.props.checkAll}
                  toggleCheckAll={this.props.checkAll}
                  feature={feature}
                  categoryId={this.props.categoryId}
                  deleteProduct={this.props.deleteProduct}
                  updateField={this.props.updateField}
                  currency={this.props.currency}
                />
                {addButton}
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </div>
      );
    }
    return (<span></span>);
  }

  render() {
    const panel = [];
    if (!_.isUndefined(this.props.features) && this.props.features.length > 0) {
      panel.push(this.props.features.map((item, index) => this.renderFeatureGrid(item, index)));
    }
    return (
      <div className="panel-group" id="accordion">
        { panel }
      </div>
    );
  }
}

ReconfigureFeaturePanel.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

ReconfigureFeaturePanel.propTypes = {
  showFilter: PropTypes.func,
  checkAll: PropTypes.func,
  toggleSidebar: PropTypes.func,
  toggleCheckboxChange: PropTypes.func,
  addProductsWait: PropTypes.func,
  features: PropTypes.any,
  deleteProduct: PropTypes.func,
  updateField: PropTypes.func,
  categoryId: PropTypes.any,
  params: PropTypes.any,
  toggleAddOptionsState: PropTypes.any,
  activeTab: PropTypes.any,
  expanderStates: PropTypes.any,
  onTogglePanelExpander: PropTypes.func,
  currency: PropTypes.any,
  isCategory: PropTypes.any,
  onFeatureConfigRadioValueChange: PropTypes.func,
  onFeatureConfigTextValueChange: PropTypes.func,
  onFeatureConfigCheckBoxValueChange: PropTypes.func,
};

export default ReconfigureFeaturePanel;

