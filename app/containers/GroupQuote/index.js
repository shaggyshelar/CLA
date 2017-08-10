/*
 *
 * GroupQuote
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import { Button, Glyphicon, ButtonGroup, Col, Row, DropdownButton, MenuItem, Badge } from 'react-bootstrap/lib';
import EditQuoteGrid from 'components/EditQuoteGrid';
import makeSelectGroupQuote from './selectors';

export class GroupQuote extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selectedGroup: null,

    };
    this.changeGroup = this.changeGroup.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.cloneGroupIn = this.cloneGroupIn.bind(this);
    this.deleteGroupIn = this.deleteGroupIn.bind(this);
  }
  componentWillMount() {  
    if (this.state.selectedGroup === null) {
      this.setState({ selectedGroup: this.props.groups[0].id });
    } 
  }

  changeGroup(e) {
    this.setState({ selectedGroup: e });
  }

  cloneGroupIn() {
    const groupLines = Object.assign([],
      _.filter(this.props.lines, { groupId: this.state.selectedGroup }));
    const group = Object.assign({},
      _.filter(this.props.groups, { id: this.state.selectedGroup })[0]);
    const randomID = parseInt(Math.random() * 100000, 0);
    const lines = this.props.lines;
    const groups = this.props.groups;
    group.id = randomID;
    groupLines.forEach((i, index) => {
      const groupLine = Object.assign({}, i);
      groupLine.groupId = randomID;
      lines.push(groupLine);
    });
    
    groups.push(group);
    this.props.cloneGroup(lines, groups);
  }

  deleteGroupIn() {
    const group = Object.assign({},
      _.filter(this.props.groups, { id: this.state.selectedGroup })[0]);
    const lines = this.props.lines;
    const groups = this.props.groups;
    _.remove(lines, (i) => i.groupId === group.id);
    _.remove(groups, (j) => j.id === group.id);
    this.setState({ selectedGroup: this.props.groups[0].id });
    this.props.deleteGroup(lines, groups);
  }

  dataChanged(e) {
    console.log(e);
  }
  render() {
    let group = {};
    let groupLines = [];
    groupLines = _.filter(this.props.lines, { groupId: this.state.selectedGroup });
    group = _.filter(this.props.groups, { id: this.state.selectedGroup })[0];
    return (
      <div className="group">
        <div className="group-card">
          <Row>
            <Col md={4} sm={6} xs={12}>
              <InlineEdit
                className="group-header group-edit"
                activeClassName="group-edit-on"
                text={group.name}
                paramName="message"
                change={this.dataChanged}
              /><Glyphicon glyph="pencil" className="inline-edit" />
              <span>
                <Badge pullRight>{this.props.groups.length}</Badge>
                <DropdownButton title="Change Group " bsStyle="primary" id="bg-nested-dropdown" >
                  {this.props.groups.map((item, index) => (
                    <MenuItem onSelect={this.changeGroup} key={index} eventKey={item.id} value={item.id}>{item.name}</MenuItem>
                  ))
                  }
                </DropdownButton><br />

              </span>
              <span className="group-header" >Subtotal: {this.props.data.currency} {group.netTotal} </span><br />
              <InlineEdit
                className="group-description"
                activeClassName="group-desc-edit-on"
                text={group.description === '' ? 'Click here to edit description ' : group.description}
                paramName="message"
                change={this.dataChanged}
              /><Glyphicon glyph="pencil" className="inline-edit" />
            </Col>
            <Col md={4} sm={6} xs={12}>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <span className="group-label" >Optional</span>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <input className="input-group" type="checkbox" checked={group.isOptional} />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <span className="group-label" >Additional Disc. (%)</span>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <input className="input-group" type="text" name="name" value={group.additionaldiscount} />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <span className="group-label" >Subscription Term</span>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <input className="input-group" type="text" name="name" value={group.subscriptionTerm} />
                </Col>
              </Row>
            </Col>
            <Col md={4} sm={6} xs={12}>
              <Button className="margin">Add Products</Button>
              <ButtonGroup className="margin">
                <Button onClick={this.cloneGroupIn}>Clone Group</Button>
                <Button onClick={this.deleteGroupIn} disabled={this.props.groups.length === 1}>Delete Group</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
        <div>
          <EditQuoteGrid
            data={groupLines}
            cloneLine={this.props.cloneLine}
            deleteLine={this.props.deleteLine}
            toggleAllCheckBox={this.checkAll}
            toggleQuoteCheckbox={this.toggleCheckboxChange}
            updateProps={this.updateProps}
            currency={this.props.data.currency}
          />
        </div>
        <div className="sub-footer">
          Sub Total : {this.props.data.currency} {group.netTotal}
        </div>
      </div>
    );
  }
}

GroupQuote.propTypes = {
  dispatch: PropTypes.func,
  cloneLine: PropTypes.func,
  deleteLine: PropTypes.func,
  cloneGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  data: PropTypes.any,
  groups: PropTypes.any,
  lines: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupQuote);
