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
import messages from './messages';

class ReconfigureFeaturePanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.state = {
      products: [],
    };
  }

  renderAddButton(feature, index) {
    if (feature.dynamicAddEnabled) {
      if (feature.categoryId) {
        return (<Button key={index} bsStyle="link" onClick={() => { this.props.toggleAddOptionsState(true, this.props.activeTab); browserHistory.push(`/addConfigureproducts?featureId=${feature.id}&categoryId=${feature.categoryId}&quoteName=${this.props.params.quoteName}&bundleId=${this.props.params.bundleId}&priceBookId=${this.props.params.priceBookId}&quoteId=${this.props.params.quoteId}&bundleLineId=${this.props.params.bundleLineId}&groupId=${this.props.params.groupId}`); }} >{this.context.intl.formatMessage({ ...messages.addOptions })}</Button>);
      }
      return (<Button key={index} bsStyle="link" onClick={() => { this.props.toggleAddOptionsState(true, this.props.activeTab); browserHistory.push(`/addConfigureproducts?featureId=${feature.id}&quoteName=${this.props.params.quoteName}&bundleId=${this.props.params.bundleId}&priceBookId=${this.props.params.priceBookId}&quoteId=${this.props.params.quoteId}&bundleLineId=${this.props.params.bundleLineId}&groupId=${this.props.params.groupId}`); }} >{this.context.intl.formatMessage({ ...messages.addOptions })}</Button>);
    }
    return (<span></span>);
  }
  renderMinMaxMessage(feature) {
    let text = '';
    if (feature.minOption && feature.maxOption) {
      text = `Choose at least ${feature.minOption} but no more than ${feature.maxOption} of the following:`;
    } else if (feature.minOption && feature.maxOption == null) {
      text = `Choose at least ${feature.minOption} of the following:`;
    } else if (feature.minOption == null && feature.maxOption) {
      text = `Choose at most ${feature.maxOption} of the following:`;
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
};

export default ReconfigureFeaturePanel;

