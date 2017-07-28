/*
 *
 * ProductSelectionPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import ProductSelectionGrid from 'components/ProductSelectionGrid';
import { makeSelectProductSelectionPage, showFilter, makeCountriesData } from './selectors';
import { ProductSelectionHeader } from '../ProductSelectionHeader';
export class ProductSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.toggleSidebar = this
      .toggleSidebar
      .bind(this);
    this
      .props
      .getCountriesData();
  }
  toggleSidebar() {
    this
      .props
      .toggleFilter({
        data: !this.props.showFilter,
      });
    this.forceUpdate();
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
          />
        </div>
        <div>
          <ProductSelectionGrid
            countries={this.props.countries}
            showFilter={this.props.showFilter}
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
  countries: PropTypes.any,
  showFilter: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({ ProductSelectionPage: makeSelectProductSelectionPage(), showFilter: showFilter() });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleFilter: (value) => {
      dispatch(showFilter(value));
    },
    getCountriesData: () => {
      dispatch(makeCountriesData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionPage);
