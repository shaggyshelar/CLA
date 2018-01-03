import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import SuggestionHeader from 'components/SuggestionHeader';
import SuggestionProductPanel from 'components/SuggestionProductPanel';
import { makeSelectSuggestionPage, getGlobalQuoteData, makeSelectLoading, makeSelectError, getSuggestionsData } from './selectors';
import { loadSuggestions, toggleCheckboxChange, saveSuggestions, updateProduct } from './actions';
import { toggleSuggestionStatus } from '../App/actions';


export class SuggestionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.saveSuggestions = this.saveSuggestions.bind(this);
    this.cancelSuggestion = this.cancelSuggestion.bind(this);
  }

  componentDidMount() {
    const quote = this.props.quote.toJS();
    this.props.getSuggestions(quote);
  }

  saveSuggestions() {
    const suggestionsData = this.props.suggestionsData.toJS();
    this.props.saveSuggestions(suggestionsData, this.props.location.query);
  }

  cancelSuggestion() {
    const quote = this.props.quote.toJS();
    const line = _.find(quote.lines, { suggested: true });
    if (line) {
      const suggestionObj = {
        id: line.id,
        suggested: false,
      };
      this.props.toggleSuggestionStatus(suggestionObj);
    }
    if (this.props.location.query.groupId !== null && this.props.location.query.groupId !== undefined && this.props.location.query.mainTab !== undefined && this.props.location.query.tab !== undefined) {
      browserHistory.push(`/EditQuote?groupId=${this.props.location.query.groupId}&mainTab=${this.props.location.query.mainTab}&tab=${this.props.location.query.tab}`);
    } else if ((this.props.location.query.groupId === null || this.props.location.query.groupId === undefined) && this.props.location.query.mainTab !== undefined) {
      browserHistory.push(`/EditQuote?mainTab=${this.props.location.query.mainTab}&tab=${this.props.location.query.tab}`);
    } else {
      browserHistory.push('/EditQuote');
    }
  }
  render() {
    const style = this.props.loading ? { display: 'inline' } : { display: 'none' };
    if (this.props.loading) {
      return (<div className="loader" style={style}></div>);
    }
    return (
      <div>
        <SuggestionHeader
          saveSuggestions={this.saveSuggestions}
          cancelSuggestion={this.cancelSuggestion}
        />
        <SuggestionProductPanel
          suggestionsData={this.props.suggestionsData}
          toggleCheckboxChange={this.props.toggleCheckboxChange}
          updateField={this.props.updateField}
        />
      </div>
    );
  }
}

SuggestionPage.propTypes = {
  quote: PropTypes.any,
  loading: PropTypes.any,
  getSuggestions: PropTypes.func,
  location: PropTypes.any,
  toggleSuggestionStatus: PropTypes.any,
  suggestionsData: PropTypes.any,
  toggleCheckboxChange: PropTypes.any,
  saveSuggestions: PropTypes.any,
  updateField: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  SuggestionPage: makeSelectSuggestionPage(),
  quote: getGlobalQuoteData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  suggestionsData: getSuggestionsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSuggestions: (data) => {
      dispatch(loadSuggestions(data));
    },
    toggleSuggestionStatus: (suggestionObj) => {
      dispatch(toggleSuggestionStatus(suggestionObj));
    },
    toggleCheckboxChange: (suggestionObj) => {
      dispatch(toggleCheckboxChange(suggestionObj));
    },
    saveSuggestions: (data, locationQuery) => {
      dispatch(saveSuggestions(data, locationQuery));
    },
    updateField: (productObj) => {
      dispatch(updateProduct(productObj));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionPage);
