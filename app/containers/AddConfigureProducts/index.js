import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
      products: [
        {
          id: 123,
          code: 'P121',
          name: 'ABCD',
          featureId: 123,
          categoryId: 123,
              // categoryId: null,
          isDependent: true,
          isSelected: true,
          isRequired: true,
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
          featureId: 123,
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
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.addOptions = this.addOptions.bind(this);
  }

  componentDidMount() {
    this.props.getProductsData();
  }

  addOptions() {
    this.props.addOptions(true);
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
          <AddConfigureProductHeader
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            data={this.state.dataProd}
            addOptions={this.addOptions}
          />
          <AddConfigureProductGrid
            products={this.props.productsData.products ? this.props.productsData.products : []}
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

AddConfigureProducts.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func,
  showFilter: PropTypes.any,
  getProductsData: PropTypes.func,
  productsData: PropTypes.any,
  addOptions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  AddConfigureProducts: makeSelectAddConfigureProducts(),
  productsData: makeProductsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductsData: () => {
      dispatch(loadProductsData());
    },
    addOptions: (value) => {
      dispatch(addOptions(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddConfigureProducts);
