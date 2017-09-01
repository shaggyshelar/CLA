import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
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
    let quoteId = '';
    if (process.env.NODE_ENV === 'production') {
      if (window.parent.Xrm !== undefined) {
        quoteId = window.parent.Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');
      }
    }
    if (process.env.NODE_ENV === 'development') {
      quoteId = 'EE8EAC6F-0F78-E711-811F-C4346BDC0E01';
    }
    this.props.getAllData(quoteId);
  }
  languageChange(e) {
    this.props.changeLocale(e.target.value);
  }
  render() {
    const currency = this.props.data.toJS().currency;
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{ __html: `.table-edit:before { content:  "${currency} " }` }}
        />
        <ToastContainer
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          style={{ zIndex: 9999999 }}
        />
        {React.Children.toArray(this.props.children)}
        <select onChange={this.languageChange} value={this.props.language}>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
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
    getAllData: (quoteId) => {
      dispatch(loadData(quoteId));
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
