/*
 *
 * ProductSelectionHeader
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectProductSelectionHeader from './selectors';
import messages from './messages';
import ProductSelectionGrid from '../../components/ProductSelectionGrid';
import ProductSelectionHeaderCard from '../../components/ProductSelectionHeaderCard';
import SearchProductAutocomplete from '../../components/SearchProductAutocomplete';

export class ProductSelectionHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="ProductSelectionHeader"
          meta={[
            { name: 'description', content: 'Description of ProductSelectionHeader' },
          ]}
        />
        <FormattedMessage {...messages.header} />
        <ProductSelectionGrid />
        <ProductSelectionHeaderCard />
        <SearchProductAutocomplete />
      </div>
    );
  }
}

ProductSelectionHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ProductSelectionHeader: makeSelectProductSelectionHeader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionHeader);
