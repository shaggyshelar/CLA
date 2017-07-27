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
import { loadData, cloneLine, deleteLine } from './actions';


export class EditQuotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.getAllData()
  }

  render() {
    return (
      <div>
        <Helmet
          title="EditQuotePage"
          meta={[
            { name: 'description', content: 'Description of EditQuotePage' },
          ]}
        />
        <div>
          <EditQuoteHeader
            data={this.props.data}
            cloneLine={this.props.cloneLine}
          />
        </div>
        <div>
          <EditQuoteGrid
            data={this.props.data}
            cloneLine={this.props.cloneLine}
            deleteLine={this.props.deleteLine}
          />
        </div>
      </div>
    );
  }
}

EditQuotePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getAllData: React.PropTypes.func,
  cloneLine: PropTypes.func,
  deleteLine: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllData: () => {
      dispatch(loadData());
    },
    cloneLine: (data) => {
      dispatch(cloneLine(data));
    },
    deleteLine: (data) => {
      dispatch(deleteLine(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotePage);