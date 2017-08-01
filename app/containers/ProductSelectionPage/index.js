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
import { addProducts } from '../App/actions';
export class ProductSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      dataProd: [
        {
          _id: '596db79f58d3f94623033cd0',
          'PRODUCT CODE': 'Tillman',
          'PRODUCT NAME': 'Bradley',
          'LIST PRICE': '$ 332.9494',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 625.0061',
          'NET TOTAL': '$ 25.9874',
          QUANTITY: 14.7428,
        },
        {
          _id: '596db79f34ec0f84605ca6a1',
          'PRODUCT CODE': 'Hernandez',
          'PRODUCT NAME': 'Holman',
          'LIST PRICE': '$ 700.7878',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 506.595',
          'NET TOTAL': '$ 502.2979',
          QUANTITY: 50.8204,
        },
        {
          _id: '596db79f10b858fe71591077',
          'PRODUCT CODE': 'Burch',
          'PRODUCT NAME': 'Collins',
          'LIST PRICE': '$ 964.9937',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 269.6924',
          'NET TOTAL': '$ 305.6421',
          QUANTITY: 47.5805,
        },
        {
          _id: '596db79f90613ebdf6dc2b7c',
          'PRODUCT CODE': 'Coleman',
          'PRODUCT NAME': 'Hunter',
          'LIST PRICE': '$ 833.9739',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 942.7997',
          'NET TOTAL': '$ 72.1729',
          QUANTITY: 82.5088,
        },
        {
          _id: '596db79f94800616a15f5ed5',
          'PRODUCT CODE': 'Lorene',
          'PRODUCT NAME': 'Brennan',
          'LIST PRICE': '$ 804.2955',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 121.7662',
          'NET TOTAL': '$ 487.7556',
          QUANTITY: 77.3144,
        },
      ],
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
    let data = [];
    data = _.filter(this.state.dataProd, (o) =>
      this.state.selectedProducts.includes(o['_id'])
    );
    this.props.addProductsToQuote(data);
    browserHistory.push('/EditQuote');

  }

  render() {
    return (
      <div>
        <Helmet
          title="ProductSelectionPage"
          meta={[{
            name: 'description',
            content: 'Description of ProductSelectionPage',
          }, this.props.data,
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
            data={this.state.dataProd}
            addProducts={this.addProducts}
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
    addProductsToQuote: (value) => {
      dispatch(addProducts(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionPage);
