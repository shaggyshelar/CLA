import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import AddConfigureProductHeader from 'components/AddConfigureProductHeader';
import AddConfigureProductGrid from 'components/AddConfigureProductGrid';
import { createStructuredSelector } from 'reselect';
import { makeSelectAddConfigureProducts, makeProductsData, makeSelectLoading, makeSelectError, getLanguage } from './selectors';
import { loadProductsData, toggleCheckbox, toggleCheckAll } from './actions';
import { addOptions } from '../ReConfigureProducts/actions';
import { changeLocale } from '../LanguageProvider/actions';

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
    const params = {
      featureId: this.props.location.query.featureId,
      bundleId: this.props.location.query.bundleId,
      priceBookId: this.props.location.query.priceBookId,
      quoteId: this.props.location.query.quoteId,
      bundleLineId: this.props.location.query.bundleLineId,
      groupId: this.props.location.query.groupId,
    };

    this.props.getProductsData(params);
  }

  addOptions() {
    const products = this.props.productsData.toJS().products ? this.props.productsData.toJS().products : [];
    const productObj = {
      selectedProducts: _.filter(products, { isSelected: true }),
      featureId: this.props.location.query.featureId,
      categoryId: this.props.location.query.categoryId,
    };
    this.props.addOptions(productObj);
    browserHistory.goBack();
  }

  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
    this.forceUpdate();
  }

  checkAll(e) {
    this.props.toggleCheckAllChange(e.target.checked);
  }

  toggleCheckboxChange(e) {
    this.props.toggleCheckboxChange(e.target.value);
  }

  render() {
    const quoteName = this.props.location.query.quoteName;
    const style = this.props.loading ? { display: 'inline' } : { display: 'none' };
    if (this.props.loading) {
      return (<div className="loader" style={style}></div>);
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
            language={this.props.language}
            languageChange={this.props.changeLocale}
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
  loading: PropTypes.any,
  language: PropTypes.any,
  changeLocale: PropTypes.any,
  toggleCheckboxChange: PropTypes.func,
  toggleCheckAllChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  AddConfigureProducts: makeSelectAddConfigureProducts(),
  productsData: makeProductsData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  language: getLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductsData: (params) => {
      dispatch(loadProductsData(params));
    },
    addOptions: (productObj) => {
      dispatch(addOptions(productObj));
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
    toggleCheckboxChange: (id) => {
      dispatch(toggleCheckbox(id));
    },
    toggleCheckAllChange: (isCheckAll) => {
      dispatch(toggleCheckAll(isCheckAll));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddConfigureProducts);
