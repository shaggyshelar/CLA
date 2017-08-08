/*
 *
 * GroupQuote
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InlineEdit from 'react-edit-inline';
import { Button, Glyphicon, ButtonGroup, Col, Row, DropdownButton, MenuItem } from 'react-bootstrap/lib';
import EditQuoteGrid from 'components/EditQuoteGrid';
import makeSelectGroupQuote from './selectors';

export class GroupQuote extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="group">

        <div className="group-card">
          <Row>
            <Col md={4} sm={6} xs={12}>
              <InlineEdit
                className="group-header group-edit"
                activeClassName="group-edit-on"
                text="Group1"
                paramName="message"
                change={this.dataChanged}


              /><Glyphicon glyph="pencil" className="inline-edit" />
              <DropdownButton title="Change Group " bsStyle="primary" id="bg-nested-dropdown" >

                <MenuItem eventKey="1">Group 1</MenuItem>
                <MenuItem eventKey="2">Group 2</MenuItem>
              </DropdownButton><br />
              <span className="group-header" >Subtotal: ₹235,000.00 </span><br />
              <InlineEdit
                className="group-description"
                activeClassName="group-desc-edit-on"
                text="Click here to edit description "
                paramName="message"
                change={this.dataChanged}

              /><Glyphicon glyph="pencil" className="inline-edit" />

            </Col>

            <hr className="vertically" />

            <Col md={4} sm={6} xs={12}>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <span className="group-label" >Optional</span>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <input className="input-group" type="checkbox" />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <span className="group-label" >Additional Disc. (%)</span>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <input className="input-group" type="text" name="name" value="" />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <span className="group-label" >Subscription Term</span>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <input className="input-group" type="text" name="name" value="" />
                </Col>
              </Row>
            </Col>
            <hr className="vertically" />
            <Col md={4} sm={6} xs={12}>
              <Button className="margin">Add Products</Button>
              <ButtonGroup className="margin">
                <Button >Clone Group</Button>

                <Button >Delete Group</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
        <div>
          <EditQuoteGrid
            data={this.props.data ? this.props.data : []}
            cloneLine={this.props.cloneLine}
            deleteLine={this.props.deleteLine}
            toggleAllCheckBox={this.checkAll}
            toggleQuoteCheckbox={this.toggleCheckboxChange}
            updateProps={this.updateProps}
          />
        </div>
        <div className="sub-footer">
          Sub Total : {this.props.data.get('netAmount')}
        </div>
      </div>
    );
  }
}

GroupQuote.propTypes = {
  dispatch: PropTypes.func,
  cloneLine: PropTypes.func,
  deleteLine: PropTypes.func,
  data: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  GroupQuote: makeSelectGroupQuote(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupQuote);
