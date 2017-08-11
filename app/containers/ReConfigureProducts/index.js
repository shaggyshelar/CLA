/*
 *
 * ReConfigureProducts
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap/lib';
import ReactDOM from 'react-dom';
import { createStructuredSelector } from 'reselect';
import ReconfigureProductHeader from 'components/ReconfigureProductHeader';
import ReconfigureGrid from 'components/ReconfigureGrid';
import makeSelectReConfigureProducts from './selectors';
import loadConfigureProductsData from './actions';
import ReconfigureProductTab from 'components//ReconfigureProductTab';
export class ReConfigureProducts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      dataProd: [
        {
          _id: '596db79f58d3f94623033cd0',
          code: 'Tillman',
          name: 'Bradley',
          description: '',
          unitPrice: '$ 650.325',
          quantity: 14.7428,
        },
        {
          _id: '596db79f34ec0f84605ca6a1',
          code: 'Hernandez',
          name: 'Holman',
          description: '',
          unitPrice: '$ 506.595',
          quantity: 50.8204,
        },
        {
          _id: '596db79f10b858fe71591077',
          code: 'Burch',
          name: 'Collins',
          description: '',
          unitPrice: '$ 563.00',
          quantity: 47.5805,
        },
        {
          _id: '596db79f90613ebdf6dc2b7c',
          code: 'Coleman',
          name: 'Hunter',
          description: '',
          unitPrice: '$ 900.323',
          quantity: 82.5088,
        },
        {
          _id: '596db79f94800616a15f5ed5',
          code: 'Lorene',
          name: 'Brennan',
          description: '',
          quantity: 77.3144,
          unitPrice: '$ 230.653',
        },
      ],
      products: {
        productBundle: {
          id: 1,
          quoteId: 123,
          name: 'Meal',
          products: [
            {
              id: 123,
              code: 'P121',
              name: 'ABCD',
              featureId: 123,
              categoryId: 123,
              // categoryId: null,
              isDependent: true,
              optionSelectionMethod: 123,
              optionLayout: 'wizard/section/tab',
              quantity: {
                value: 123,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: ':List',
                    isSelected: true,
                  },
                ],
              },
              listPrice: {
                value: 123,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: ':List',
                    isSelected: true,
                  },
                ],
              },
            },
            {
              id: 234,
              code: 'P122',
              name: 'EFGH',
              featureId: 456,
              categoryId: 456,
              // categoryId: null,
              isDependent: true,
              optionSelectionMethod: 456,
              optionLayout: 'wizard/section/tab',
              quantity: {
                value: 565,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: ':List',
                    isSelected: true,
                  },
                ],
              },
              listPrice: {
                value: 654,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 554,
                    value: ':List',
                    isSelected: true,
                  },
                ],
              },
            },
          ],
          categories: [
            {
              id: 123,
              name: 'Hardware',
            },
            {
              id: 456,
              name: 'Software',
            },
          ],
          features: [
            {
              id: 123,
              categoryId: 123,
              // categoryId: null,
              name: 'Drinks',
              DynamicAddEnabled: true,
            },
            {
              id: 456,
              categoryId: 456,
              // categoryId: null,
              name: 'Mc Meal',
              DynamicAddEnabled: false,
            },
          ],
        },
        config: {},
      },
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
  }
  componentWillMount() {

  }

  componentDidMount() {
    // this.props.getProductsData();
  }

  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
    this.forceUpdate();
  }

  checkAll(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    for (let i = 0; i < d.length; i++) {
      if (!d[i].checked && e.target.checked) {
        d[i].click();
      } else if (d[i].checked && !e.target.checked) {
        d[i].click();
      }
    }
  }

  toggleCheckboxChange(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    const data = this.state.selectedProducts;
    if (!e.target.checked) {
      _.remove(data, (n) => n === e.target.value);
      if (d.checked) {
        d.checked = false;
      }
    } else {
      data.push(e.target.value);
    }
    this.setState({
      selectedProducts: data,
    });
  }


  render() {
    return (
      <div>
        <div
          style={{
            zIndex: '9999999',
          }}
        >
          <ReconfigureProductHeader
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            data={this.state.dataProd}
          />
          <ReconfigureProductTab
            productBundle={this.state.products ? this.state.products.productBundle : {}}
            dataProd={this.state.dataProd}
            products={this.props.dataProd}
            showFilter={this.props.showFilter}
            toggleSidebar={this.toggleSidebar}
            toggleCheckboxChange={this.toggleCheckboxChange}
            addProductsWait={this.addProductsWait}
            checkAll={this.state.checkAll}
            toggleCheckAll={this.checkAll}
          />
        </div>
      </div>
    );
  }
}

ReConfigureProducts.propTypes = {
  toggleFilter: PropTypes.func,
  showFilter: PropTypes.any,
  dataProd: PropTypes.any,
  // data: PropTypes.any,
  // products: PropTypes.any,
  // getProductsData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ReConfigureProducts: makeSelectReConfigureProducts(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    getProductsData: () => {
      dispatch(loadConfigureProductsData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReConfigureProducts);
