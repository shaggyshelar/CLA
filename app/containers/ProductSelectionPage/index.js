/*
 *
 * ProductSelectionPage
 *
 */
import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import ProductSelectionGrid from 'components/ProductSelectionGrid';
import { makeSelectProductSelectionPage, showFilter, getQuoteLines } from './selectors';
import { ProductSelectionHeader } from '../ProductSelectionHeader';
import { loadCountriesData, showFilteredData } from './actions';

export class ProductSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.addProducts = this.addProducts.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }
  componentWillMount() {
    this
      .props
      .getCountriesData();
  }
  componentDidMount() {
    if (!this.props.data.priceList) {
      browserHistory.push('/ProductSelection');
    }
  }
  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
    this.forceUpdate();
  }
  toggleCheckboxChange(e) {
    const data = this.state.selectedProducts;
    if (!e.target.checked) {
      _.remove(data, (n) => n === e.target.value);
    } else {
      data.push(e.target.value);
    }
  }
  addProducts() {
    this.props.addProducts(this.state.selectedProducts);
  }

  render() {
    return (
      <div>
        <Helmet
          title="ProductSelectionPage"
          meta={[{
            name: 'description',
            content: 'Description of ProductSelectionPage',
          },
          ]}
        />
        <div
          style={{
            zIndex: '9999999',
          }}
        >
          <ProductSelectionHeader
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            addProducts={this.addProducts}
          />
        </div>
        <div>
          <ProductSelectionGrid
            countries={this.props.countries}
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            toggleCheckboxChange={this.toggleCheckboxChange}
          />

        </div>
      </div>
    );
  }
}

ProductSelectionPage.propTypes = {
  // dispatch: PropTypes.func,
  toggleFilter: PropTypes.func,
  getCountriesData: PropTypes.func,
  countries: PropTypes.array,
  showFilter: PropTypes.any,
  data: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  ProductSelectionPage: makeSelectProductSelectionPage(),
  showFilter: showFilter(),
  data: getQuoteLines(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleFilter: (value) => {
      dispatch(showFilteredData(value));
    },
    getCountriesData: () => {
      dispatch(loadCountriesData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionPage);
