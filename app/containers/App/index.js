/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadData } from './actions';

import { makeSelectData } from './selectors';
export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };
  componentWillMount() {
    this.props.getAllData();
    // this.props.getXrmData();
  }
  render() {
    const currency = this.props.data.toJS().currency;
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{ __html: `.table-edit:before { content:  "${ currency } " }` }}
        />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func.isRequired,
  getAllData: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllData: () => {
      dispatch(loadData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
