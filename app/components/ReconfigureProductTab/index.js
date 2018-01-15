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
    };
    this.onTabSelect = this.onTabSelect.bind(this);
  }
  componentWillMount() {
    this.setState({ activeTab: this.props.activeTab });
  }
  onTabSelect(e) {
    this.setState({ activeTab: e });
  }

  onTextOrNumberBoxChange(event, configAttribute) {
    this.props.onConfigAttrTextOrNumberValueChange(configAttribute, event.target.value);
  }

  onToggleCheckBox(event, configAttribute) {
    this.props.onConfigAttrCheckboxValueChange(configAttribute, event.target.value, event.target.checked);
  }

  onToggleSelect(event, configAttribute) {
    _.forEach(configAttribute.values, (value) => {
      value.isSelected = false;
    });
    const foundItem = _.find(configAttribute.values, { value: event.target.value });
    foundItem.isSelected = true;
    this.props.onConfigAttrSelectboxValueChange(configAttribute, event.target.value);
  }

  onRadioChange(event, configAttribute) {
    this.props.onConfigAttrRadioValueChange(configAttribute, event.target.value);
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
        updateField={this.props.updateField}
        params={this.props.params}
        toggleAddOptionsState={this.props.toggleAddOptionsState}
        activeTab={this.state.activeTab}
        currency={this.props.currency}
      />
    </Tab>);
  }

  returnFeaturePanel(item) {
    return (
      <ReconfigureFeaturePanel
        key={generateGuid()}
        dataProd={this.props.dataProd}
        showFilter={this.props.showFilter}
        toggleSidebar={this.toggleSidebar}
        toggleCheckboxChange={this.props.toggleCheckboxChange}
        addProductsWait={this.addProductsWait}
        checkAll={this.props.checkAll}
        features={item}
        deleteProduct={this.props.deleteProduct}
        updateField={this.props.updateField}
        params={this.props.params}
        toggleAddOptionsState={this.props.toggleAddOptionsState}
        activeTab={this.state.activeTab}
        currency={this.props.currency}
      />);
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
            <Radio key={option.id} name="radioGroup" value={option.value} checked={this.props.selectedRadioControlName === option.value} inline>
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

    if (this.props.quoteLine) {
      this.props.quoteLine.configAttribute = [
        {
          id: '9692e859-94f6-e711-813c-c4346bdcdf81',
          name: 'Device',
          dataType: 'Checkbox',
          isRequired: true,
          isGlobal: false,
          values: [
            {
              id: '8a006f85-98f6-e711-813c-c4346bdcdf81',
              value: 'Webcam',
              isSelected: false,
            },
            {
              id: '8c324f9e-98f6-e711-813c-c4346bdcdf81',
              value: 'Headset',
              isSelected: false,
            },
          ],
        },
        {
          id: 'df4bf979-37f1-e711-8136-c4346bdc3c21',
          name: 'Color',
          isRequired: true,
          isGlobal: false,
          dataType: 'RadioButton',
          values: [
            {
              id: 'ff9ae9fc-4cf1-e711-8136-c4346bdc3c21',
              value: 'Red',
              isSelected: false,
            },
            {
              id: 'de83153a-9cf6-e711-813c-c4346bdcdf81',
              value: 'Black',
              isSelected: false,
            },
            {
              id: '458e1240-9cf6-e711-813c-c4346bdcdf81',
              value: 'Gold',
              isSelected: false,
            },
          ],
        },
      ];
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
                this.props.quoteLine.configAttribute.map((configAttribute) => (
                  <div>
                    <span className="categoryLabel">{configAttribute.name}</span>
                    { this.renderConfigAttribute(configAttribute) }
                  </div>
                ))
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
  selectedRadioControlName: PropTypes.any,
  onConfigAttrTextOrNumberValueChange: PropTypes.func,
  onConfigAttrRadioValueChange: PropTypes.func,
  onConfigAttrCheckboxValueChange: PropTypes.func,
  onConfigAttrSelectboxValueChange: PropTypes.func,
};

export default ReconfigureProductTab;

