import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadData } from './actions';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectData, getLanguage } from './selectors';
export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };
  constructor(props) {
    super(props);
    this.languageChange = this.languageChange.bind(this);
  }
  componentWillMount() {
    this.props.getAllData();
    // this.props.getXrmData();
  }
  languageChange(e) {
    this.props.changeLocale(e.target.value);
  }
  render() {
    const currency = this.props.data.toJS().currency;
    return (
      <div>
        <select onChange={this.languageChange} value={this.props.language}>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
        <style
          dangerouslySetInnerHTML={{ __html: `.table-edit:before { content:  "${currency} " }` }}
        />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  getAllData: React.PropTypes.func,
  data: React.PropTypes.any,
  language: React.PropTypes.any,
  changeLocale: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  language: getLanguage(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllData: () => {
      dispatch(loadData());
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
