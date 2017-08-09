/**
*
* ReconfigureProductTab
*
*/

import React, { PropTypes } from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap/lib';

import ReconfigureFeaturePanel from 'components/ReconfigureFeaturePanel';

class ReconfigureProductTab extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // renderTabList(item, index) {
  //   return (<li key={index} role="presentation" className={index === 0 ? 'active' : ''} >
  //     <a href={`#${item.id}`} aria-controls="home" role="tab" data-toggle="tab">{item.name}</a>
  //   </li>);
  // }
  // renderTabPanel(item, index) {
  //   return (<div key={index} role="tabpanel" className={index === 0 ? 'tab-pane active' : 'tab-pane'} id={item.id}>
  //     <ReconfigureFeaturePanel
  //       dataProd={this.props.dataProd}
  //       showFilter={this.props.showFilter}
  //       toggleSidebar={this.toggleSidebar}
  //       toggleCheckboxChange={this.toggleCheckboxChange}
  //       addProductsWait={this.addProductsWait}
  //       checkAll={this.props.checkAll}
  //       productBundle={this.props.productBundle}
  //     />
  //   </div>);
  // }

  returnReactTab(item, index, isCategory) {
    return (<Tab key={index} eventKey={index} title={item.name}>
      <ReconfigureFeaturePanel
        dataProd={this.props.dataProd}
        showFilter={this.props.showFilter}
        toggleSidebar={this.toggleSidebar}
        toggleCheckboxChange={this.toggleCheckboxChange}
        addProductsWait={this.addProductsWait}
        checkAll={this.props.checkAll}
        productBundle={this.props.productBundle}
        categoryId={isCategory ? item.id : null}
        featureId={isCategory ? null : item.id}
      />
    </Tab>);
  }

  render() {
    const tabtitleList = [];
    // const tabDiv = [];
    if (this.props.productBundle !== undefined) {
      if (this.props.productBundle.categories !== undefined && this.props.productBundle.categories.length > 0) {
        this.props.productBundle.categories.map((categoryItem, categoryIndex) => {
          tabtitleList.push(this.returnReactTab(categoryItem, categoryIndex, true));
          // tabDiv.push(this.renderTabPanel(item, index));
          return categoryIndex;
        });
      } else {
        // if there are no categories bind features
        this.props.productBundle.features.map((feature, featureIndex) => {
          tabtitleList.push(this.returnReactTab(feature, featureIndex, false));
          // tabDiv.push(this.renderTabPanel(item, index));
          return featureIndex;
        });
      }
    }


    return (
      <div>
        <div className="margin-tabs">
          <Row>
            <Col md={12} sm={12} xs={12}>
              <h1>{this.props.productBundle ? this.props.productBundle.name : ''}</h1>
            </Col>
          </Row>
          {/* <Row>
            <Col md={12} sm={12} xs={12}>
              <ul className="nav nav-tabs" role="tablist">
                {tabtitleList}
              </ul>
            </Col>
          </Row> */}
        </div>
        {/* <div className="tab-content">
          {tabDiv}
        </div> */}


        <Tabs defaultActiveKey={0} id="configureProductsList">
          {tabtitleList}
          {/* <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
          <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
          <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab> */}
        </Tabs>
      </div>
    );
  }
}

ReconfigureProductTab.propTypes = {
  showFilter: PropTypes.any,
  productBundle: PropTypes.any,
};

export default ReconfigureProductTab;
