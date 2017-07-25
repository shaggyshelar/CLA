/*
 *
 * EditQuoteHeader
 *
 */
import { Button } from 'semantic-ui-react';
// import React, { PropTypes } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectData, makeSelectError, makeSelectLoading } from '../App/selectors';
import { loadData } from './actions';
import AddProductsDropdown from '../../components/AddProductsDropdown';
import AddGroupDropdown from '../../components/AddGroupDropdown';
import EditQuoteHeaderCard from '../../components/EditQuoteHeaderCard';
import EditQuoteGrid from '../../components/EditQuoteGrid';

export class EditQuoteHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { loading, error, data } = this.props;
    const dataListProps = {
      loading,
      error,
      data,
    };

    return (
      <div>
        <Helmet
          title="EditQuoteHeader"
          meta={[
            { name: 'description', content: 'Description of EditQuoteHeader' },
          ]}
        />
        <EditQuoteHeaderCard />
        <AddProductsDropdown />
        <AddGroupDropdown />
        <Button>Delete Lines</Button>
        <Button>Quick Save</Button>
        <Button>Calculate</Button>
        <Button>Cancel</Button>
        <Button onClick={() => { this.props.getAllData(); console.log(dataListProps); }}>Save</Button>
        <Button>Fullscreen</Button>
        <EditQuoteGrid {...dataListProps} />
      </div>
    );
  }
}

EditQuoteHeader.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  data: React.PropTypes.object,
  getAllData: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // ApiPage: makeSelectApiPage(),
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    getAllData: () => {
      dispatch(loadData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuoteHeader);
