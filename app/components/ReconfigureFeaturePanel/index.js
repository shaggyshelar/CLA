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
      if (feature.categoryId) {
        return (<Button key={index} bsStyle="link" onClick={() => { browserHistory.push(`/addConfigureproducts?ids=${feature.id}/${feature.categoryId}/${this.props.quoteName}`); }} >Add Options</Button>);
      }
      return (<Button key={index} bsStyle="link" onClick={() => { browserHistory.push(`/addConfigureproducts?ids=${feature.id}/${this.props.quoteName}`); }} >Add Options</Button>);
    }
    return (<span></span>);
  }
  renderMinMaxMessage(feature) {
    let text = '';
    if (feature.minOption && feature.maxOption) {
      text = `Choose at least ${feature.minOption} but no more than ${feature.maxOption} of the following:`;
    } else if (feature.minOption && feature.maxOption == null) {
      text = `Choose at least ${feature.minOption} of the following:`;
    }
    return (<div className="minMaxMessage"><span>{text}</span></div>);
  }

  renderFeatureGrid(feature, index) {
    let addButton = {};
    if (feature !== undefined) {
      addButton = this.renderAddButton(feature, index);
      return (<div key={index} className="group panelMargin">
        <div className="group-card">
          <span className="group-header">{feature.name}</span>
          {this.renderMinMaxMessage(feature)}
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
          categoryId={this.props.categoryId}
          deleteProduct={this.props.deleteProduct}
          updateField={this.props.updateField}
          quoteName={this.props.quoteName}
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
  updateField: PropTypes.func,
  categoryId: PropTypes.any,
  quoteName: PropTypes.any,
};

export default ReconfigureFeaturePanel;

