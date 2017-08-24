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
import { Button, Glyphicon, ButtonGroup, Col, Row, DropdownButton, MenuItem, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap/lib';
import EditQuoteGrid from 'components/EditQuoteGrid';
import { SegmentedQuote } from '../SegmentedQuote';
import { browserHistory } from 'react-router';
import { updateGroupData, updateGroupValue } from '../App/actions';
export class GroupQuote extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selectedGroup: null,
    };
    this.changeGroup = this.changeGroup.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.changeOptional = this.changeOptional.bind(this);
    this.cloneGroupIn = this.cloneGroupIn.bind(this);
    this.deleteGroupIn = this.deleteGroupIn.bind(this);
  }
  componentWillMount() {
    const groupLen = _.find(this.props.groups, { id: parseInt(this.props.location.query.groupId) });

    if (this.state.selectedGroup === null) {
      this.props.location.query.groupId && groupLen ?
       this.setState({ selectedGroup: parseInt(this.props.location.query.groupId) }) :
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
    const randomID = parseInt(Math.random() * 100000, 0).toString();
    const lines = this.props.lines;
    const groups = this.props.groups;
    group.id = randomID;
    groupLines.forEach((i) => {
      const groupLine = Object.assign({}, i);
      groupLine.groupId = randomID;
      groupLine.id = parseInt(Math.random() * 100000, 0).toString();
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
    const key = Object.keys(e)[0];
    const value = isNaN(parseFloat(e[key])) ? e[key] : parseFloat(e[key]);
    const data = key.split('*($)*');
    if (value !== '') {
      this.props.updateGroupData(data[0], data[1], value);
    }
  }
  changeOptional(e) {
    this.props.updateGroupData( e.target.name, e.target.id, e.target.checked);
  }
  validate(text) {
    const decimal = /^([0-9]+(\.[0-9]+)?|Infinity)$/;
    return (decimal.test(text) && (parseFloat(text) > 0));
  }

  render() {
    let group = {};
    let groupLines = [];
    groupLines = _.filter(this.props.lines, { groupId: this.state.selectedGroup });
    group = _.filter(this.props.groups, { id: this.state.selectedGroup })[0];
    const optionalTooltip = (
      <Tooltip id="tooltip" bsClass="tooltip"><strong>Marks the entire group as optional.</strong></Tooltip>
    );
    const discountTooltip = (
      <Tooltip id="dtooltip" bsClass="tooltip"><strong>Default additional discount rate applied to line items in this group.</strong></Tooltip>
    );
    const subscriptionTooltip = (
      <Tooltip id="stooltip" bsClass="tooltip"><strong>Subscription term used to prorate eligible products in this group.</strong></Tooltip>
    );
    const segmented = _.filter(groupLines, { isSegmented: true }).length;
    return (
      <div className="group">
        <div className="group-card">
          <Row>
            <Col md={4} sm={6} xs={12} className="containers">
              <InlineEdit
                className="group-header group-edit"
                activeClassName="group-edit-on"
                text={group.name}
                paramName={`${group.id}*($)*name`}
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
              <span className="group-header" >Subtotal: {this.props.data.currency} {group.netTotal.toLocaleString('en', { minimumFractionDigits: 2 })} </span><br />
              <InlineEdit
                className="group-description"
                activeClassName="group-desc-edit-on"
                text={group.description === '' ? 'Click here to edit description ' : group.description}
                paramName={`${group.id}*($)*description`}
                change={this.dataChanged}
              /><Glyphicon glyph="pencil" className="inline-edit" />
            </Col>
            <Col md={4} sm={6} xs={12} className="containers">
              <Row>
                <Col md={8} sm={8} xs={8}>

                  <span className="group-label" >Optional</span>
                  <OverlayTrigger placement="top" overlay={optionalTooltip}>
                    <Glyphicon glyph="question-sign" style={{ paddingLeft: '2px', paddingBottom: '2px' }} />
                  </OverlayTrigger>
                </Col>
                <Col md={4} sm={4} xs={4}>
                  <input className="input-group" value={group.isOptional} id="isOptional" onChange={this.changeOptional} name={group.id} type="checkbox" checked={group.isOptional} />
                </Col>
              </Row>
              <Row>
                <Col md={8} sm={8} xs={8}>
                  <span className="group-label" >Additional Disc. (%)</span>
                  <OverlayTrigger placement="top" overlay={discountTooltip}>
                    <Glyphicon glyph="question-sign" style={{ paddingLeft: '2px', paddingBottom: '2px' }} />
                  </OverlayTrigger>
                </Col>
                <Col md={4} sm={4} xs={4}>
                  <InlineEdit
                    className="group-input"
                    activeClassName="input-group input-text"
                    text={group.additionaldiscount===""?"0.00":group.additionaldiscount.toLocaleString('en', { minimumFractionDigits: 2 })}
                    paramName={`${group.id}*($)*additionaldiscount`}
                    change={this.dataChanged}
                    validate={this.validate}
                  /><Glyphicon glyph="pencil" className="inline-edit" />
                  {/* <input className="input-group input-text" step="0.1" onChange={this.valueChanged} id="additionaldiscount" type="text" name={group.id} value={group.additionaldiscount.toLocaleString('en', { minimumFractionDigits: 2 })} /> */}
                </Col>
              </Row>
              <Row>
                <Col md={8} sm={8} xs={8}>
                  <span className="group-label" >Subscription Term</span>
                  <OverlayTrigger placement="top" overlay={subscriptionTooltip}>
                    <Glyphicon glyph="question-sign" style={{ paddingLeft: '2px', paddingBottom: '2px' }} />
                  </OverlayTrigger>
                </Col>
                <Col md={4} sm={4} xs={4}>
                  <InlineEdit
                  className="group-input"
                  activeClassName="input-group input-text"
                  text={group.subscriptionTerm===""?"0.00":group.subscriptionTerm.toLocaleString('en', { minimumFractionDigits: 2 })}
                  paramName={`${group.id}*($)*subscriptionTerm`}
                  change={this.dataChanged}
                  validate={this.validate}
                /><Glyphicon glyph="pencil" className="inline-edit" />
                  {/* <input className="input-group input-text" onChange={this.valueChanged} id="subscriptionTerm" type="text" name={group.id} value={group.subscriptionTerm.toLocaleString('en', { minimumFractionDigits: 2 })} /> */}
                </Col>
              </Row>
            </Col>
            <Col md={4} sm={6} xs={12} className="containers">
              <div>
                <Button className="margin" title="Add Products Group" onClick={() => { browserHistory.push(`/ProductSelection?groupId=${group.id}`); }}>Add Products</Button>
                <ButtonGroup className="margin">
                  <Button onClick={this.cloneGroupIn} title="Clone Group">Clone Group</Button>
                  <Button onClick={this.deleteGroupIn} title="Delete Group" disabled={this.props.groups.length === 1}>Delete Group</Button>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          {segmented ?
            <SegmentedQuote
              data={groupLines}
              cloneLine={this.props.cloneLine}
              deleteLine={this.props.deleteLine}
              toggleAllCheckBox={this.props.toggleAllCheckBox}
              toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
              updateProps={this.props.updateProps}
              currency={this.props.data.currency}
              segment={this.props.segment}
              update={this.props.update}
              updateBundle={this.props.updateBundle}
              updateSeg={this.props.updateSeg}
              updateSegBundle={this.props.updateSegBundle}
            />
          :
              <EditQuoteGrid
                data={groupLines}
                cloneLine={this.props.cloneLine}
                deleteLine={this.props.deleteLine}
                toggleAllCheckBox={this.props.toggleAllCheckBox}
                toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
                updateProps={this.props.updateProps}
                currency={this.props.data.currency}
                segment={this.props.segment}
                update={this.props.update}
                updateBundle={this.props.updateBundle}
              />
          }
        </div>
      </div>
    );
  }
}

GroupQuote.propTypes = {
  cloneLine: PropTypes.func,
  deleteLine: PropTypes.func,
  cloneGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  data: PropTypes.any,
  groups: PropTypes.any,
  lines: PropTypes.any,
  toggleAllCheckBox: PropTypes.func,
  updateProps: PropTypes.func,
  addProducts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupQuote);
