/*
 *
 * ProductSelectionPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {makeSelectProductSelectionPage,showFilter} from './selectors';
import messages from './messages';
import { ProductSelectionHeader } from '../ProductSelectionHeader';
import ProductSelectionGrid from 'components/ProductSelectionGrid';
export class ProductSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
  	super(props, context);
    
  	
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }
  toggleSidebar() {
    this.props.toggleFilter({data:!this.props.showFilter});
    this.forceUpdate()
  }
  render() {
    return (
      <div>
        <Helmet
          title="ProductSelectionPage"
          meta={[
            { name: 'description', content: 'Description of ProductSelectionPage' },
          ]}
        />
        <div style={{zIndex:'9999999'}}>
          <ProductSelectionHeader showFilter={this.props.showFilter} toggleFilter={this.toggleSidebar}/>
        </div>
        <div>
          <ProductSelectionGrid showFilter={this.props.showFilter}/>
          
        </div>
      </div>
    );
  }
}

ProductSelectionPage.propTypes = {
  dispatch: PropTypes.func,
  toggleFilter:PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ProductSelectionPage: makeSelectProductSelectionPage(),
  showFilter:showFilter()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleFilter: (value) => {
      debugger
      dispatch(showFilter(value));
    },
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionPage);
