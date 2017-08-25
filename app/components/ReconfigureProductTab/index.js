/**
*
* ReconfigureProductTab
*
*/

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Col, Row, Tab, Tabs } from 'react-bootstrap/lib';

import ReconfigureFeaturePanel from 'components/ReconfigureFeaturePanel';

class ReconfigureProductTab extends React.Component { // eslint-disable-line react/prefer-stateless-function

  returnReactTab(item, index) {
    return (<Tab key={index} eventKey={index} title={item.name}>
      <ReconfigureFeaturePanel
        dataProd={this.props.dataProd}
        showFilter={this.props.showFilter}
        toggleSidebar={this.toggleSidebar}
        toggleCheckboxChange={this.toggleCheckboxChange}
        addProductsWait={this.addProductsWait}
        checkAll={this.props.checkAll}
        features={item.features}
        categoryId={item.id}
        deleteProduct={this.props.deleteProduct}
        updateField={this.props.updateField}
      />
    </Tab>);
  }

  returnFeaturePanel(item) {
    return (
      <ReconfigureFeaturePanel
        key={Math.random()}
        dataProd={this.props.dataProd}
        showFilter={this.props.showFilter}
        toggleSidebar={this.toggleSidebar}
        toggleCheckboxChange={this.toggleCheckboxChange}
        addProductsWait={this.addProductsWait}
        checkAll={this.props.checkAll}
        features={item}
        deleteProduct={this.props.deleteProduct}
        updateField={this.props.updateField}
      />);
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
      <div className="qoute-container">
        <div className="margin-tabs">
          <Row>
            <Col md={12} sm={12} xs={12}>
              <span className="categoryLabel">{this.props.reConfigureData.productBundleName}</span>
            </Col>
          </Row>
        </div>
        <div>
          {showTabView ?
            <Tabs defaultActiveKey={0} id="configureProductsList">
              {tabtitleList}
            </Tabs>
        : <div>{ tabtitleList }</div>
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
};

export default ReconfigureProductTab;

