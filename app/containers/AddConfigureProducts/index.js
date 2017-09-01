import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import AddConfigureProductHeader from 'components/AddConfigureProductHeader';
import AddConfigureProductGrid from 'components/AddConfigureProductGrid';
import { createStructuredSelector } from 'reselect';
import { makeSelectAddConfigureProducts, makeProductsData } from './selectors';
import { loadProductsData } from './actions';
import { addOptions } from '../ReConfigureProducts/actions';

export class AddConfigureProducts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      products: [],
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.addOptions = this.addOptions.bind(this);
  }

  componentDidMount() {
    let featureId = '';
    const params = _.split(this.props.location.query.ids, '/');
    if (params.length > 0) {
      featureId = parseInt(params[0], 0);
    }
    this.props.getProductsData(featureId);
  }

  addOptions() {
    const params = _.split(this.props.location.query.ids, '/');
    const products = this.props.productsData.toJS().products ? this.props.productsData.toJS().products : [];
    const productObj = {
      selectedProducts: [],
    };

    if (params.length === 1) {
      productObj.featureId = parseInt(params[0], 0);
    } else if (params.length === 2) {
      productObj.featureId = parseInt(params[0], 0);
      productObj.categoryId = parseInt(params[1], 0);
    }
    this.state.selectedProducts = _.uniq(this.state.selectedProducts);
    this.state.selectedProducts.forEach((currentProductId) => {
      const productIndex = _.findIndex(products, { id: parseInt(currentProductId, 0) });
      productObj.selectedProducts.push(products[productIndex]);
    }, this);
    this.props.addOptions(productObj);
    browserHistory.push('/reconfigureproducts');
  }

  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
    this.forceUpdate();
  }

  checkAll(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    for (let i = 0; i < d.length; i += 1) {
      if (!d[i].checked && e.target.checked) {
        d[i].click();
      } else if (d[i].checked && !e.target.checked) {
        d[i].click();
      }
    }
  }

  toggleCheckboxChange(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    // const data = this.state.selectedQuotes;
    if (!e.target.checked) {
      _.remove(this.state.selectedProducts, (n) => n === e.target.value);
      if (d.checked) {
        d.checked = false;
      }
    } else {
      this.state.selectedProducts.push(e.target.value);
    }
  }

  render() {
    let quoteName = '';
    const params = _.split(this.props.location.query.ids, '/');
    if (params.length === 2) {
      quoteName = params[1];
    } else if (params.length === 3) {
      quoteName = params[2];
    }
    return (
      <div>
        <div
          style={{
            zIndex: '9999999',
          }}
        >
          <AddConfigureProductHeader
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            data={this.state.dataProd}
            addOptions={this.addOptions}
            quoteName={quoteName}
          />
          <div className="qoute-container">
            <AddConfigureProductGrid
              products={this.props.productsData.toJS().products ? this.props.productsData.toJS().products : []}
              showFilter={this.props.showFilter}
              toggleSidebar={this.toggleSidebar}
              toggleCheckboxChange={this.toggleCheckboxChange}
              addProductsWait={this.addProductsWait}
              checkAll={this.state.checkAll}
              toggleCheckAll={this.checkAll}
            />
          </div>
        </div>
      </div>
    );
  }
}

AddConfigureProducts.propTypes = {
  toggleFilter: PropTypes.func,
  showFilter: PropTypes.any,
  getProductsData: PropTypes.func,
  productsData: PropTypes.any,
  addOptions: PropTypes.func,
  location: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  AddConfigureProducts: makeSelectAddConfigureProducts(),
  productsData: makeProductsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductsData: (featureId) => {
      dispatch(loadProductsData(featureId));
    },
    addOptions: (productObj) => {
      dispatch(addOptions(productObj));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddConfigureProducts);
