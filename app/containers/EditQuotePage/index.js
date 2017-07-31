/*
 *
 * EditQuote
 *
 */
import { browserHistory } from 'react-router';
import EditQuoteGrid from 'components/EditQuoteGrid';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectData, makeSelectError, makeSelectLoading, showPrice } from './selectors';
import { EditQuoteHeader } from '../EditQuoteHeader';
import { loadData, cloneLine, deleteLine, loadXrmData } from './actions';

export class EditQuotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.getAllData();
    this.props.getXrmData();
    if (window.parent.Xrm !== undefined) {
      console.log(window.parent.Xrm.Page.context.getClientUrl());
      console.log(window.parent.Xrm.Page.data.entity.getId().replace("{", "").replace("}", ""));
      console.log(window.parent.Xrm.Page.data.entity.getEntityName());
    }
  }

  componentDidMount() {
    if (this.props.data.length) {
      browserHistory.push('/PriceBook');
    }
  }

  render() {
    if (this.props.data.length === 0 || this.props.showPriceBook) {
      browserHistory.push('/PriceBook');
    }
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
  deleteLine: PropTypes.func,
  getXrmData: PropTypes.func,
  data: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  showPriceBook: showPrice(),
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
    getXrmData: () => {
      dispatch(loadXrmData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotePage);
