/*
 *
 * ReConfigureProducts
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import ReconfigureProductHeader from 'components/ReconfigureProductHeader';
import makeSelectReConfigureProducts from './selectors';
import loadConfigureProductsData from './actions';
import ReconfigureGrid from 'components/ReconfigureGrid';
import { Col, Row } from 'react-bootstrap/lib';


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
          <div className="margin-tabs">
            <Row>
              <Col md={12} sm={12} xs={12}>
                <h1>Happy Meal</h1>
              </Col>
            </Row>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active"><a href="#configGrid" aria-controls="home" role="tab" data-toggle="tab">OTHER OPTIONS</a></li>
                </ul>
              </Col>
            </Row>
          </div>
          <div className="group">

            <div className="group-card">
              <span className="group-header">Other Options</span>
            </div>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <div className="tab-content">
                  <div role="tabpanel" className="tab-pane active" id="configGrid">
                    <ReconfigureGrid
                      products={this.state.dataProd}
                      showFilter={this.props.showFilter}
                      toggleFilter={this.toggleSidebar}
                      toggleCheckboxChange={this.toggleCheckboxChange}
                      data={this.state.dataProd}
                      addProductsWait={this.addProductsWait}
                      checkAll={this.state.checkAll}
                      toggleCheckAll={this.checkAll}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

ReConfigureProducts.propTypes = {
  toggleFilter: PropTypes.func,
  showFilter: PropTypes.any,
  data: PropTypes.any,
  products: PropTypes.any,
  getProductsData: PropTypes.func,
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
