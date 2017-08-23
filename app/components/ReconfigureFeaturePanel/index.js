/**
*
* ReconfigureFeaturePanel
*
*/

import React, { PropTypes } from 'react';
import _ from 'lodash';
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

  renderAddButton(feature, index) {
    if (feature.DynamicAddEnabled) {
      return (<Button key={index} bsStyle="link" onClick={() => { browserHistory.push(`/addConfigureproducts?featureId=${feature.id}`); }} >Add Options</Button>);
    }
    return (<span></span>);
  }

  renderFeatureGrid(feature, index) {
    let addButton = {};
    if (feature !== undefined) {
      addButton = this.renderAddButton(feature, index);
      return (<div key={index} className="group">
        <div className="group-card">
          <span className="group-header">{feature.name}</span>
        </div>
        <ReconfigureGrid
          products={feature.products.length > 0 ? feature.products : []}
          showFilter={this.props.showFilter}
          toggleFilter={this.props.toggleSidebar}
          toggleCheckboxChange={this.props.toggleCheckboxChange}
          data={feature.products.length > 0 ? feature.products : []}
          addProductsWait={this.props.addProductsWait}
          checkAll={this.props.checkAll}
          toggleCheckAll={this.props.checkAll}
          feature={feature}
          deleteProduct={this.props.deleteProduct}
        />
        {addButton}
      </div>);
    }
    return (<span></span>);
  }

  render() {
    const panel = [];
    if (!_.isUndefined(this.props.features) && this.props.features.length > 0) {
      panel.push(this.props.features.map((item, index) => this.renderFeatureGrid(item, index)));
    }
    return (
      <div>
        { panel }
      </div>
    );
  }
}

ReconfigureFeaturePanel.propTypes = {
  showFilter: PropTypes.func,
  checkAll: PropTypes.func,
  toggleSidebar: PropTypes.func,
  toggleCheckboxChange: PropTypes.func,
  addProductsWait: PropTypes.func,
  features: PropTypes.any,
  deleteProduct: PropTypes.func,
};

export default ReconfigureFeaturePanel;

