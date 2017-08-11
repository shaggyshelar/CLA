/**
*
* ReconfigureFeaturePanel
*
*/

import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap/lib';
import ReconfigureGrid from 'components/ReconfigureGrid';
import { browserHistory } from 'react-router';

class ReconfigureFeaturePanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {

  }

  setProductsForFeature(featureId) {
    if (this.props.productBundle.products !== undefined) {
      this.state.products = this.props.productBundle.products.filter((item, index) => (item.featureId === featureId
        //  &&
        //   ((this.props.categoryId !== null && item.categoryId === this.props.categoryId)
        //       || this.props.categoryId === null)
        ));
    } else {
      // this.state.products = [];
    }
  }

  renderAddButton(feature, index) {
    if (feature.DynamicAddEnabled) {
      return (<Button key={index} bsStyle="link" onClick={() => { browserHistory.push(`/addConfigureproducts?featureId=${feature.id}`); }} >Add Options</Button>);
    }
    return (<span></span>);
  }

  renderFeatureGrid(feature, index) {
    if (this.props.featureId !== null && this.props.featureId !== undefined) {
      this.setProductsForFeature(this.props.featureId);
    } else {
      this.setProductsForFeature(feature.id);
    }
    let addButton = {};
    if ((this.props.categoryId !== null && feature.categoryId === this.props.categoryId)) {
      addButton = this.renderAddButton(feature, index);
      return (<div key={index} className="group">
        <div className="group-card">
          <span className="group-header">{feature.name}</span>
        </div>
        <ReconfigureGrid
          products={this.state.products}
          showFilter={this.props.showFilter}
          toggleFilter={this.props.toggleSidebar}
          toggleCheckboxChange={this.props.toggleCheckboxChange}
          data={this.state.products}
          addProductsWait={this.props.addProductsWait}
          checkAll={this.props.checkAll}
          toggleCheckAll={this.props.checkAll}
          feature={feature}
        />
        {addButton}
      </div>);
    } if ((this.props.categoryId === null && feature.id === this.props.featureId)) {
      addButton = this.renderAddButton(feature, index);
      return (<div key={index} className="group">
        <div className="group-card">
          <span className="group-header">{feature.name}</span>
        </div>
        <ReconfigureGrid
          products={this.state.products}
          showFilter={this.props.showFilter}
          toggleFilter={this.props.toggleSidebar}
          toggleCheckboxChange={this.props.toggleCheckboxChange}
          data={this.state.products}
          addProductsWait={this.props.addProductsWait}
          checkAll={this.props.checkAll}
          toggleCheckAll={this.props.checkAll}
          feature={feature}
        />
        {addButton}
      </div>);
    }
    // else {
    //   jsxData = (<div key={index} className="group">
    //     <div className="group-card">
    //       <span className="group-header">No records found</span>
    //     </div>
    //   </div>
    //   );
    // }
    // return jsxData;
  }

  render() {
    const panel = [];
    if (this.props.productBundle !== undefined) {
      if (this.props.productBundle.features !== undefined && this.props.productBundle.features.length > 0) {
        panel.push(this.props.productBundle.features.map((item, index) => this.renderFeatureGrid(item, index)));
      }
    }
    return (
      <div>
        { panel }
      </div>
    );
  }
}

ReconfigureFeaturePanel.propTypes = {
  categoryId: PropTypes.any,
  showFilter: PropTypes.func,
  checkAll: PropTypes.func,
  toggleSidebar: PropTypes.func,
  toggleCheckboxChange: PropTypes.func,
  addProductsWait: PropTypes.func,
  productBundle: PropTypes.object,
  featureId: PropTypes.any,
};

export default ReconfigureFeaturePanel;
