/*
 *
 * EditQuoteHeader
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Button, Glyphicon, Row, Col,ButtonGroup } from 'react-bootstrap/lib';
import { createStructuredSelector } from 'reselect';
import makeSelectEditQuoteHeader from './selectors';
import AddProductsDropdown from 'components/AddProductsDropdown';
import AddGroupDropdown from 'components/AddGroupDropdown';
import EditQuoteHeaderCard from 'components/EditQuoteHeaderCard';

export class EditQuoteHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Row className="show-grid">
        <Col xs={12} md={3}>
          <Helmet
            title="TableHeader"
            meta={[
              { name: 'description', content: 'Description of TableHeader' },
            ]}
          />
          <EditQuoteHeaderCard />
        </Col>
        <Col xs={12} md={9}>
          <AddProductsDropdown />
          <AddGroupDropdown />
          <Button className="margin">Delete Lines</Button>
           <ButtonGroup className="margin">
          <Button>Quick Save</Button>
          <Button>Calculate</Button>
           </ButtonGroup>
          <Button className="margin">Cancel</Button>
          <Button className="margin"><Glyphicon glyph='fullscreen' /></Button>
          <Button className="margin" bsStyle="primary">Save</Button>
          
          
        </Col>
      </Row>
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
