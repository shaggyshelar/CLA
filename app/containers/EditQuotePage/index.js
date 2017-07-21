/*
 *
 * EditQuote
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectEditQuote from './selectors';
import messages from './messages';
import { EditQuoteHeader } from '../EditQuoteHeader';

export class EditQuotePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="EditQuotePage"
          meta={[
            { name: 'description', content: 'Description of EditQuotePage' },
          ]}
        />
        <FormattedMessage {...messages.header} />
        <EditQuoteHeader />
      </div>
    );
  }
}

EditQuotePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EditQuotePage: makeSelectEditQuote(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotePage);
