/*
 *
 * EditQuote
 *
 */
import { browserHistory } from 'react-router';
import EditQuoteGrid from 'components/EditQuoteGrid';
import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectData, makeSelectError, makeSelectLoading } from './selectors';
import { EditQuoteHeader } from '../EditQuoteHeader';
import { cloneLine, deleteLine /* , loadXrmData*/ } from '../App/actions';


export class EditQuotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state={
      selectedQuotes: [],
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
  }
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
    if (!this.props.data.get('priceList')) {
      browserHistory.push('/PriceBook');
    }
    console.log(this.props.data.getIn(['products']).toJS())
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
    //const data = this.state.selectedQuotes;
    if (!e.target.checked) {
      _.remove(this.state.selectedQuotes, (n) => n === e.target.value);
      if (d.checked) {
        d.checked = false;
      }
    } else {
      this.state.selectedQuotes.push(e.target.value);
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
            data={this.props.data.get('products') ? this.props.data.get('products').toJS() : []}
            cloneLine={this.props.cloneLine}
            deleteLine={this.props.deleteLine}
            toggleAllCheckBox={this.checkAll}
            toggleQuoteCheckbox={this.toggleCheckboxChange}
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
