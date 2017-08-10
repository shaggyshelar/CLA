/**
*
* ReconfigureFeaturePanel
*
*/

import React, { PropTypes } from 'react';
import ReconfigureGrid from 'components/ReconfigureGrid';


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

  renderFeatureGrid(feature, index) {
    // this.setProductsForFeature(feature.id);
    if (this.props.featureId !== null && this.props.featureId !== undefined) {
      this.setProductsForFeature(this.props.featureId);
    } else {
      this.setProductsForFeature(feature.id);
    }
    const jsxData = {};
    if ((this.props.categoryId !== null && feature.categoryId === this.props.categoryId)) {
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
        />
      </div>);
    } if ((this.props.categoryId === null && feature.id === this.props.featureId)) {
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
        />
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
        // panel.push(this.props.productBundle.features.map((item, index) => this.renderFeatureGrid(item, index)));
        panel.push(this.props.productBundle.features.map((item, index) => this.renderFeatureGrid(item, index)));
      }
    }
    return (
      <div>
        { panel }
      </div>
      // <div className="group">
      //   <div className="group-card">
      //     <span className="group-header">Other Options</span>
      //   </div>
      //   <ReconfigureGrid
      //     products={this.props.dataProd}
      //     showFilter={this.props.showFilter}
      //     toggleFilter={this.props.toggleSidebar}
      //     toggleCheckboxChange={this.props.toggleCheckboxChange}
      //     data={this.props.dataProd}
      //     addProductsWait={this.props.addProductsWait}
      //     checkAll={this.props.checkAll}
      //     toggleCheckAll={this.props.checkAll}
      //   />
      // </div>
    );
  }
}

ReconfigureFeaturePanel.propTypes = {
  dataProd: PropTypes.array,
  categoryId: PropTypes.any,
  showFilter: PropTypes.func,
  checkAll: PropTypes.func,
  toggleSidebar: PropTypes.func,
  toggleCheckboxChange: PropTypes.func,
  addProductsWait: PropTypes.func,
  productBundle: PropTypes.object,
};

export default ReconfigureFeaturePanel;
