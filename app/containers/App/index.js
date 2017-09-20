import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { Modal, Glyphicon, Button } from 'react-bootstrap/lib';
import { loadData, cancel, continueSave } from './actions';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectData, getLanguage, getError, getErrorMessage } from './selectors';
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
      } else {
        quoteId = this.props.location.query.QuoteId;
      }
    }
    if (process.env.NODE_ENV === 'development') {
      quoteId = '41861B38-8094-E711-812B-C4346BDCDF81';
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
        <Modal
          show={this.props.error} onHide={this.props.cancel} style={{ width: '50%' }}
          autoFocus keyboard
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}><Glyphicon glyph="warning-sign" /> Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: 'center', fontSize: '18px' }}>
            {this.props.errorMsg}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.cancel} >Cancel</Button>
            <Button bsStyle="primary" onClick={this.props.continue} >Continue</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  getAllData: React.PropTypes.func,
  data: React.PropTypes.any,
  changeLocale: React.PropTypes.func,
  error: React.PropTypes.any,
  cancel: React.PropTypes.any,
  errorMsg: React.PropTypes.any,
  continue: React.PropTypes.any,
  location: React.PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  language: getLanguage(),
  error: getError(),
  errorMsg: getErrorMessage(),
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
    cancel: () => {
      dispatch(cancel());
    },
    continue: () => {
      dispatch(continueSave());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
