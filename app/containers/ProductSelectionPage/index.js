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

import makeSelectProductSelectionPage from './selectors';
import messages from './messages';
import { ProductSelectionHeader } from '../ProductSelectionHeader';
import ProductSelectionGrid from 'components/ProductSelectionGrid';
export class ProductSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
          <ProductSelectionHeader />
        </div>
        <div>
          <ProductSelectionGrid />
          
        </div>
      </div>
    );
  }
}

ProductSelectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ProductSelectionPage: makeSelectProductSelectionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionPage);
