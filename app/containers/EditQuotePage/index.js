/*
 *
 * EditQuote
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectData, makeSelectError, makeSelectLoading } from './selectors';
import { EditQuoteHeader } from '../EditQuoteHeader';
import EditQuoteGrid from 'components/EditQuoteGrid';
import { loadData } from './actions';


export class EditQuotePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="margin">
        <Helmet
          title="EditQuotePage"
          meta={[
            { name: 'description', content: 'Description of EditQuotePage' },
          ]}
        />
        <EditQuoteHeader getOnLoadData={this.props.getAllData} />
        <EditQuoteGrid data={this.props.data} />
      </div>
    );
  }
}

EditQuotePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getAllData: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // EditQuotePage: makeSelectEditQuote(),
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllData: () => {
      dispatch(loadData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotePage);
