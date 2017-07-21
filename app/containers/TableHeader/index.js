/*
 *
 * TableHeader
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectTableHeader from './selectors';
import messages from './messages';
import DDButton from '../../components/Ddbutton';
import ButtonB from '../../components/Button';
import { Glyphicon,Row,Col } from 'react-bootstrap/lib';
export class TableHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {

    const items = [
      {
        title: "Add Favourites"
      }
    ]
    return (
       <Row className="show-grid">
        <Col xs={12} md={3}>
          <Helmet
            title="TableHeader"
            meta={[
              { name: 'description', content: 'Description of TableHeader' },
            ]}
          />
          <h3>Edit Quote</h3>
        </Col>
        <Col xs={12} md={9}>
          <DDButton title="Add Products" menuItems={items} />
          <DDButton title="Add Group" menuItems={items} />
          <ButtonB title="Delete Lines" />
          <ButtonB title="Quick Save" />
          <ButtonB title="Calculate" />
          <ButtonB title="Cancel" />
          <ButtonB title={<Glyphicon glyph='fullscreen' />} />
          <ButtonB title="Save" bsStyle="primary" />
        </Col>
      </Row>
    );
  }
}

TableHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  TableHeader: makeSelectTableHeader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
