/*
 *
 * EditQuoteHeader
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Button } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import makeSelectEditQuoteHeader from './selectors';
import AddProductsDropdown from '../../components/AddProductsDropdown';
import AddGroupDropdown from '../../components/AddGroupDropdown';
import EditQuoteHeaderCard from '../../components/EditQuoteHeaderCard';
import EditQuoteGrid from '../../components/EditQuoteGrid';

export class EditQuoteHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
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
        <Button>Save</Button>
        <Button>Fullscreen</Button>
        <EditQuoteGrid />
      </div>
    );
  }
}

EditQuoteHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EditQuoteHeader: makeSelectEditQuoteHeader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuoteHeader);
