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

export class EditQuote extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="EditQuote"
          meta={[
            { name: 'description', content: 'Description of EditQuote' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

EditQuote.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EditQuote: makeSelectEditQuote(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuote);
