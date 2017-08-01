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
import { makeSelectData, makeSelectError, makeSelectLoading } from './selectors';
import { EditQuoteHeader } from '../EditQuoteHeader';
import { cloneLine, deleteLine /* , loadXrmData*/ } from '../App/actions';

export class EditQuotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    //this.props.getAllData();
    // this.props.getXrmData();
    if (window.parent.Xrm !== undefined) {
      console.log(window.parent.Xrm.Page.context.getClientUrl());
      console.log(window.parent.Xrm.Page.data.entity.getId().replace('{', '').replace('}', ''));
      console.log(window.parent.Xrm.Page.data.entity.getEntityName());
    }
  }

  componentDidMount() {
    if (!this.props.data.priceList) {
      browserHistory.push('/PriceBook');
    }
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
            data={this.props.data.products}
            cloneLine={this.props.cloneLine}
          />
        </div>
        <div>
          <EditQuoteGrid
            data={this.props.data.products ? this.props.data.products : []}
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
  cloneLine: PropTypes.func,
  deleteLine: PropTypes.func,
  data: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    cloneLine: (data) => {
      dispatch(cloneLine(data));
    },
    deleteLine: (data) => {
      dispatch(deleteLine(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotePage);
